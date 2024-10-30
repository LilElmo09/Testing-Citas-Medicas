describe('Pruebas de incio de sesión', () => {
    it('Iniciar sesión con credenciales válidas', () => {
        cy.fixture('primeratanda.json').then((users) => {
            // Seleccion de usuario
            const random = Math.floor(Math.random() * users.length)
            const user = users[random]

            // Test de inicio de sesión Exitoso
            cy.visit('http://localhost:3000/login')
            cy.wait(2000)
            cy.get('#email').type(user.email)
            cy.get('#password').type(user.password)
            cy.get('.btn-login').click()

            //comprorbar que se redirige a la pagina de inicio
            cy.get('.swal2-popup').should('be.visible')
            cy.url().should('contain', 'http://localhost:3000/')
        })
    })
    it('Iniciar sesión con credenciales invalidas', () => {
        cy.fixture('user.json').then((users) => {
            // Seleccion de usuario
            const random = Math.floor(Math.random() * users.length)
            const user = users[random]

            // Test de inicio de sesión Exitoso
            cy.visit('http://localhost:3000/login')
            cy.wait(2000)
            if (user.email) {
                cy.get('#email').type(user.email)
            } else {
                cy.get('#email').should('have.attr', 'required')
            }
            if (user.pass) {
                cy.get('#password').type(user.pass)
            } else {
                cy.get('#password').should('have.attr', 'required')
            }
            cy.get('.btn-login').click()

            //comprorbar que se redirige a la pagina de inicio
            cy.get('.swal2-popup')
                .should('be.visible')
                .and('contain', 'Revise su contraseña')
        })
    })
})
