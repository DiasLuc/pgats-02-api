const request = require('supertest');
const { expect } = require('chai');
const { getToken } = require('../../../helpers/authentication');
const postRegister = require('../../../fixtures/postRegister.json');
require('dotenv').config();

describe('Resgister', () => {
  describe('POST /users/register', () => {
    let token;
    before(async () => {
      token = await getToken();
    });

    it('Should create a new user returning the status code 201', async () => {
      const bodyRegister = { ...postRegister };

      const response = await request(process.env.BASE_URL_REST)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyRegister);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('username');
      expect(response.body).to.have.property('favorecidos');
      expect(response.body).to.have.property('saldo');
    });

    it('Should not create a new user without password returning the status code 400', async () => {
      const bodyRegister = { ...postRegister };
      bodyRegister.password = '';

      const response = await request(process.env.BASE_URL_REST)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyRegister);

      expect(response.body).to.have.property('error');
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Usuário e senha obrigatórios');
    });
  });
});