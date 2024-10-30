describe('Pruebas de solicitar y ver una cita', () => {
    const TIME = 1500
    it('Happy path', () => {
        cy.fixture('primeratanda.json').then((users) => {
            // Seleccion de usuario
            const random = Math.floor(Math.random() * users.length)
            const user = users[random]

            // Iniciar Sesion
            cy.visit('http://localhost:3000')
            cy.get(':nth-child(2) > .btn').should('be.visible').click()
            cy.wait(TIME)

            cy.get('#email').type('christhian.aracena@correoaiep.cl')
            cy.get('#password').type('asd')
            cy.wait(TIME)
            cy.get('.btn-login').click()

            //Comprobar que se inicio sesion
            cy.get('.swal2-popup').should('be.visible')
            cy.wait(TIME)
            cy.url().should('contain', 'http://localhost:3000/')
            cy.wait(TIME)

            //Comprobar que este los botones de Reservar hora y Mis reservas
            cy.get(':nth-child(2) > .btn')
                .should('be.visible')
                .should('contain.text', 'Reservar hora')
            cy.get(':nth-child(3) > .btn')
                .should('be.visible')
                .should('contain.text', 'Mis reservas')
            cy.get(':nth-child(2) > .btn').click()
            cy.wait(TIME)

            //Elegir una especialidad
            cy.get('.especialidades-container')
                .children()
                .then(($especialidades) => {
                    const randomIndex = Math.floor(
                        Math.random() * $especialidades.length
                    )
                    cy.wrap($especialidades[randomIndex]).click()
                })
            cy.wait(TIME)

            //Elegir medico
            cy.get('.tarjetas-medicos')
                .children()
                .then(($medicos) => {
                    const randomMedicoIndex = Math.floor(
                        Math.random() * $medicos.length
                    )
                    cy.wrap($medicos[randomMedicoIndex]).click()
                })
            cy.wait(TIME)

            //Elegir hora
            cy.get(':nth-child(1) > .horarios')
                .children()
                .then(($horarios) => {
                    const randomHorarioIndex = Math.floor(
                        Math.random() * $horarios.length
                    )
                    cy.wrap($horarios[randomHorarioIndex]).click()
                })
            cy.wait(TIME)

            //Confirmar
            cy.get('.btn-confirmar').click()
            cy.get('.swal2-popup').should('be.visible')
            cy.get('#swal2-title').should('contain', 'Su cita ha sido agendada')
            cy.get('.swal2-confirm').click()
            cy.wait(TIME)

            //Comprobar que se cambio de color la hora solicitada
            cy.get(
                '[style="background-color: rgb(255, 204, 204); color: gray; cursor: not-allowed;"]'
            ).should('be.visible')
            cy.wait(TIME)

            //Comprobar la reserva
            cy.get(':nth-child(3) > .btn').click()
            cy.wait(TIME)
            cy.get('.doctor-info').should('be.visible')
            cy.get(
                ':nth-child(1) > .horas-disponibles > :nth-child(4) > :nth-child(1)'
            ).should('be.visible')
            cy.wait(TIME)

            //Anular hora
            cy.get('.anular-btn')
                .should('be.visible')
                .and('contain', 'Anular hora')
                .click()
            cy.wait(TIME)
            cy.get('.swal2-popup').should('be.visible')
            cy.get('.swal2-cancel').should('be.visible')
            cy.get('.swal2-confirm').should('be.visible').click()
            cy.wait(TIME)
            cy.get('.swal2-popup')
                .should('be.visible')
                .and('contain', 'Cita anulada')
            cy.get('.swal2-confirm').click()
            cy.wait(TIME)

            //Cerrar sesión
            cy.get(':nth-child(4) > .btn').click()
        })
    })
})
