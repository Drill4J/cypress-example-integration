context('Delete', () => {
  it('hotel', () => {
    cy.visit('/hotels?form=true');
    const hotel = {
      name: 'To Be Deleted',
      address: 'To Be Deleted',
      zip: '000000'
    };
    cy.get('input[id="name"]').type(hotel.name);
    cy.get('input[id="address"]').type(hotel.address);
    cy.get('input[id="zip"]').type(hotel.zip);
    cy.get('button[type="submit"]').click();
    cy.contains('td', hotel.name)
      .siblings()
      .contains('a', 'Delete')
      .click();
    
    cy.contains('td', hotel.name).should('not.exist');
  });

});
