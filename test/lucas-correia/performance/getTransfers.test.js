import http from 'k6/http';
import { check,sleep } from 'k6';
import { obterToken } from '../helpers/authPerformance.js';
import { getBaseUrl } from '../utils/variables.js';

export const options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '20s', target: 100 },
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

  const params = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const res = http.get(url, params);

  check(res, {
    'Validate that the status is 200': (res) => res.status === 200,
    'Validate that the response is an array': (r) => Array.isArray(r.json()),
  });

  sleep(1);
}

//K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run test/lucas-correia/performance/getTransfers.test.js