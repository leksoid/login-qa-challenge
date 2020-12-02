describe('Login - Happy Path', () => {
    beforeEach(() => {
      cy.visit('/login').contains('Login Page')
      cy.log("Navigating to login page before each test")
    })

    it('Existing user with valid credentials should log in', () => {
      cy.submitLoginFormWith({ username: 'tomsmith', password: 'SuperSecretPassword!' })
        .get('.flash.success').should('include.text', 'You logged into a secure area!')
        .get('#login').should('not.exist');
    })

    it('Logged user should be able to logout', () => {
      cy.submitLoginFormWith({ username: 'tomsmith', password: 'SuperSecretPassword!' })
        .get('.flash.success').should('include.text', 'You logged into a secure area!')
        .get('a[href="/logout"').click()
        .get('.flash.success').should('include.text', 'You logged out of the secure area!')
        .get('#login').should('be.visible');
    })
})