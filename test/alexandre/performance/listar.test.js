import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    const url = 'http://localhost:3000/users';
    const res = http.get(url)
    check(res, {
        'Status é 200': (r) => r.status === 200,
        'Resposta é um Array': (r) => {
            try {
                return Array.isArray(r.json());
            } catch (e) {
                return false;
            }
        },
    });
   sleep(1)
};   