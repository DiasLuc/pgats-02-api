const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

const postUsersRegister = require('../../fixtures/postUsersRegister.json');
const postUsersLogin = require('../../fixtures/postUsersLogin.json');
const postTransfers = require('../../fixtures/postTransfers.json');

const { loginUser } = require('../../helpers/loginUser.js');

describe('Transfers', () => {
    let token;
    beforeEach(async () => {
        token = (await loginUser("julio", "123456")).body.token;
    });
    describe('POST /transfers', () => {
        it('Should return status code 201, and transfer should be completed successfully', async () => {
            const bodyTransfers = { ...postTransfers };
            
            bodyTransfers.from = "julio";
            bodyTransfers.to = "priscila";
            bodyTransfers.value = 25.25;

            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers);
            
            expect(response.statusCode).to.equal(201);
            expect(response.body.date).to.exist;
            

        });

        it('Should return error with status code 400, stating there was a validation or business rule error', async () => {
            const bodyTransfers = { ...postTransfers };
            
            bodyTransfers.from = "julio";
            bodyTransfers.to = "julio";
            bodyTransfers.value = 6000;

            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers);
            
            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal("Transferência acima de R$ 5.000,00 só para favorecidos");
        });

        it('Should return error with status code 401, stating token is invalid', async () => {
            const bodyTransfers = { ...postTransfers };
            
            bodyTransfers.from = "julio";
            bodyTransfers.to = "priscila";
            bodyTransfers.value = 22;

            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer INVALID TOKEN`)
                .send(bodyTransfers);
            
            expect(response.statusCode).to.equal(401);
            expect(response.body.message).to.equal("Token inválido.");
        });

        it('Should return error with status code 401, stating token wasn\'t provided', async () => {
            const bodyTransfers = { ...postTransfers };
            
            bodyTransfers.from = "julio";
            bodyTransfers.to = "priscila";
            bodyTransfers.value = 22;

            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-Type', 'application/json')
                // No token sent:
                // .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers);
            
            expect(response.statusCode).to.equal(401);
            expect(response.body.message).to.equal("Token não fornecido.");
        });
    });

    describe('GET /transfers', () => {
        it('Should return status code 200, and return the list of transfers', async () => {
            const response = await request(process.env.BASE_URL_REST)
                .get('/transfers')
                .set('Authorization', `Bearer ${token}`)
            
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('array')
        });

        it('Should return error with status code 401, stating token is invalid', async () => {
            const response = await request(process.env.BASE_URL_REST)
                .get('/transfers')
                .set('Authorization', `Bearer INVALID TOKEN`)
            
            expect(response.statusCode).to.equal(401);
        });

        it('Should return error with status code 401, stating token wasn\'t provided', async () => {
            const response = await request(process.env.BASE_URL_REST)
                .get('/transfers')

            expect(response.statusCode).to.equal(401);
        });
    });

});