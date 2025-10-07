const request = require('supertest');
const { expect } = require ('chai')

describe('Realizar transferências', () => {
    describe('POST realizar transferências', () => {
        it('Deve retornar 401 ao processar a realização de transferências sem token', async () =>{
            const response = await request('http://localhost:3000')
                .post('/transfers')
                .set('Content-Type', 'application/json')
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message', 'Token não fornecido.');
        })
    })
})