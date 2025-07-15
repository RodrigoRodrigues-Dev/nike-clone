/// <reference types="cypress" />

describe('Favorites', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('GET', '**/products').as('getProducts');
    cy.visit('/Releases');
    cy.wait('@getProducts');
    cy.addFirstProductToFavorite();
  });

  it('should add a product to favorites', () => {
    cy.get('.favorites__items > div').should('exist');
  });

  it('should add a favorite product to the cart', () => {
    cy.get('.favorites__item-button').click();
    cy.get('.favorites-modal__sizes-buttons > button').first().click();
    cy.get('.favorites-modal__add-button').click();
    cy.get('[href="/Cart"] > .header__menu-icon-container').click();
    cy.get('.cart__bag div').should('exist');
  });

  it('should remove a product from favorites', () => {
    cy.get('.favorites__item-icon-container').click();
    cy.get('.favorites__items > div').should('not.exist');
  });
});
