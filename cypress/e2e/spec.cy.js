import userData from '../../fixtures/user.json';



describe('Orange HRM tests', () => {
  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    sectionTitleTopBar: ".oxd-topbar-header-breadcrumb > .oxd-text",
    wrongCredentialAlert: "[role='alert']",
    dashboardGrid: ".oxd-layout-navigation"
  };
  
const userData = {
  usersuccess: {
    username: 'Admin',
    password: 'admin123'
  },
  userfail: {
    username: 'Admin',
    password: 'admin1234'
  }
};

  it('login - success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get(selectorsList.usernameField).should('be.visible').type(userData.usersuccess.username);
    cy.get(selectorsList.passwordField).should('be.visible').type(userData.usersuccess.password);
    cy.get(selectorsList.loginButton).should('be.visible').click();
    cy.location('pathname').should('eq', '/web/index.php/dashboard/index');
    cy.get(selectorsList.sectionTitleTopBar).should('contain', 'Dashboard'); 
  });

  it('login - fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get(selectorsList.usernameField).should('be.visible').type(userData.userfail.username);
    cy.get(selectorsList.passwordField).should('be.visible').type(userData.userfail.password);
    cy.get(selectorsList.loginButton).should('be.visible').click();
    cy.get(selectorsList.wrongCredentialAlert).should('be.visible');
    
  });
});