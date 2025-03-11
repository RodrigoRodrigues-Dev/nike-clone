import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    selectedFilters: {
      categoryFilters: [],
      saleFilters: [],
      priceFilters: [],
      colorFilters: [],
      genderFilters: [],
      kidGenderFilters: [],
      kidAgeFilters: [],
      activityTypeFilters: [],
      promotionFilters: [],
      climateFilters: [],
      brandFilters: [],
      price: []
    },
    products: []
  }),

  actions: {
    setProducts(products) {
      this.products = products;
    },
    toggleFilter(filterType, value) {
      const filterArray = this.selectedFilters[filterType];
      const index = filterArray.indexOf(value);

      if (index === -1) {
        filterArray.push(value);
      } else {
        filterArray.splice(index, 1);
      }
    },
    setCategoryFilter(category) {
      this.toggleFilter('categoryFilters', category);
    },
    setPriceRangeFilter(range) {
      this.toggleFilter('priceFilters', range);
    },
    setColorFilter(color) {
      this.toggleFilter('colorFilters', color);
    },
    setGenderFilter(gender) {
      this.toggleFilter('genderFilters', gender);
    },
    setKidsAgeFilter(kidAge) {
      this.toggleFilter('kidAgeFilters', kidAge);
    },
    setKidGenderFilter(kidGender) {
      this.toggleFilter('kidGenderFilters', kidGender);
    },
    setActivityTypeFilter(activityType) {
      this.toggleFilter('activityTypeFilters', activityType);
    },
    setClimateFilter(climate) {
      this.toggleFilter('climateFilters', climate);
    },
    setBrandFilter(brand) {
      this.toggleFilter('brandFilters', brand);
    },
    setSaleFilter(sale) {
      this.toggleFilter('saleFilters', sale);
    }
  },

  getters: {
    filteredProducts(state) {
      let filtered = state.products;

      // Filter by categories
      if (state.selectedFilters.categoryFilters.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedFilters.categoryFilters.some((category) =>
            item.categories.includes(category)
          )
        );
      }

      // Filter by sales (promotion tags)
      if (state.selectedFilters.saleFilters.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedFilters.saleFilters.some((sale) =>
            item.promotionTags.includes(sale)
          )
        );
      }

      // Filter by price range
      if (state.selectedFilters.priceFilters.length > 0) {
        const [selectedRange] = state.selectedFilters.priceFilters;

        const parsePriceRange = (range) => {
          if (typeof range !== 'string') return [0, Infinity];
          const match = range.match(/\$?(\d+)\s*-\s*\$?(\d+)/);
          if (match) return [Number(match[1]), Number(match[2])];
          const aboveMatch = range.match(/\$?Over\s*\$?(\d+)/);
          if (aboveMatch) return [Number(aboveMatch[1]), Infinity];
          return [0, Infinity];
        };

        const [minPrice, maxPrice] = parsePriceRange(selectedRange);

        filtered = filtered.filter(
          (item) =>
            Number(item.priceUSD) >= minPrice &&
            Number(item.priceUSD) <= maxPrice
        );
      }

      // Filter by kids' age range
      if (state.selectedFilters.kidAgeFilters.length > 0) {
        const [selectedAgeRange] = state.selectedFilters.kidAgeFilters;

        const parseAgeRange = (range) => {
          if (typeof range !== 'string') return [0, Infinity];

          const match = range.match(/(\d+)\s*-\s*(\d+)/);
          if (match) {
            return [Number(match[1]), Number(match[2])];
          }

          const singleAgeMatch = range.match(/(\d+)\s*yrs?/);
          if (singleAgeMatch) {
            return [Number(singleAgeMatch[1]), Number(singleAgeMatch[1])];
          }

          return [0, Infinity];
        };

        const [minAge, maxAge] = parseAgeRange(selectedAgeRange);

        filtered = filtered.filter((item) => {
          return (
            Array.isArray(item.details.kidsAge) &&
            item.details.kidsAge.some((ageRange) => {
              return ageRange.min <= maxAge && ageRange.max >= minAge;
            })
          );
        });
      }

      // Filter by colors
      if (state.selectedFilters.colorFilters.length > 0) {
        filtered = filtered.filter((item) =>
          item.details.availableColors.some((color) =>
            state.selectedFilters.colorFilters.includes(color)
          )
        );
      }

      // Filter by gender
      if (state.selectedFilters.genderFilters.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedFilters.genderFilters.includes(
            item.details.targetGender
          )
        );
      }

      // Filter by kids' gender
      if (state.selectedFilters.kidGenderFilters.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedFilters.kidGenderFilters.includes(
            item.details.kidGender
          )
        );
      }

      // Filter by activity type
      if (state.selectedFilters.activityTypeFilters.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedFilters.activityTypeFilters.includes(
            item.details.activityType
          )
        );
      }

      // Filter by brand
      if (state.selectedFilters.brandFilters.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedFilters.brandFilters.includes(item.brandName)
        );
      }

      // Filter by climate suitability
      if (state.selectedFilters.climateFilters.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedFilters.climateFilters.includes(item.details.idealFor)
        );
      }

      return filtered;
    }
  }
});
