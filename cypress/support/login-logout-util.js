export const loginWith = (user) => {
    if (user.username.length > 0) {
        cy.get('#username')
        .type(user.username)
    }
    if (user.password.length > 0) {
        cy.get('#password')
        .type(user.password)
    }
    cy.get('button[type="submit"').click()
  }

export const logout = () => {
    cy.get('a[href="/logout"').click()
}