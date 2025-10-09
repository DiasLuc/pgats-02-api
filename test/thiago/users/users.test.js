const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('List users', () => {
  describe('GET /users', () => {
    it('Should return a list of users and the status code 200', async () => {
      const response = await request(process.env.BASE_URL_REST)
        .get('/users')
        .set('Content-Type', 'application/json');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.lengthOf(3);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('username').and.to.be.a('string');
      expect(response.body[0]).to.have.property('favorecidos').and.to.be.an('array');
      expect(response.body[0]).to.have.property('saldo').and.to.be.a('number');
    });
  });
});