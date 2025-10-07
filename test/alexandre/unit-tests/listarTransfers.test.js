const request = require('supertest');
const { expect } = require ('chai')

describe('Listar transferências', () => {
    describe('GET listar transferências', () => {
        it('Deve retornar 401 ao processar corretamente a listagem de usuários', async () =>{
            const response = await request('http://localhost:3000')
                .get('/transfers')
                .set('Content-Type', 'application/json')
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message', 'Token não fornecido.');

        })
    })
})