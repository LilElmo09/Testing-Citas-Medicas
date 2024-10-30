describe.skip('Guardando primeros registros', () => {
    it('Registro con credenciales válidas', () => {
        cy.fixture('primeratanda.json').then((users) => {
            users.forEach((user) => {
                // Test de registro Exitoso
                cy.visit('http://localhost:3000/register')
                cy.wait(2000)
                cy.get('#nombre').type(user.nombre)
                cy.get('#email').type(user.email)
                cy.get('#telefono').type(user.phone)
                cy.get('#direccion').type(user.direccion)
                cy.get('#password').type(user.password)
                cy.get('button[type="submit"]').click()
                // Hacer la comprobacion y mostrar un mensaje de exito
                cy.get('.swal2-popup').should('be.visible')
                cy.get('.swal2-confirm').click()
            })
        })
    })
})
