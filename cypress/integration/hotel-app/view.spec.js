context('View', () => {
  it('main page', () => {
    cy.visit('/hotels');
    cy.contains('a', 'Hotels Listing').should('exist');
  });

  it('edit page', () => {
    cy.visit('/hotels?form=true');
  });
});
