import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        itens: [],
        purchaseCompleted: false,
    }),
});