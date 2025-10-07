import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 100,
    duration: '90s',
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    const url = 'http://localhost:3000/users/login'
    const payload = JSON.stringify({
        username: 'rebeca.ramos',
        password: '123456789'
    })

    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

   const response = http.post(url, payload, params);
   console.log(response)
   sleep(1)
}