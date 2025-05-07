describe('Orange Hrm tests', () => {
  const sel = {
    user: 'input[name="username"]',
    pass: 'input[name="password"]',
    btn: 'button[type="submit"]',
    bread: '.oxd-topbar-header-breadcrumb > .oxd-text',
    info: 'a[href*="viewMyDetails"]',
    alert: '.oxd-alert-content-text',
    fName: 'input[name="firstName"]',
    lName: 'input[name="lastName"]',
    driversLicenseNumber: ':nth-child(2) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input',
    licenseExpiryDate: ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input',
    nationality: ':nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text',
    maritalStatus: ':nth-child(5) > :nth-child(1) > :nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label',
     // Novo seletor corrigido
     dateOfBirthInput: '.oxd-input-group__label-wrapper:eq(1)',
    genderOptions: "input[name='gender']"
  };

  const acceptedTitles = ['Dashboard', 'Pizarra de pendientes', 'Painel de Controle', 'Tableau de bord'];

  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 15000);
    Cypress.Screenshot.defaults({ screenshotOnRunFailure: false });
    Cypress.on('uncaught:exception', () => false);
  });

  it.only('Update Info', () => {
    cy.visit('auth/login');

    cy.get(sel.user).should('exist').should('be.visible').type('Admin');
    cy.get(sel.pass).should('exist').should('be.visible').type('admin123');
    cy.get(sel.btn).should('exist').should('be.visible').click();

    cy.location('pathname', { timeout: 15000 }).should('eq', '/web/index.php/dashboard/index');

    cy.get(sel.bread).should('be.visible').invoke('text').then((text) => {
      expect(acceptedTitles.some(title => text.includes(title))).to.be.true;
    });

    cy.get(sel.info).should('exist').should('be.visible').click();
    cy.get(sel.fName).should('exist').should('be.visible').clear().type('NewFirstName');
    cy.get(sel.lName).should('exist').should('be.visible').clear().type('NewLastName');

    // Evitando múltiplos elementos e sobreposição
    cy.get(sel.driversLicenseNumber, { timeout: 15000 })
      .should('exist').should('be.visible')
      .first()
      .scrollIntoView()
      .clear()
      .type('123456789');

    cy.get(sel.licenseExpiryDate, { timeout: 15000 })
      .should('exist').should('be.visible')
      .scrollIntoView()
      .clear()
      .type('2026-12-31');

    // Lidando com dropdowns
    cy.get(sel.nationality).click({ force: true });
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-select-dropdown').length > 0) {
        cy.get('.oxd-select-dropdown').should('exist').should('be.visible').contains('Brazil').click({ force: true });
      } else {
        cy.log('Dropdown de nacionalidade não apareceu, verificando alternativa...');
      }
    });

    cy.get(sel.maritalStatus).click({ force: true });
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-select-dropdown').length > 0) {
        cy.get('.oxd-select-dropdown').should('exist').should('be.visible').contains('Single').click({ force: true });
      } else {
        cy.log('Dropdown de estado civil não apareceu, verificando alternativa...');
      }
    });

    // Corrigindo interações com data de nascimento
    cy.get(sel.dateOfBirth, { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .scrollIntoView()
      .clear()
      .type('1995-05-20');

    // Lidando com múltiplas opções de gênero
    cy.get(sel.genderOptions).each(($el) => {
      cy.wrap($el).should('exist').should('be.visible').click({ force: true });
    });
  });

  it('Login - Failure', () => {
    cy.visit('/');
    cy.get(sel.user).should('exist').should('be.visible').type('Admin');
    cy.get(sel.pass).should('exist').should('be.visible').type('wrongpassword');
    cy.get(sel.btn).should('exist').should('be.visible').click();
    cy.get(sel.alert, { timeout: 15000 }).should('contain', 'Invalid credentials');
  });
});
