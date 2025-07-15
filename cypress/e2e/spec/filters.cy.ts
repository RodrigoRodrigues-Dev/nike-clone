/// <reference types="cypress" />

describe('Product Filters', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products').as('getProducts');
    cy.visit('/Releases');
    cy.wait('@getProducts');
  });

  it('applies category filter and updates product grid', () => {
    cy.get('.filters__categories > li').first().click();
    cy.get('.products-header__category-value').should('exist');
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);
  });

  it('applies sale filter and updates product grid', () => {
    cy.get('.filters > :nth-child(5)').click();
    cy.get(':nth-child(5) > .filters__group-list > :nth-child(3) > .filters__label').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);
  })

  it('applies Shop by Price filter and updates product grid with correct price range', () => {
    cy.get('.filters > :nth-child(6)').click();
    cy.get(':nth-child(6) > .filters__group-list > :nth-child(1) > .filters__label').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);

    cy.get('.product-card__price').each(($el) => {
      const priceText = $el.text().replace(/[^\d,.]/g, '').replace(',', '.');
      const price = parseFloat(priceText);
      expect(price).to.be.at.least(25);
      expect(price).to.be.at.most(50);
    });
  })

  it('filters by Gender "Men" and updates product grid with only men products', () => {
    cy.get('.filters > :nth-child(7)').click();
    cy.get(':nth-child(7) > .filters__group-list > :nth-child(1) > .filters__label').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);

    cy.get('.product-card__subtitle').each(($el) => {
      const genderText = $el.text().toLowerCase();
      expect(genderText).to.include('men');
      expect(genderText).to.not.include('Women');
      expect(genderText).to.not.include('unisex');
    });
  })

  it('filters by Gender "Women" and updates product grid with only women products', () => {
    cy.get('.filters > :nth-child(7)').click();
    cy.get(':nth-child(7) > .filters__group-list > :nth-child(2) > .filters__label').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);

    cy.get('.product-card__subtitle').each(($el) => {
      const genderText = $el.text().toLowerCase();
      expect(genderText).to.include('women');
      expect(genderText).to.not.include('man');
      expect(genderText).to.not.include('unisex');
    });
  })

  it('filters by Kids "Boys" and updates product grid', () => {
    cy.get('.filters > :nth-child(8)').click();
    cy.get(':nth-child(8) > .filters__group-list > :nth-child(1) > .filters__label').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);
  })

  it('filters by Kids "Girls" and updates product grid', () => {
    cy.get('.filters > :nth-child(9)').click();
    cy.get(':nth-child(9) > .filters__group-list > :nth-child(1) > .filters__label').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);
  })

  it('filters by Colors and updates product grid', () => {
    cy.get('.filters > :nth-child(10)').click();
    cy.get(':nth-child(1) > .filters__color-circle').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);
  })

  it('filters by Brand and updates product grid', () => {
    cy.get('.filters > :nth-child(11)').click();
    cy.get(':nth-child(11) > .filters__group-list > .filters__categories-item > .filters__label').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);
  })

  it('filters by Sports & Activities and updates product grid', () => {
    cy.get('.filters > :nth-child(12)').click();
    cy.get(':nth-child(12) > .filters__group-list > :nth-child(1) > ').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);
  })

  it('filters by Best For and updates product grid', () => {
    cy.get('.filters > :nth-child(13)').click();
    cy.get(':nth-child(13) > .filters__group-list > .filters__categories-item > .filters__label').click();
    cy.get('.products-grid > div').should('have.length.greaterThan', 0);
  })
});
