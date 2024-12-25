<template>
    <template v-if="favoriteStore.isModalOpen">
        <div class="favorites-modal">
            <icon class="favorites-modal__close" size="25px" name="material-symbols:cancel-rounded"
                @click="favoriteStore.isModalOpen = false" />
            <div class="favorites-modal__mobile-container">
                <img class="favorites-modal__image" :src="favoriteStore.selectSizeItem.mainImage"
                    alt="Favorite item image">
                <div class="favorites-modal__info-text-mobile">
                    <p class="favorites-modal__info-mobile-subtitle">{{ favoriteStore.selectSizeItem.subTitle }}</p>
                    <p class="favorites-modal__info-mobile-title">{{ favoriteStore.selectSizeItem.name }}</p>
                    <p class="favorites-modal__info-mobile-price">${{ favoriteStore.selectSizeItem.price }}.00</p>
                </div>
            </div>
            <div class="favorites-modal__info">
                <div class="favorites-modal__info-text">
                    <p class="favorites-modal__info-subtitle">{{ favoriteStore.selectSizeItem.subTitle }}</p>
                    <p class="favorites-modal__info-title">{{ favoriteStore.selectSizeItem.name }}</p>
                    <p class="favorites-modal__info-price">${{ favoriteStore.selectSizeItem.price }}.00</p>
                </div>
                <div class="favorites-modal__sizes">
                    <p class="favorites-modal__sizes-label"
                        :class="{ 'favorites-modal__sizes-label--active': productAdd }">
                        This product (same size) is already in your bag.
                    </p>
                    <p class="favorites-modal__sizes-title"
                        :class="{ 'favorites-modal__sizes-title--no-select': sizeSelect }">Select Size</p>
                    <div class="favorites-modal__sizes-buttons"
                        :class="{ 'favorites-modal__sizes-buttons--no-select': sizeSelect }">
                        <button class="favorites-modal__size-button"
                            :class="{ 'favorites-modal__size-button--active': activeSize === size }"
                            v-for="size in favoriteStore.selectSizeItem.sizes" :key="size" @click="changeSize(size)">
                            {{ size }}
                        </button>
                    </div>
                    <button @click="addToCartWithImage" class="favorites-modal__add-button">
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-overlay--favorites" @click="favoriteStore.isModalOpen = false" style="z-index: 99999;"></div>
    </template>
</template>

<script setup>
import { useFavoriteStore } from '~/stores/favoriteStore';
import { useCart } from '~/composables/useCart';

const favoriteStore = useFavoriteStore();
const { sizeSelect, activeSize, indexImage, productAdd, addToCart } = useCart();

const changeSize = (size) => {
    activeSize.value = size;
};

const addToCartWithImage = () => {
    const productData = {
        index: favoriteStore.selectSizeItem.index,
        name: favoriteStore.selectSizeItem.name,
        mainImage: favoriteStore.selectSizeItem.mainImage,
        price: favoriteStore.selectSizeItem.price,
        subTitle: favoriteStore.selectSizeItem.subTitle,
        colors: favoriteStore.selectSizeItem.colorDescription,
        size: activeSize.value,
        productAmount: 1
    };

    addToCart(productData);
};
</script>

<style lang="scss">
.favorites-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 880px;
    background-color: $color-white;
    z-index: 999999;
    border-radius: 2rem;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;

    &__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        cursor: pointer;
    }

    &__mobile-container {
        display: flex;
    }

    @media (max-width: 960px) {
        position: fixed;
        flex-direction: column;
        transform: translateX(-50%);
        left: 50%;
        top: auto;
        bottom: 0;
        width: 95%;
        border-radius: 2rem 2rem 0 0;
    }

    &__image {
        width: 432px;
        object-fit: cover;
        height: 432px;
        border-radius: 1rem;

        @media (max-width: 960px) {
            object-fit: contain;
            width: 146px;
            height: auto;
        }
    }

    &__info {
        width: calc(100% - 432px);
        text-align: start;
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (max-width: 960px) {
            width: 100%;
            margin-left: 0;
        }

        &-mobile {
            &-subtitle {
                color: $color-gray;
            }

            &-title {
                font-size: 1.3rem;
                margin: 0.5rem 0;
                font-weight: 900;
            }
        }

        &-text {
            margin-bottom: 1rem;

            &-mobile {
                display: none;

                &-title {
                    font-size: 2rem;
                }

                @media (max-width: 960px) {
                    display: block;
                    margin-left: 0.5rem;
                }
            }

            @media (max-width: 960px) {
                display: none;
            }
        }

        &-subtitle {
            font-size: 1rem;
            color: $color-gray;
            margin-bottom: 0.5rem;
        }

        &-title {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        &-price {
            font-size: 1rem;
            font-weight: 500;
        }
    }

    &__size-button {
        background-color: transparent;
        font-size: 1.125rem;
        border: 1px solid $color-pale-gray;
        padding: 0.5rem 0;
        border-radius: 0.5rem;

        &--active {
            border: 1px solid $color-onyx-gray;
        }

        &:hover {
            cursor: pointer;
        }

        @media (max-width: 960px) {
            padding: 0.5rem 1rem;
        }
    }

    &__sizes {
        @media (max-width: 960px) {
            margin-top: 2rem;
        }

        &-title {
            font-size: 1rem;
            font-weight: 500;
            margin-bottom: 0.5rem;

            &--no-select {
                color: $color-red;
            }
        }

        &-label {
            display: none;

            &--active {
                display: block;
                color: $color-red;
                margin-bottom: 0.5rem;
            }
        }

        &-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
            height: 190px;
            overflow-y: scroll;

            padding: 1rem;
            border-radius: 0.5rem;

            &--no-select {
                border: 3px solid $color-red;
            }

            @media (max-width: 960px) {
                display: flex;
                overflow-x: scroll;
                scrollbar-width: none;
                flex-wrap: nowrap;
                height: auto;
                gap: 1rem;
            }
        }

        &-button {
            padding: 0.5rem 1rem;
            border: 1px solid $color-gray;
            border-radius: 0.5rem;
            background-color: transparent;
            cursor: pointer;

            &:hover {
                background-color: $color-light-gray;
            }
        }
    }

    &__add-button {
        width: 100%;
        padding: 1.25rem 1.5rem;
        border: none;
        border-radius: 2rem;
        background-color: $color-black;
        color: $color-white;
        font-size: 1rem;
        cursor: pointer;

        &:hover {
            background-color: $color-dark-gray;
        }
    }
}

.modal-overlay--favorites {
    position: fixed;
    background-color: $color-black;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.15;
    z-index: 99998;
}
</style>