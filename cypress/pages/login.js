class login { 
    selectorsList = {
        passwordField: "[name='password']",
        loginButton: "[type='submit']",
        wrongCredentialAlert: "[role='alert']",
    };

    acesslogin() {
        cy.visit('/auth/login');
    }

    loginWithUser(username, password) {
        // Add your login logic here
    }
}
export default new login();