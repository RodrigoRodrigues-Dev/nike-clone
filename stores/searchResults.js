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

      if (this.showSearchResults) {
        window.scrollTo({
          top: 0,
        });
      }

      this.valueInput = '';
    },
    setValueInput(value) {
      this.valueInput = value;
      debounce(() => {
        this.debouncedValueInput = value;
      }, 300)();
    }
  },
  getters: {
    resultSearch(state) {
      if (state.debouncedValueInput && state.debouncedValueInput.trim()) {
        return state.products.filter(item =>
          item.productName.toLowerCase().includes(state.debouncedValueInput.toLowerCase())
        );
      }
      return [];
    },
  },
});