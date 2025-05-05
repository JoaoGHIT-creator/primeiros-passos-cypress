describe('template spec', () => {
  it('login - Success', () => {
    // Visit the login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Fill in username and password
    cy.get('input[name="username"]').type('Admin'); // Username field
    cy.get('input[name="password"]').type('admin123'); // Password field

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Verify the URL after login
    cy.location('pathname').should('eq', '/web/index.php/dashboard/index');

    // Verify the breadcrumb text
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard');
  });

  it('login - Failure', () => {
    // Visit the login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Fill in username with valid input and password with invalid input
    cy.get('input[name="username"]').type('Admin'); // Username field
    cy.get('input[name="password"]').type('wrongpassword'); // Incorrect password

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Verify the error message
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });
});