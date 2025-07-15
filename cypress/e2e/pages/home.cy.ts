/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products').as('getProducts');
    cy.visit('/');
    cy.wait('@getProducts');
  });

  it('should display the main banner on the home page', () => {
    cy.get('main').should('be.visible');
  });

  it('should navigate to a product page when a product card is clicked', () => {
    cy.get('.releases-banner__btn').click();
    cy.get('.products-grid > div').first().click();
    cy.url().should('include', '/Releases/');
  });

  it('should perform a product search and show results', () => {
    cy.get('.header__search').click();
    cy.get('.search-results__search__input').type('Jordan');
    cy.get('.search-results__products').should('be.visible');
  });
});
