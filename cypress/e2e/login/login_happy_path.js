import { loginWith, logout } from '../../support/login-logout-util'

// test for 3 different device sizes: mobile, tablet, dekstop
const sizes = ['iphone-8', 'ipad-2', 'macbook-11']

describe('Login Page - Happy Path', () => {

  sizes.forEach((size) => {

    beforeEach(() => {
      // setting viewport and navigating to Login Page for each test
      cy.viewport(size)
      cy.visit('/login').contains('Login Page')
      cy.log("Navigating to login page before each test")
    })

    it(`Existing user with valid credentials should log in. Device size: ${size}`, () => {
      loginWith({ username: 'tomsmith', password: 'SuperSecretPassword!' })
      cy.get('.flash.success').should('include.text', 'You logged into a secure area!')
      cy.get('#login').should('not.exist');
      // check that after page refresh, user still logged in
      cy.reload()
          .get('a[href="/logout"').should('exist')
    })

    it(`Logged user should be able to logout. Device size: ${size}`, () => {
      loginWith({ username: 'tomsmith', password: 'SuperSecretPassword!' })
      cy.get('.flash.success').should('include.text', 'You logged into a secure area!')
      logout()
      cy.get('.flash.success').should('include.text', 'You logged out of the secure area!')
      cy.get('#login').should('be.visible');
    })
  })
})