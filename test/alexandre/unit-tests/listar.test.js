const request = require('supertest');
const { expect } = require ('chai')

describe('Listar usuários', () => {
    describe('GET listar usuários', () => {
        it('Deve retornar 200 ao processar corretamente a listagem de usuários', async () =>{
            const response = await request('http://localhost:3000')
                .get('/users')
                .set('Content-Type', 'application/json')
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        })
    })
})