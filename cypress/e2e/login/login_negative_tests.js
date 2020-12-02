describe('Login - Negative Tests', () => {
    beforeEach(() => {
        cy.visit('/login').contains('Login Page')
        cy.log("Navigating to login page before each test")
      })

    it('Error message displayed if login form submitted is blank', () => {
      cy.get('button[type="submit"').click()
        .get('.flash.error').should('be.visible')
    })

    it('Error message displayed if password missing', () => {
      cy.submitLoginFormWith({ username: 'tomsmith', password: '' })
        .get('.flash.error').should('include.text', 'Your password is invalid!')
    })

    it('Existing user should not login with invalid password', () => {
      cy.submitLoginFormWith({ username: 'tomsmith', password: 'invalidPassword' })
        .get('.flash.error').should('be.visible')
    })
})