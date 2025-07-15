/// <reference types="cypress" />

describe('Product Filters', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('GET', '**/products').as('getProducts');
    cy.visit('/Releases');
    cy.wait('@getProducts');
  });

  it('should toggle the filter sidebar visibility', () => {
    cy.get('.products-header__navigation > button').should('exist').click();
    cy.get('.filters').should('exist').and('not.be.visible');
    cy.get('.products-header__navigation > button').click();
    cy.get('.filters').should('exist').and('be.visible');
  });
});
