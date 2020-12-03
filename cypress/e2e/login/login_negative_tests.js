import { loginWith } from '../../support/login-logout-util'

describe('Login Page - Negative Tests', () => {
    beforeEach(() => {
        cy.visit('/login').contains('Login Page')
        cy.log("Navigating to login page before each test")
      })

    it('Error message displayed if login form submitted is blank', () => {
      cy.get('button[type="submit"').click()
        .get('.flash.error').should('be.visible')
    })

    it('Error message displayed if password missing', () => {
      loginWith({ username: 'tomsmith', password: '' })
      cy.get('.flash.error').should('include.text', 'Your password is invalid!')
    })

    it('Existing user should not login with invalid password', () => {
      loginWith({ username: 'tomsmith', password: 'invalidPassword' })
      cy.get('.flash.error').should('be.visible')
        .should('include.text', 'Your password is invalid!')
    })

    it('Non-Existing user should not be able to login', () => {
      loginWith({ username: 'wwwwrrrrr', password: 'qwerty1234' })
      cy.get('.flash.error').should('be.visible')
        .should('include.text', 'Your username is invalid!')
    })
})