import http from 'k6/http';
import { check, sleep } from 'k6';
import { getBaseUrl } from './../../../utils/variables.js';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const url = getBaseUrl() + '/users';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const response = http.get(url, params);
  check(response, {
    'status code is 200': (res) => res.status === 200,
    'should contain julio in the users list': (res) => res.body.includes('julio'),
    'should contain priscila in the users list': (res) => res.body.includes('priscila')
  })

  sleep(1);
}
