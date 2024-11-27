<template>
    <div class="products-header">
        <div class="products-header__container">
            <h2 class="products-header__title">Products ({{ filteredLength }})</h2>
            <nav class="products-header__navigation">
                <button class="products-header__toggle-button">
                    <span class="products-header__toggle-label" @click="toggleFilter">
                        {{ showFilters ? 'Hide' : 'Show' }} Filters
                    </span>
                    <icon name="ic:baseline-tune" />
                </button>
                <div class="products-header__dropdown">
                    <div class="products-header__dropdown-trigger" @click="toggleBoxFilters">
                        <span class="products-header__dropdown-label">Sort By</span>
                        <icon name="ic:baseline-keyboard-arrow-down" />
                    </div>
                    <div class="products-header__dropdown-menu">
                        <ul class="products-header__list">
                            <li class="products-header__list-item" @click="sortByPriceLowHigh">Price: Low-High</li>
                            <li class="products-header__list-item" @click="sortByPriceHighLow">Price: High-Low</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { useFiltersStore } from '@/stores/filtersStore';
const filtersStore = useFiltersStore();
const { toggleFilter, showFilters } = useFilters();

const toggleBoxFilters = (event) => {
    const siblingElement = event.target.parentNode.nextElementSibling;
    if (siblingElement) {
        siblingElement.classList.toggle('products-header__dropdown-menu--active');
    }
};

const sortByPriceLowHigh = () => {
    filtersStore.filteredProducts.sort((a, b) => a.priceUSD - b.priceUSD);
};

const sortByPriceHighLow = () => {
    filtersStore.filteredProducts.sort((a, b) => b.priceUSD - a.priceUSD);
};

const filteredLength = computed(() => filtersStore.filteredProducts.length);
</script>

<style lang="scss">
.products-header {
    width: 100%;
    padding: 1.3rem 0;
    position: sticky;
    top: 4.8rem;
    background-color: $color-white;
    border-top: 1px solid $color-light-gray-2;

    @media (max-width: 960px) {
        top: 3rem;
    }

    &__container {
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-self: center;
    }

    &__navigation {
        display: flex;
        align-items: center;
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 300;

        @media (max-width: 960px) {
            font-size: 1rem;
        }
    }

    &__toggle-button {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        color: inherit;

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
            background-color: $color-white;
            padding: 1rem;
            border-radius: 0 0 0 1rem;
            display: none;
            text-align: end;

            &--active {
                display: block;
            }
        }
    }

    &__list {
        list-style: none;
        margin: 0;
        padding: 0.5rem 0;
        min-width: 150px;

        @media (max-width: 960px) {
            min-width: 100px;
        }
    }

    &__list-item {
        padding: 0.5rem 0;
        cursor: pointer;

        &:hover {
            color: $color-gray;
        }
    }
}
</style>