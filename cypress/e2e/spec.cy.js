describe('Orange HRM tests', () => {
  
  it('login - success', () => {  // Corrigido 'sucess' para 'success'
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get(elementsList.professionalField).should('be.visible').type('Admin');
    cy.get("[name='password']").should('be.visible').type('admin123');
    cy.get("[type='submit']").should('be.visible').click();
    cy.location('pathname').should('eq', '/web/index.php/dashboard/index');
    cy.get(".oxd-topbar-header-breadcrumb-module").should('contain', 'Dashboard'); // Corrigido seletor com "." antes da classe
  });

  it('login - fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get(elementsList.professionalField).should('be.visible').type('Admin');
    cy.get("[name='password']").should('be.visible').type('admin1234');
    cy.get("[type='submit']").should('be.visible').click();
    cy.get("[role='alert']").should('be.visible');  // Adicionado verificação de visibilidade
  });

});
