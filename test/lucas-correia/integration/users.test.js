const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Users', () => {
    it('Should return status 200 to consult users list', async () => {
        const resposta = await request(process.env.BASE_URL_REST)
            .get('/users')

        expect(resposta.status).to.equal(200);
        expect(resposta.body).to.be.an('array');
    });
});

// npx mocha test/lucas-correia/integration/users.test.js