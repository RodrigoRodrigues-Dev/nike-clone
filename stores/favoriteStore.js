import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
    state: () => ({
        items: [],
        selectSizeItem: null,
        isModalOpen: false
    })
})