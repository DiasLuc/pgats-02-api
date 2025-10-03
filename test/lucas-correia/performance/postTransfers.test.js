import http from 'k6/http';
import { check,sleep } from 'k6';
import { obterToken } from '../helpers/authPerformance.js';
import { getBaseUrl } from '../utils/variables.js';
const postTransfers = JSON.parse(open('../fixtures/postTransfers.json'));

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01'],
  }
};

export default function() {
  const token = obterToken()

  const url = getBaseUrl() + '/transfers';

  const payload = JSON.stringify(postTransfers);

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'Validate that the status is 400': (res) => res.status === 400,
    'Validate that the error message is correct': (r) => r.json().error == 'Saldo insuficiente',
  });

  sleep(1);
}

//K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run test/lucas-correia/performance/postTransfers.test.js