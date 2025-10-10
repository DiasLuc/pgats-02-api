import http from 'k6/http';
import { sleep, check } from 'k6';
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
  const bodyRegister = { ...postRegister };
  bodyRegister.username = Math.random().toString();
  const payload = JSON.stringify(bodyRegister);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'Validate that the status is 201': (r) => r.status === 201,
    'Validate that the username is a string': (r) => typeof (r.json().username) == 'string',
  });

  sleep(1);
}

//K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run test/lucas-correia/performance/register.test.js