context('Welcome page', () => {
  context('nested test', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('check page heading', () => {
      // cy.get('h2').contains('Welcome');
    });

  });
});
