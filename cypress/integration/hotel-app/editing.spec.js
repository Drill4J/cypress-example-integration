context('Edit', () => {
  it.skip('that one will be skipped', () => {
  });

  beforeEach(function () {
    cy.fixture('edit-hotels').as('hotels');
  });

  beforeEach(function () {
    cy.visit('/hotels?form=true');
    cy.get('input[id="name"]').type(this.hotels.initial.name);
    cy.get('input[id="address"]').type(this.hotels.initial.address);
    cy.get('input[id="zip"]').type(this.hotels.initial.zip);
    cy.get('button[type="submit"]').click();
    cy.contains('td', this.hotels.initial.name)
      .siblings()
      .contains('a', 'Edit')
      .click();
  })

  it('that one will fail with "Oh no" error', () => {
    throw new Error('Oh no');
  });

  it('name', function () {
    cy.get('input[id="name"]').clear().type(this.hotels.new.name);
    cy.get('button[type="submit"]').click();
    cy.contains('td', this.hotels.new.name).should('exist');
  });

  it('zip', function () {
    cy.get('input[id="zip"]').clear().type(this.hotels.new.zip);
    cy.get('button[type="submit"]').click();
    cy.contains('td', this.hotels.new.zip).should('exist');
  });

  it('address', function () {
    cy.get('input[id="address"]').clear().type(this.hotels.new.address);
    cy.get('button[type="submit"]').click();
    cy.contains('td', this.hotels.new.address).should('exist');
  });
  
  it('all', function () {
    cy.get('input[id="name"]').clear().type(this.hotels.new.name);
    cy.get('input[id="address"]').clear().type(this.hotels.new.address);
    cy.get('input[id="zip"]').clear().type(this.hotels.new.zip);
    cy.get('button[type="submit"]').click();

    cy.contains('td', this.hotels.initial.name).should('not.exist');
    cy.contains('td', this.hotels.initial.address).should('not.exist');
    cy.contains('td', this.hotels.initial.zip).should('not.exist');

    cy.contains('td', this.hotels.new.name).should('exist');
    cy.contains('td', this.hotels.new.address).should('exist');
    cy.contains('td', this.hotels.new.zip).should('exist');
  });

  afterEach(() => {
    cy.request('/hotels/deleteAll');
  })

});
