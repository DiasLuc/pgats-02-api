const postLogin = JSON.parse(open('../fixtures/postLogin.json'));
import http from 'k6/http';
import { getBaseUrl } from '../utils/variables.js';

export function obterToken() {
  const url = getBaseUrl() + '/users/login';

    const payload = JSON.stringify(postLogin);
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const res = http.post(url, payload, params);

    return res.json('token');
}