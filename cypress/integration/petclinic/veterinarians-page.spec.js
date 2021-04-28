context('Veterinarians page', () => {
  context('deep', () => {
    context('nested test', () => {
      beforeEach(() => {
        cy.visit('/vets.html');
      });

      it('check page heading', () => {
        cy.get('h2').contains('Veterinarians');
      });

    });
  });
});
