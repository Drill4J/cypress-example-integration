context('Welcome page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check page heading', () => {
    cy.get('h2').contains('Welcome');
  });

});
