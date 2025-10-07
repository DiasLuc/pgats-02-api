import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
    }
};

export default function () {
    const url = 'http://localhost:3000/transfers'
    const res = http.get(url)
    check(res, {
        'Status é 401': (r) => r.status === 401,
        'Token não fornecido': (r) => {
            try {
                return r.json().message === "Token não fornecido.";
            } catch (e) {
                return false;
            }
        },
    });
   sleep(1)
};   