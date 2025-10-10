import http from 'k6/http';
import { getBaseUrl } from '../utils/variables.js';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));


export function getToken() {
  const url = getBaseUrl() + '/users/login';
  const payload = JSON.stringify(postLogin[0]);
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);
  console.log('>>> url authPerf: ', url)
  console.log('>>> payload authPerf: ', payload)
  console.log('>>> response.body authPerf: ', response.body)
  console.log('>>> response.status authPerf: ', response.status)
  console.log('>>> response.json(\'token\'): ', response.json('token'))
  return response.json('token');
}