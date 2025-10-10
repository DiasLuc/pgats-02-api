import http from 'k6/http';
import { sleep,check } from 'k6';
import { getBaseUrl } from '../utils/variables.js';
const postRegister = JSON.parse(open('../fixtures/postRegister.json'));

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

export default function () {
  const url = getBaseUrl() + '/users/register';

  const payload = JSON.stringify(postRegister);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'Validate that the status is 400': (r) => r.status === 400,
    'Validate that the error message is correct': (r) => r.json().error == 'Usuário já existe',
  });

  sleep(1);
}

//K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run test/lucas-correia/performance/register.test.js