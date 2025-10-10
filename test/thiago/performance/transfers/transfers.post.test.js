import http from 'k6/http';
import { sleep, check } from 'k6';
import { getBaseUrl } from '../../../utils/variables.js';
import { getToken } from '../../../helpers/authenticationPerformance.js';
const postTransfers = JSON.parse(open('../../../fixtures/postTransfersPerf.json'));

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 20 },
    { duration: '0s', target: 0 }
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(90)<3000', 'max<5000'],
  },
};

export default function () {
  const token = getToken();
  const url = getBaseUrl() + '/transfers';
  const payload = JSON.stringify(postTransfers);
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  const response = http.post(url, payload, params);
  check(response, {
    'status code is 201': (r) => r.status === 201,
  });
  sleep(1);
}

