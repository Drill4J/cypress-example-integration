context('Adding page', () => {
  context('deep', () => {
    context('nested test', () => {
      beforeEach(() => {
        cy.visit('/hotels?form=true');
      });

      it('check page heading', () => {
        // cy.get('h2').contains('Veterinarians');
      });

    });
  });
});
