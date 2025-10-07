import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 1, // deve ser >= 1
    duration: '90s',
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
    }
};

export default function () {
    const url = 'http://localhost:3000/transfers';
    const payload = JSON.stringify({
        from: 'string',
        password: 'string'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar que o Status é 401': (r) => r.status === 401,
    });

    sleep(1);
}
