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
    middleNameField: "[name='middleName']",
    lastNameField: "[name='lastName']",
    GenericField: ".oxd-input--active",
    DateCloseButton: ".--close",
    GenericComboBox: ".oxd-select-text--arrow",
    submitButton:"[type='submit']",
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
    cy.get(selectorsList.firstNameField).should('be.visible').clear().type('João');
    cy.get(selectorsList.middleNameField).should('be.visible').clear().type('Victor');
    cy.get(selectorsList.lastNameField).should('be.visible').clear().type('Alves');
    cy.get(selectorsList.GenericField).eq(3).should('be.visible').clear().type('IDtest');
    cy.get(selectorsList.GenericField).eq(4).should('be.visible').clear().type('otherID');
    cy.get(selectorsList.GenericField).eq(5).should('be.visible').clear().type('driverlicense');
    cy.get(selectorsList.GenericField).eq(6).should('be.visible').clear().type('2026-04-03');
    cy.get(selectorsList.DateCloseButton).should('be.visible').click();
    cy.get(selectorsList.submitButton).eq(1).should('be.visible').click();
    cy.get(selectorsList.GenericComboBox).eq(0).should('be.visible').click();
  cy.get('.oxd-select-dropdown > :nth-child(6)').should('be.visible').click();
  cy.get(selectorsList.GenericComboBox).eq(1).should('be.visible').click();
  cy.get('.oxd-select-dropdown > :nth-child(3)').should('be.visible').click();

});

it('login - fail', () => {
    cy.visit('/'); 
    cy.get(selectorsList.usernameField).should('be.visible').clear().type(userData.userfail.username);
    cy.get(selectorsList.passwordField).should('be.visible').clear().type(userData.userfail.password);
    cy.get(selectorsList.loginButton).should('be.visible').click();
    cy.get(selectorsList.wrongCredentialAlert).should('be.visible');
  });
});
