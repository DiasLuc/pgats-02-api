const request = require('supertest');
const { expect } = require ('chai')

describe('Register', () => {
    describe('POST register', () => {
        it('Deve retornar 201 com a criação de um novo registro de usuário', async () =>{
            const response = await request('http://localhost:3000')
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'lucas.ramos',
                    'password': '123456789',
                    'favorecidos': [
                        'thayane'
                    ]
                })
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('favorecidos');
        })
    })
})