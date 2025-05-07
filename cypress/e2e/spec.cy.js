describe('Orange HRM tests', () => {
const selectorsList = {
usernameField: "[name='nickname']",
professionalField: "[name='username']",
passwordField: "[name='password']",
loginButton: "[type='submit']",
sectionTitletopbar: ".oxd-topbar-header-breadcrumb-module",
wrongCredentialAlert: "[role='alert']",
};

  it('login - success', () => {  // Corrigido 'sucess' para 'success'
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get(selectorsList.professionalField).should('be.visible').type('Admin'); // Corrigido referência para selectorsList
    cy.get(selectorsList.passwordField).should('be.visible').type('admin123');
    cy.get(selectorsList.loginButton).should('be.visible').click();
    cy.location('pathname').should('eq', '/web/index.php/dashboard/index');
    cy.get(selectorsList.sectionTitletopbar).should('contain', 'Dashboard'); // Corrigido seletor com "." antes da classe
  });

  it('login - fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get(selectorsList.professionalField).should('be.visible').type('Admin'); // Corrigido referência para selectorsList
    cy.get(selectorsList.passwordField).should('be.visible').type('admin1234');
    cy.get(selectorsList.loginButton).should('be.visible').click();
    cy.get(selectorsList.wrongCredentialAlert).should('be.visible');  //
    //  Adicionado verificação de visibilidade
  });

});

