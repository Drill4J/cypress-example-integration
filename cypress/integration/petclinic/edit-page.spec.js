context('Edit page', () => {
  beforeEach(() => {
    cy.visit('//hotels/edit/1');
  });

  it('check page heading', () => {
    // cy.get('h2').contains('Find Owners');
  });

  // [ "Mark",
  //   "Bob",
  //   "Alice",
  // ].forEach((ownerName) => {
  //   it(`find owner ${ownerName}`, () => {
  //     cy.get('input').type(ownerName);
  //     cy.get('button[type="submit"]').click();
  //   })
  // })
});
