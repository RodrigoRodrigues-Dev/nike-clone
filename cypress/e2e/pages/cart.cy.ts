/// <reference types="cypress" />

describe('Shopping cart', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('GET', '**/products').as('getProducts');
    cy.visit('/Releases');
    cy.wait('@getProducts');
    cy.addFirstProductToCart();
  });

  it('should add a product to the cart', () => {
    cy.get('.cart__bag div').should('exist');
  });

  it('should remove a product from the cart', () => {
    cy.get('.cart__bag-item').should('exist');
    cy.get('.cart__bag-item-actions-quantity > span').eq(1).click();
    cy.get('.cart__bag').should('not.exist');
  });

  it('should change the quantity of a cart item', () => {
    cy.get('.cart__bag-item-actions-quantity > span').eq(2).click();
    cy.get('.cart__bag-item-actions-quantity').should('contain.text', '2');
  });

  it('should complete the purchase', () => {
    cy.get('.cart__summary-btn--check').click();
    cy.get('.cart__complete').should('exist');
  })

  it('should add a product to the favorite', () => {
    cy.get('.cart__bag-item-favorite').click();
    cy.get('.popupItem').should('exist');
  });
});
