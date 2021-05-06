context('Edit page', () => {
  beforeEach(() => {
    cy.visit('//hotels/edit/1');
  });

  it('check page heading', () => {
    // cy.get('h2').contains('Find Owners');
  });

  it.skip('not going to display in Drill4J', () => {
  });

  it('will fail with oh no error', () => {
    throw new Error('oh no')
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
