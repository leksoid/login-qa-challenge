import { loginWith } from '../../support/login-logout-util'

// test for 3 different device sizes: mobile, tablet, dekstop
const sizes = ['iphone-8', 'ipad-2', 'macbook-11']

describe('Login Page - Negative Tests', () => {

  sizes.forEach((size) => {
    
    beforeEach(() => {
      // setting viewport and navigating to Login Page for each test
      cy.viewport(size)
      cy.visit('/login').contains('Login Page')
      cy.log("Navigating to login page before each test")
    })

    it(`Error message displayed if login form submitted is blank. Device size: ${size}`, () => {
      cy.get('button[type="submit"').click()
        .get('.flash.error').should('be.visible')
    })

    it(`Error message displayed if password missing. Device size: ${size}`, () => {
      loginWith({ username: 'tomsmith', password: '' })
      cy.get('.flash.error').should('include.text', 'Your password is invalid!')
    })

    it(`Existing user should not login with invalid password. Device size: ${size}`, () => {
      loginWith({ username: 'tomsmith', password: 'invalidPassword' })
      cy.get('.flash.error').should('be.visible')
        .should('include.text', 'Your password is invalid!')
    })

    it(`Non-Existing user should not be able to login. Device size: ${size}`, () => {
      loginWith({ username: 'wwwwrrrrr', password: 'qwerty1234' })
      cy.get('.flash.error').should('be.visible')
        .should('include.text', 'Your username is invalid!')
    })
  })
})