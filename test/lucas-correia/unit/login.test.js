const request = require('supertest');
const { expect } = require('chai');
const postLogin = require('../fixtures/postLogin.json');

describe('Login', () => {
    it('Should return status 200 when logging in with a valid user', async () => {
        const bodyLogin = { ...postLogin };

        const resposta = await request('http://localhost:3000')
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin);

        expect(resposta.status).to.equal(200);
        expect(resposta.body).to.have.property('token');});
});

// npx mocha test/lucas-correia/unit/login.test.js