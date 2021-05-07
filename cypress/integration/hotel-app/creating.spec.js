const hotelsList = require('../../fixtures/create-hotels');

context('Create', () => {
  beforeEach(() => {
    cy.visit('/hotels?form=true');
  });

  hotelsList.forEach((hotel, index) => {
    it(`hotel #${index}`, () => {
      cy.get('input[id="name"]').type(hotel.name);
      cy.get('input[id="address"]').type(hotel.address);
      cy.get('input[id="zip"]').type(hotel.zip);
      cy.get('button[type="submit"]').click();

      cy.get('tbody')
        .last()
        .children()
        .should('contain', hotel.name)
        .and('contain', hotel.address)
        .and('contain', hotel.zip)
    });
  });

});
