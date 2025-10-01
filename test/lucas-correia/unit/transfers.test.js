const request = require('supertest');
const { expect } = require('chai');
const { getToken } = require('../helpers/auth');
const postTransfers = require('../fixtures/postTransfers.json');
require('dotenv').config();

describe('Transfers', () => {
    let token;

    beforeEach(async () => {
        token = await getToken('julio', '123456');
    });

    describe('POST /transfers', () => {
        it('Should return success with 201 when successfully transferring', async () => {
            const bodyTransfers = { ...postTransfers };  

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers);

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.be.an('object');
        });
    });

    describe('GET /transfers', () => {
        it('Should return status 200 and a list of transfers made', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .get('/transfers')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        });
    });
});

// npx mocha test/lucas-correia/unit/transfers.test.js