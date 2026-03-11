import { defineStore } from 'pinia';
import debounce from 'lodash.debounce';

export const useSearchResults = defineStore('searchResults', {
  state: () => ({
    showSearchResults: false,
    valueInput: '',
    debouncedValueInput: '',
    products: []
  }),
  actions: {
    toggleSearchResults() {
      this.showSearchResults = !this.showSearchResults;
      document.body.style.overflow = this.showSearchResults ? 'hidden' : '';
      if (this.showSearchResults) window.scrollTo({ top: 0 });
      this.valueInput = '';
      this.debouncedValueInput = '';
    },

    setValueInput(value) {
      this.valueInput = value;

      if (!this._debouncedSet) {
        this._debouncedSet = debounce((val) => {
          this.debouncedValueInput = val;
        }, 300);
      }

      this._debouncedSet(value);
    }
  },

  getters: {
    resultSearch(state) {
      const q = (state.debouncedValueInput || '').trim().toLowerCase();
      if (!q) {
        return state.products;
      }

      return state.products.filter((item) => {
        const name = (item.productName || '').toLowerCase();
        const desc = (item.productDescription || '').toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }
  }
});