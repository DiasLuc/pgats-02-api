const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json');

const getToken = async (username, password) => {
    const bodyLogin = { ...postLogin, username, password };

    const getToken = await request(process.env.BASE_URL_REST)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);
    
    return getToken.body.token;
}

module.exports = { getToken };