const request = require('supertest');
const { expect } = require('chai');
const users = require('../../fixtures/postLogin.json');
require('dotenv').config();

describe('Login', () => {
  describe('POST /users/login', () => {
    it('Should return status 200 with valid credentials', async () => {
      const response = await request(process.env.BASE_URL_REST)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(users[0]);

      expect(response.status).to.equal(200);
      expect(response.body.token).not.equal(null);
      expect(response.body.token).to.be.a('string');
    });

    it('Shoud return status 400 with invalid password', async () => {
      const bodyLogin = { ...users[1] };
      bodyLogin.password = '2556';

      const response = await request(process.env.BASE_URL_REST)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);

      expect(response.body).not.to.have.property('token');
      expect(response.body.error).to.equal('Senha inválida');
      expect(response.status).to.equal(400);
    });

  });
});