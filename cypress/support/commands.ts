/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      addFirstProductToCart(): Chainable<void>;
      addFirstProductToFavorite(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addFirstProductToCart', () => {
  cy.get('.products-grid > div').first().click();
  cy.get('.product-view__sizes > div').first().click();
  cy.get('.product-view__btn--add-cart').click();
  cy.get('[href="/Cart"] > .header__menu-icon-container').click();
});

Cypress.Commands.add('addFirstProductToFavorite', () => {
  cy.get('.products-grid > div').first().click();
  cy.get('.product-view__btn--add-fav').click();
  cy.get('[href="/Favorites"] > .header__menu-icon-container > .iconify').click();
});
