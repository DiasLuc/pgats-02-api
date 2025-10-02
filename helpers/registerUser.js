const request = require('supertest');
const postUsersRegister = require('../fixtures/postUsersRegister.json');

const registerUser = async (username, password) => {
    const bodyRegister = { ...postUsersRegister };
        bodyRegister.username = username
        bodyRegister.password = password
    const response = await request(process.env.BASE_URL_REST)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(bodyRegister)

    return response;
}

module.exports = {
    registerUser
}