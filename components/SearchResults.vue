<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <template v-if="showSearchResults">
    <div class="search-results">
      <div class="search-results__container">
        <RouterLink to="/" @click="searchResults.toggleSearchResults">
          <img
            class="search-results__logo"
            src="https://nike-vibe-shop-images.vercel.app/nike-logo.png"
            alt="Logo da Nike"
          />
        </RouterLink>
        <div class="search-results__search">
          <div class="search-results__search__icon-container">
            <button class="search-results__search__button">
              <icon
                class="search-results__search__icon"
                name="clarity:search-line"
              />
            </button>
          </div>
          <input
            type="search"
            value=""
            class="search-results__search__input"
            placeholder="Search"
            autocomplete="off"
            aria-label="Search Products"
            inputmode="search"
            @input="handleInput"
          />
        </div>
        <span
          class="search-results__cancel"
          @click="searchResults.toggleSearchResults"
          >cancel</span
        >
      </div>
      <div v-if="productsSearch.length <= 0" class="search-results__popular">
        <p class="search-results__popular-label">Popular Search Terms</p>
        <div class="search-results__popular-content">
          <div
            v-for="(category, index) in popularCategory"
            :key="index"
            class="search-results__popular-item"
            @click="captureCategory(category)"
          >
            <p class="search-results__popular-text">{{ category }}</p>
          </div>
        </div>
      </div>
      <div v-else class="search-results__products">
        <div class="search-results__suggestions">
          <p class="search-results__suggestions-title">Top Suggestions</p>
          <div class="search-results__suggestions-list">
            <span
              class="search-results__suggestions-item"
              v-for="item in suggestionsFiltered"
              :key="item.id"
              v-html="highlightMatch(item)"
            >
            </span>
          </div>
        </div>
        <template v-if="isLoading" class="search-results__loading-spinner">
          <div class="search-results__lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </template>
        <template v-else>
          <div class="search-results__products-content">
            <div
              class="search-results__products-card"
              v-for="(item, index) in productsSearch"
              :key="index"
              @click="(goToProduct(item), searchResults.toggleSearchResults())"
            >
              <img
                :src="item.images.main"
                alt=""
                class="search-results__products-card__image"
              />
              <p class="search-results__products-card__title">
                {{ item.productName }}
              </p>
              <p class="search-results__products-card__description">
                {{ item.productDescription }}
              </p>
              <p class="search-results__products-card__price">
                ${{ item.priceUSD }}.00
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="modal-overlay" @click="searchResults.toggleSearchResults"></div>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import { useSearchResults } from '~/stores/searchResults';
import { useProductNavigation } from '~/composables/useProductNavigation';
import { suggestions, popularCategory } from '~/data/searchData';

const searchResults = useSearchResults();
const { goToProduct } = useProductNavigation();

const showSearchResults = computed(() => searchResults.showSearchResults);
const productsSearch = computed(() => searchResults.resultSearch.slice(0, 5));
const isLoading = computed(
  () => searchResults.valueInput !== searchResults.debouncedValueInput
);

const suggestionsFiltered = computed(() => {
  return suggestions
    .filter((item) =>
      item.toLowerCase().includes(searchResults.valueInput.toLowerCase())
    )
    .slice(0, 5);
});

const highlightMatch = (text) => {
  const searchTerm = searchResults.valueInput.trim();
  if (!searchTerm) return text;

  const escapedSearchTerm = searchTerm.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

  return text.replace(regex, `<span class="highlight">$1</span>`);
};

const captureCategory = (item) => {
  searchResults.valueInput = item;
};

const handleInput = (event) => {
  searchResults.setValueInput(event.target.value);
};
</script>

<style lang="scss">
.search-results {
  z-index: 9999;
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  background-color: $color-white;
  overflow-y: scroll;

  @media (max-width: 1260px) {
    width: 100vw;
    height: 100vh;
  }

  &__logo {
    width: 75px;

    @media (max-width: 960px) {
      display: none;
    }
  }

  &__container {
    margin: 0 auto;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
  }

  &__cancel {
    font-size: 1.2rem;

    &:hover {
      cursor: pointer;
      color: $color-charcoal-gray;
    }
  }

  &__search {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $color-light-background;
    border-radius: 10rem;

    &:hover {
      background-color: $color-soft-gray;
    }

    &__input,
    &__button {
      border: none;
      background-color: transparent;
      height: 100%;

      &:focus {
        outline: none;
      }
    }

    &__button {
      width: 30px;

      &:hover {
        cursor: pointer;
      }
    }

    &__input {
      width: 100%;
      height: 100%;
      font-size: 1rem;
      margin-left: 0.3rem;
    }

    &__icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem;
      border-radius: 5rem;
      background-color: $color-light-background;

      &:hover {
        background-color: $color-light-gray;
      }
    }

    &__icon {
      font-size: 1.3rem;
    }
  }

  &__suggestions {
    color: $color-slate-gray;

    @media (max-width: 1790px) {
      margin-bottom: 3rem;
    }

    &-title {
      margin-bottom: 2rem;

      @media (max-width: 1570px) {
        font-size: 1.2rem;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.1rem;
    }
  }

  &__products {
    padding: 2rem;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1790px) {
      flex-direction: column;
      flex-wrap: wrap;
    }

    &-content {
      display: flex;
      gap: 1rem;

      @media (max-width: 1790px) {
        margin: 0 auto;
      }

      @media (max-width: 1570px) {
        row-gap: 2rem;
        column-gap: 0;

        display: grid;
        grid-template-columns: repeat(4, 1fr);

        @media (max-width: 1260px) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 960px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    &-card {
      &__title {
        margin-top: 0.5rem;
      }

      &__image {
        width: 288px;
        border-radius: 1rem;
      }

      @media (max-width: 1570px) {
        &__image {
          width: 90%;
        }
      }

      &__description {
        color: $color-gray;
        margin: 0.5rem 0;
      }

      &__price {
        margin-top: 1rem;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__popular {
    margin: 3rem auto;
    width: 75%;

    @media (max-width: 1280px) {
      margin: 2rem auto;
    }

    &-label {
      font-size: 1.2rem;
      color: $color-dust-gray;
      margin-bottom: 2rem;
    }

    &-content {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    &-item {
      width: auto;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      background-color: $color-light-background;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__loading-spinner {
    text-align: center;
    font-size: 1.5rem;
    color: $color-gray;
    width: 100%;
    height: 100%;
  }

  &__lds-ring,
  &__lds-ring div {
    margin: auto;
  }

  &__lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  &__lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid currentColor;
    border-radius: 50%;
    animation: search-results__lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1)
      infinite;
    border-color: currentColor transparent transparent transparent;
  }

  &__lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  &__lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  &__lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
}

.highlight {
  color: $color-graphite;
}

.modal-overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: $color-black;
  opacity: 15%;
  z-index: 9998;

  @media (max-width: 960px) {
    display: none;
  }
}

@keyframes search-results__lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
