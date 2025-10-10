const request = require('supertest');
const postUsersLogin = require('../fixtures/postUsersLogin.json');

const loginUser = async (username, password) => {
    const bodyLogin = { ...postUsersLogin };
        bodyLogin.username = username
        bodyLogin.password = password
    const response = await request(process.env.BASE_URL_REST)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    return response;
}

module.exports = {
    loginUser
}