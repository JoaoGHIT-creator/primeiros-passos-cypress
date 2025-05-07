describe('Orange HRM Tests', () => {
  const SelectorsList = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    submitButton: 'button[type="submit"]',
    breadcrumb: '.oxd-topbar-header-breadcrumb > .oxd-text',
    myInfoLink: '.oxd-text.oxd-text--span.oxd-main-menu-item--name', // Seletor atualizado
    alertContentText: '.oxd-alert-content-text',
    firstNameInput: 'input.oxd-input--active',
    lastNameInput: 'input.oxd-input--active',
    licenseExpiryDateInput: 'input.oxd-input--active',
    nationalityDropdown: '.oxd-select-wrapper',
    maritalStatusDropdown: '.oxd-select-wrapper',
    dateOfBirthInput: 'input.oxd-input--active',
    genderOptions: 'input[name="gender"]',
    dashboard: '.oxd-topbar-header',
    myInfoButton: 'a[href*="viewMyDetails"]',
    employeeIdInput: 'input.oxd-input--active',
  };

  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it.only('User Info Update', () => {
    cy.get(SelectorsList.usernameInput).should('be.visible').type('Admin');
    cy.get(SelectorsList.passwordInput).should('be.visible').type('admin123');
    cy.get(SelectorsList.submitButton).should('be.visible').click();
    cy.location('pathname').should('eq', '/web/index.php/dashboard/index');

    cy.get(SelectorsList.dashboard).should('be.visible'); // Verifica se o painel carregou
    cy.get(SelectorsList.myInfoButton).should('be.visible').click();

    cy.get(SelectorsList.firstNameInput).eq(0).should('be.visible').clear().type('John');
    cy.get(SelectorsList.lastNameInput).eq(0).should('be.visible').clear().type('Doe');
    cy.get(SelectorsList.employeeIdInput).eq(0).should('be.visible').clear().type('EmployeeIdTest');
    cy.get(SelectorsList.dateOfBirthInput).eq(0).should('be.visible').clear().type('1990-01-01');
    cy.get(SelectorsList.licenseExpiryDateInput).eq(0).should('be.visible').clear().type('2030-12-31');
  });

  it('Login - Fail', () => {
    cy.get(SelectorsList.usernameInput).should('be.visible').type('Admin');
    cy.get(SelectorsList.passwordInput).should('be.visible').type('wrongpassword');
    cy.get(SelectorsList.submitButton).should('be.visible').click();

    cy.location('pathname').should('eq', '/web/index.php/auth/login');
    cy.get(SelectorsList.alertContentText).should('contain', 'Invalid credentials');
  });
});
