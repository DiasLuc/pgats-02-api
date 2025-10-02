const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

const postUsersRegister = require('../fixtures/postUsersRegister.json');
const postUsersLogin = require('../fixtures/postUsersLogin.json');

const random_name = require('node-random-name');
const { registerUser } = require('../helpers/registerUser.js')
describe('Users', () => {

    describe('POST /users/register', () => {
        it('Should return status code 201, and user should be created successfully', async () => {
            let response = await registerUser(random_name(), '123456');
            expect(response.statusCode).to.equal(201);
    
        });

        it('Should return error with status code 400, stating there was a validation error, or error already exists', async () => {
            let response = await registerUser(random_name(), '123456');
            let newUser = response.body.username;
            let secondResponse = await registerUser(newUser, '123456');
            expect(secondResponse.statusCode).to.equal(400);
        });
    });

    describe('POST /users/login', () => {
        it.skip('Should return status code 200, and should successfully login ', async () => {

        });

        it.skip('Should return error with status code 400 due to invalid user or password', async () => {

        });
    });

    describe('GET /users', () => {
        it('Should return status code 200, along with list of users', async () => {
            const response = await request(process.env.BASE_URL_REST)
                .get('/users')
            // console.log(response.statusCode);
            // console.log(response.body);
            expect(response.statusCode).to.equal(200);
        });

    });
});