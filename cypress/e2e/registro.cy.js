describe('Pruebas de registro', () => {
    it('Registro con credenciales válidas', () => {
        cy.fixture('user.json').then((users) => {
            // Seleccion de usuario
            const random = Math.floor(Math.random() * users.length)
            const user = users[random]

            // Test de registro Exitoso
            cy.visit('http://localhost:3000/register')
            cy.wait(2000)
            cy.get('#nombre').type(user.name)
            cy.get('#email').type(user.email)
            cy.get('#telefono').type(user.phone)
            cy.get('#direccion').type(user.address)
            cy.get('#password').type(user.pass)
            cy.get('button[type="submit"]').click()
            cy.wait(2000)

            // Hacer la comprobacion y mostrar un mensaje de exito
            cy.get('.swal2-popup')
                .should('be.visible')
                .and('contain', 'Registro exitoso')
                .and(
                    'contain',
                    'El usuario ha sido registrado correctamente. Ya puede iniciar sesión'
                )
            cy.get('.swal2-confirm').should('be.visible').click()
        })
    })
    it('Registro con correo ya registrado', () => {
        // Test de registro con correo ya registrado
        cy.visit('http://localhost:3000/register')
        cy.wait(1000)
        cy.get('#nombre').type('Jim')
        cy.get('#email').type('jim@correoaiep.cl')
        cy.get('#telefono').type('92823409')
        cy.get('#direccion').type('Mi Casa')
        cy.get('#password').type('1234')
        cy.get('button[type="submit"]').click()
        cy.wait(2000)

        // Hacer la comprobacion y mostrar un mensaje de exito
        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain', 'El correo ya está registrado.')
        cy.get('.swal2-confirm').should('be.visible').click()
    })
    it.only('Registro con datos faltantes', () => {
        cy.fixture('userFail.json').then((users) => {
            // Seleccion de usuario
            const random = Math.floor(Math.random() * users.length)
            const user = users[random]

            // Test de registro con datos faltantes
            cy.visit('http://localhost:3000/register')
            cy.wait(2000)
            if (user.name) {
                cy.get('#nombre').type(user.name)
            } else {
                cy.get('#nombre').should('have.attr', 'required')
            }
            if (user.email) {
                cy.get('#email').type(user.email)
            } else {
                cy.get('#email').should('have.attr', 'required')
            }
            if (user.phone) {
                cy.get('#telefono').type(user.phone)
            } else {
                cy.get('#telefono').should('have.attr', 'required')
            }
            if (user.address) {
                cy.get('#direccion').type(user.address)
            } else {
                cy.get('#direccion').should('have.attr', 'required')
            }
            if (user.pass) {
                cy.get('#password').type(user.pass)
            } else {
                cy.get('#password').should('have.attr', 'required')
            }
            cy.get('button[type="submit"]').click()
        })
    })
})
