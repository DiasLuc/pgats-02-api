const request = require('supertest');
const { expect } = require('chai');
const postRegister = require('../fixtures/postRegister.json');

describe('Register', () => {
    it('Should return user already exists error with status 400', async () => {
        const bodyLogin = { ...postRegister };

        const resposta = await request('http://localhost:3000')
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(bodyLogin);

        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Usuário já existe');
    });
});

// npx mocha test/lucas-correia/unit/register.test.js