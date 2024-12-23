<template>
    <header class="header">
        <div class="header__container">
            <RouterLink to="/">
                <img class="header__logo" src="https://nike-vibe-shop-images.vercel.app/nike-logo.png" alt="Logo da Nike">
            </RouterLink>
            <h3 class="header__title">just do it</h3>
            <div class="header__menu">
                <div class="header__search" @click="searchResults.toggleSearchResults">
                    <div class="header__search-icon-container">
                        <button class="header__search-button">
                            <icon class="header__search-icon" name="clarity:search-line" />
                        </button>
                    </div>
                    <input 
                        type="search" 
                        value="" 
                        class="header__search-input" 
                        placeholder="Search" 
                        autocomplete="off" 
                        aria-label="Search Products" 
                        inputmode="search">
                </div>
                <RouterLink to="/Favorites">
                    <div class="header__menu-icon-container">
                        <icon class="header__menu-icon" name="ic:sharp-favorite-border" />
                    </div>
                </RouterLink>
                <RouterLink to="/Cart">
                    <div class="header__menu-icon-container">
                        <icon class="header__menu-icon" name="solar:bag-3-broken" />
                        <p>{{ cartStore.items.length }}</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';
import { useSearchResults } from '~/stores/searchResults';

const cartStore = useCartStore();
const searchResults = useSearchResults();
</script>

<style lang="scss">
.header {
    position: sticky;
    top: 0;
    left: 0;
    background-color: $color-white;
    padding: 1.5rem 0;
    z-index: 9999;
    box-shadow: 0px 0.375rem 0.5rem rgba($color-black, 0.1);

    &__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8%;
        position: relative;
    }

    &__logo {
        width: 4.5rem;
    }

    &__title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.375rem;
    }

    &__menu {
        display: flex;
        align-items: center;
        gap: 0.3rem;

        &-icon {
            font-size: 1.3rem;
            width: 30px;
            height: 23.8px;
        }
        
        &-icon-container {
            display: flex;
            align-items: center;
            padding: 0.3rem;
            border-radius: 5rem;

            &:hover {
                background-color: $color-light-gray;
            }
        }
    }

    &__search {
        width: 168px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $color-light-background;
        border-radius: 10rem;

        &:hover {
            background-color: $color-soft-gray;
        }

        &-input,
        &-button {
            border: none;
            background-color: transparent;
            height: 100%;

            &:focus {
                outline: none;
            }
        }

        &-button {
            width: 30px;

            &:hover {
                cursor: pointer;
            }
        }

        &-input {
            width: 80%;
            height: 100%;
            font-size: 1rem;
            margin-left: 0.3rem;
        }

        &-icon-container {
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

        &-icon {
            font-size: 1.3rem;
        }

        @media (max-width: 1200px) {
            width: auto;
            background-color: transparent;

            &-input {
                display: none;
            }

            &-icon-container {
                background-color: transparent;
            }
        }
    }
}

@media (max-width: 630px) {
    .header {
        padding: 1rem;

        &__menu-item {
            font-size: 1.2rem;
        }

        &__container {
            padding: 0 2%;
        }

        &__logo {
            width: 3rem;
        }

        &__title {
            display: none;
        }
    }
}
</style>