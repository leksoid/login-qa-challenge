import { loginWith, logout } from '../../support/login-logout-util'

describe('Login Page - Happy Path', () => {
    beforeEach(() => {
      cy.visit('/login').contains('Login Page')
      cy.log("Navigating to login page before each test")
    })

    it('Existing user with valid credentials should log in', () => {
      loginWith({ username: 'tomsmith', password: 'SuperSecretPassword!' })
      cy.get('.flash.success').should('include.text', 'You logged into a secure area!')
      cy.get('#login').should('not.exist');
    })

    it('Logged user should be able to logout', () => {
      loginWith({ username: 'tomsmith', password: 'SuperSecretPassword!' })
      cy.get('.flash.success').should('include.text', 'You logged into a secure area!')
      logout()
      cy.get('.flash.success').should('include.text', 'You logged out of the secure area!')
      cy.get('#login').should('be.visible');
    })
})