describe('Orange Hrm tests', () => {
  // Definição correta da lista de seletores
  const selectorList = {
    usernameField: 'input[name="username"]',
    passwordField: 'input[name="password"]',
    submitButton: 'button[type="submit"]',
    breadcrumb: '.oxd-topbar-header-breadcrumb-module',
    dashboardGrid: '.orangehrm-dashboard-grid',
    alertMessage: '[role="alert"]'
  };

  it('login - Success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get(selectorList.usernameField, { timeout: 10000 }).should('be.visible').type('Admin');
    cy.get(selectorList.passwordField).should('be.visible').type('admin123');
    cy.get(selectorList.submitButton).should('be.visible').click();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/web/index.php/dashboard/index');
    cy.get(selectorList.breadcrumb).should('contain', 'Dashboard');
  });

  it('login - Failure', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get(selectorList.usernameField, { timeout: 10000 }).should('be.visible').type('Admin');
    cy.get(selectorList.passwordField).should('be.visible').type('wrongpassword');
    cy.get(selectorList.submitButton).should('be.visible').click();
    cy.get(selectorList.alertMessage, { timeout: 10000 }).should('contain', 'Invalid credentials');
  });
});