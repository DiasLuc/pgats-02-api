import http from 'k6/http';
import { sleep, check } from 'k6';
import { getBaseUrl } from '../../../utils/variables.js';
const postRegister = JSON.parse(open('../../../fixtures/postRegister.json'));

export const options = {
  stages: [
    { duration: '1s', target: 10 },
    { duration: '2s', target: 10 },
    { duration: '0s', target: 0 }
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(90)<3000', 'max<5000'],
  },
};

export default function () {
  const url = getBaseUrl() + '/users/register';
  const bodyRegister = { ...postRegister };
  bodyRegister.username = Math.random().toString();
  const payload = JSON.stringify(bodyRegister);
  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = http.post(url, payload, params);
  check(response, {
    'status code should be 201': (res) => res.status === 201,
    'username should be a string': (res) => typeof (res.json().username) == 'string',
  });
  sleep(1);
};