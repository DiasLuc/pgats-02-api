const request = require('supertest');
const { expect } = require ('chai')

describe('Login', () => {
    describe('POST login', () => {
        it('Deve retornar 200 com o Login bem-sucedido', async () =>{
            const response = await request('http://localhost:3000')
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'idalea.ramos',
                    'password': '123456789',
                })
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object')
        })
    })
})