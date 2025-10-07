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
    const url = 'http://localhost:3000/users/register';

    const uniqueUser = `idalecio_${__VU}_${__ITER}`;

    const payload = JSON.stringify({
        username: uniqueUser,
        password: '789789789',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

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

    sleep(1);
}
