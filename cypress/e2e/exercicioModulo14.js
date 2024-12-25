
import contrato from '../contratos/usuarios.contratos'

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
      cy.request('usuarios').then(response =>{
        return contrato.validateAsync(response.body)
      })
    });
  
    it.only('Deve listar usuários cadastrados - GET', () => {
      cy.request({
        method:'GET',
        url:'usuarios'
      }).should((response) =>{
        expect(response.status).equal(200)
        expect(response.body.message).to.have.property('usuarios')
    })
      });
    
  
    it('Deve cadastrar um usuário com sucesso - POST', () => {
      let email ='testeEBAC@' + Math.floor(Math.random()*100000000)
      cy.cadastrarUsuario('luis', email,'tester123','true').should((response) =>{
        expect(response.status).equal(201)
        expect(response.body.message).equal('Cadastro realizado com sucesso')
      })
    });

  
    it('Deve validar um usuário com email inválido - POST', () => {
      cy.cadastrarUsuario('Fulano Da Silva','fulano@qa.com','teste','true').should((response =>{
       expect(response.status).equal(400)
       expect(response.body.message).equal('Este email já está sendo usado')
      }))
    });

  
    it('Deve editar um usuário previamente cadastrado - PUT', () => {
        let email ='testeEBAC@' + Math.floor(Math.random()*100000000)
        cy.cadastrarUsuario('luis', email,'tester123','true').then(response =>{
           let id = response.body._id
              cy.request({
                 method:'PUT',
                 url:`usuarios/${id}`,
                 body:	
                 {
                   "nome": "Fulano da Silva",
                   "email": email,
                   "password": "teste",
                   "administrador": "true"
                 }
              }).should((respone =>{
                 expect(response.status).equal(201)
                 expect(response.body.message).equal('Registro alterado com sucesso')
              }))
        })
    });

  
    it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
       cy.cadastrarUsuario('usuario a ser deletado','fulano@qa.com','teste','true').then(response =>{
          let id = response.body._id
           cy.request({
              method:'DELETE',
              url:`usuarios/${id}`
           }).should(response =>{
            expect(response.status).equal(200)
            expect(response.body.message).equal('Registro excluído com sucesso')
           })
       })
    });
  
  
  });