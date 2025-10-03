import http from 'k6/http';
import { sleep,check } from 'k6';
import { getBaseUrl } from '../utils/variables.js';

export const options = {
  stages: [
    { duration: '5s', target: 100 },
    { duration: '20s', target: 100 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01'],
  }
};

export default function () {
  const url = getBaseUrl() + '/users';

  const res = http.get(url);

  check(res, {
    'Validate that the status is 200': (r) => r.status === 200,
    'Validate that the response is an array': (r) => Array.isArray(r.json()),
  });

  sleep(1);
}

//K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run test/lucas-correia/performance/users.test.js