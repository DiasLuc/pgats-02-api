const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json');

const getToken = async () => {
  const bodyLogin = { ...postLogin };
  const loginResponse = await request(process.env.BASE_URL_REST)
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send(bodyLogin[0]);

  return loginResponse.body.token;
}

module.exports = {
  getToken
}