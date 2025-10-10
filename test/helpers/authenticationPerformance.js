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
  return response.json('token');
}