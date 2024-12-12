<template>
    <div class="products-header">
        <div class="products-header__container">
            <h2 class="products-header__title">Products ({{ filteredLength }})</h2>
            <nav class="products-header__navigation">
                <button class="products-header__toggle-button">
                    <span class="products-header__toggle-label" @click="toggleFilter">
                        <span class="products-header__toggle-label__bold">{{ showFilters ? 'Hide' : 'Show' }}</span> Filters
                    </span>
                    <icon name="ic:baseline-tune" />
                </button>
                <div class="products-header__dropdown">
                    <div class="products-header__dropdown-trigger" @click="toggleBoxFilters">
                        <span class="products-header__dropdown-label">
                            Sort By:
                            <span class="products-header__dropdown-label__sortBy-value">
                                {{ sortByValue }}
                            </span>
                        </span>
                        <icon name="ic:baseline-keyboard-arrow-down" />
                    </div>
                    <div class="products-header__dropdown-menu">
                        <ul class="products-header__list">
                            <li class="products-header__list-item"
                                :class="{ 'products-header__list-item--active': sortByValue === 'Price: Low-High' }"
                                @click="sortByPriceLowHigh('Price: Low-High'); toggleBoxFilters()">Price: Low-High</li>
                            <li class="products-header__list-item"
                                :class="{ 'products-header__list-item--active': sortByValue === 'Price: High-Low' }"
                                @click="sortByPriceHighLow('Price: High-Low'); toggleBoxFilters()">Price: High-Low</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div class="products-header__categories" v-if="categories.length">
        <span class="products-header__category-value" v-for="category in categories" @click="removeCategory(category)">
            <p>{{ category }}</p>
            <icon name="ic:baseline-cancel" />
        </span>
    </div>
</template>

<script setup>
import { useFiltersStore } from '@/stores/filtersStore';

const filtersStore = useFiltersStore();

const { toggleFilter, showFilters } = useFilters();

const sortByValue = ref();
const sortByPrice = ref();
const categories = computed(() => filtersStore.selectedFilters.categoryFilters);

const toggleBoxFilters = () => {
    const dropdownMenu = document.querySelector('.products-header__dropdown-menu');

    if (dropdownMenu) {
        dropdownMenu.classList.toggle('products-header__dropdown-menu--active');
    }
};

const removeCategory = (category) => {
    filtersStore.selectedFilters.categoryFilters =
        filtersStore.selectedFilters.categoryFilters.filter(item => item !== category);
};

const sortByPriceLowHigh = (label) => {
    filtersStore.filteredProducts.sort((a, b) => a.priceUSD - b.priceUSD);
    sortByValue.value = label;
};

const sortByPriceHighLow = (label) => {
    filtersStore.filteredProducts.sort((a, b) => b.priceUSD - a.priceUSD);
    sortByValue.value = label;
};

const filteredLength = computed(() => filtersStore.filteredProducts.length);
</script>

<style lang="scss">
.products-header {
    z-index: 999;
    position: sticky;
    top: 4.8rem;
    width: 100%;
    padding: 1.3rem 0;
    border-top: 1px solid $color-light-gray-2;
    background-color: $color-white;

    @media (max-width: 960px) {
        top: 3rem;
    }

    &__container {
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-self: center;
        width: 95%;

        @media (max-width: 580px) {
            gap: 2rem;
            flex-direction: column;
        }
    }

    &__navigation {
        display: flex;
        align-items: center;

        @media (max-width: 580px) {
            justify-content: space-between;
            width: 100%;
        }
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 300;

        @media (max-width: 960px) {
            font-size: 1rem;
        }
    }

    &__categories {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }

    &__category-value {
        margin: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        color: $color-white;
        background-color: $color-black;

        cursor: pointer;

        p {
            margin-right: 0.5rem;
        }
    }

    &__toggle-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        color: inherit;
        border: none;
        background: transparent;

        &:hover {
            cursor: pointer;
        }
    }

    &__toggle-label,
    &__dropdown-label {
        font-size: 1.1rem;
        font-weight: 300;

        @media (max-width: 960px) {
            font-size: 0.8rem;
        }

        &__bold {
            font-weight: bold;
        }

        &__sortBy-value {
            margin-left: 0.3rem;
            color: $color-stone-gray;
        }
    }

    &__dropdown {
        position: relative;
        margin-left: 3rem;

        &-trigger {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.2rem;

            &:hover {
                cursor: pointer;
            }
        }

        &-menu {
            position: absolute;
            top: 100%;
            right: 0;
            display: none;
            text-align: end;
            padding: 0.5rem;
            border-radius: 0 0 0 1rem;
            background-color: $color-white;

            &--active {
                display: block;
            }
        }
    }

    &__list {
        margin: 0;
        list-style: none;
        padding: 0.5rem 0;
        min-width: 150px;

        @media (max-width: 960px) {
            min-width: 100px;
        }
    }

    &__list-item {
        padding: 0.5rem 0;
        cursor: pointer;

        &--active {
            color: $color-slate-gray;
        }

        &:hover {
            color: $color-gray;
        }
    }
}
</style>