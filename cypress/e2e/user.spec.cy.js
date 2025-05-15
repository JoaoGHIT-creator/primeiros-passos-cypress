describe('Orange HRM tests', () => {
  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    sectionTitleTopBar: ".oxd-topbar-header-breadcrumb > .oxd-text",
    wrongCredentialAlert: "[role='alert']",
    dashboardGrid: ".orangehrm-dashboard",
    MyInfo: "[href='/web/index.php/pim/viewMyDetails']", 
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    EmployeeIdField: ".oxd-input--active"
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

  it.only('User info Update', () => {
    cy.visit('/'); 
    cy.get(selectorsList.usernameField).should('be.visible').clear().type(userData.usersuccess.username);
    cy.get(selectorsList.passwordField).should('be.visible').clear().type(userData.usersuccess.password);
    cy.get(selectorsList.loginButton).should('be.visible').click();
    cy.location('pathname').should('eq', '/web/index.php/dashboard/index');
    cy.get(selectorsList.sectionTitleTopBar).should('contain', 'Dashboard'); 
    cy.get(selectorsList.MyInfo).should('be.visible').click();
    cy.get(selectorsList.firstNameField).should('be.visible').clear().type('Lucas');
    cy.get(selectorsList.lastNameField).should('be.visible').clear().type('Lima');
    cy.get(selectorsList.EmployeeIdField).eq(4).should('be.visible').clear().type('123456');
  });

  it('login - fail', () => {
    cy.visit('/'); 
    cy.get(selectorsList.usernameField).should('be.visible').clear().type(userData.userfail.username);
    cy.get(selectorsList.passwordField).should('be.visible').clear().type(userData.userfail.password);
    cy.get(selectorsList.loginButton).should('be.visible').click();
    cy.get(selectorsList.wrongCredentialAlert).should('be.visible');
  });
});
