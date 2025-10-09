const request = require('supertest');
const { expect } = require('chai');
const { getToken } = require('../../helpers/authentication');
const postTransfers = require('../../fixtures/postTransfers.json');
require('dotenv').config();

describe('Transfers', () => {
  let token;
  before(async () => {
    token = await getToken();
  });

  describe('POST /transfers', () => {
    it('Transfers over 5000 must be made only to beneficiaries', async () => {
      const bodyTransfers = { ...postTransfers };

      const response = await request(process.env.BASE_URL_REST)
        .post('/transfers')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransfers);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.have.property('from')
        .and.to.be.a('string').and.to.be.equal('julio');
      expect(response.body).to.have.property('to')
        .and.to.be.a('string').and.to.be.equal('priscila');
      expect(response.body).to.have.property('value')
        .and.to.be.a('number').and.to.be.equal(5100);
      expect(response.body).to.have.property('date').and.to.be.a('string');

    })
  });

  describe('GET /transfers', () => {
    it('Should return a list containing all the transfers', async () => {
      const response = await request(process.env.BASE_URL_REST)
        .get('/transfers')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array')
      expect(response.body).to.have.lengthOf(2);
    })
  });
});