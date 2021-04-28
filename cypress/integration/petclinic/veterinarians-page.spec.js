context('Veterinarians page', () => {
  beforeEach(() => {
    cy.visit('/vets.html');
  });

  it('check page heading', () => {
    cy.get('h2').contains('Veterinarians');
  });

});
