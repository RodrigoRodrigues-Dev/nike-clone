<template>
    <client-only>
        <div class="product-view">
            <div class="product-view__gallery">
                <div class="product-view__gallery__content">
                    <div v-for="image in productStore.selectedGallery[indexImage]" :key="image">
                        <img class="product-view__gallery__image"
                            :class="{ 'product-view__gallery__image--active': mainImage === image }"
                            @mouseover="changeMainImageGallery(image)" :src="image" alt="Gallery image" />
                    </div>
                </div>
            </div>

            <div class="product-view__main-image">
                <img :src="mainImage" alt="Main image" />
            </div>

            <div class="product-view__info">
                <span v-if="productStore.ecoFriendlyLabel" class="product-view__ecoFriendlyLabel">
                    {{ productStore.ecoFriendlyLabel }}
                </span>
                <h2 class="product-view__name">{{ productStore.name }}</h2>
                <span class="product-view__subtitle">{{ productStore.subTitle }}</span>
                <span class="product-view__price">{{ `$${productStore.price}` }}</span>
                <span class="product-view__promotion">{{ productStore.discountLabel }}</span>

                <div class="product-view__thumbnails">
                    <img v-for="(image, index) in productStore.additionalImages" :key="index" :src="image" :alt="image"
                        class="product-view__thumbnail"
                        :class="{ 'product-view__thumbnail--active': activeThumbnail === image }"
                        @click="changeMainImage(image, index)" />
                </div>

                <div class="product-view__size-guide" v-if="productStore.sizes">
                    <span>Select Size</span>
                    <div class="product-view__size-guide__link">
                        <icon name="fa6-solid:text-width" class="product-view__size-guide__icon" />
                        Size Guide
                    </div>
                </div>

                <div class="product-view__sizes">
                    <div v-if="productStore.sizes" v-for="(size, index) in productStore.sizes" :key="index"
                        class="product-view__size" :class="{ 'product-view__size--active': activeSize === size }"
                        @click="changeSize(size)">
                        <span>{{ size }}</span>
                    </div>
                    <span v-else class="product-view__size--no-size">ONE SIZE</span>
                </div>

                <div class="product-view__btns">
                    <button class="product-view__btn product-view__btn--add-cart" @click="addToCart">
                        Add to Bag
                    </button>
                    <button class="product-view__btn product-view__btn--add-fav">
                        Favorite
                        <icon class="fav-icon" name="line-md:heart" size="23px"
                            style="margin-left: 0.3rem; margin-bottom: 0.1rem;" />
                    </button>
                </div>

                <div class="product-view__shipping">
                    <h2 class="product-view__shipping__title">Shipping</h2>
                    <span>You'll see our shipping options at checkout</span>
                </div>

                <div class="product-view__description">
                    <span class="product-view__description__label">
                        {{ productStore.description }}
                    </span>
                    <ul class="product-view__description__list">
                        <li class="product-view__description__colors">
                            <div class="circle"></div>
                            Shown: {{ productStore.colorDescription }}
                        </li>
                        <li class="product-view__description__style">
                            <div class="circle"></div>
                            Style: {{ productStore.styleCode }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <ProductHighlight />
    </client-only>
</template>

<script setup>
definePageMeta({
    layout: 'custom',
});

import { useProductStore } from '@/stores/productStore';
import ProductHighlight from '~/components/ProductHighlight.vue';

const productStore = useProductStore();
const mainImage = ref(productStore.mainImage?.[0] || null);
const activeThumbnail = ref(productStore.mainImage?.[0] || null);
const activeSize = ref(null);
const indexImage = ref(0);

const changeMainImage = (image, index) => {
    mainImage.value = image;
    activeThumbnail.value = image;
    indexImage.value = index;
};

const changeMainImageGallery = (image) => {
    mainImage.value = image;
};

const changeSize = (size) => {
    activeSize.value = size;
};
</script>

<style lang="scss">
@use 'sass:color';

.product-view {
    margin: 3rem auto;
    max-width: 1100px;
    margin-bottom: 10rem;
    display: grid;
    grid-template-columns: 1fr 3fr 3fr;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 1260px) {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 100%;
        max-width: 600px;
        margin-bottom: 5rem;

        @media (max-width: 680px) {
            max-width: 360px;
            margin-bottom: 2rem;
        }
    }

    &__gallery {
        text-align: end;

        &__content {
            position: sticky;
            top: 110px;
            height: auto;
            padding-bottom: 100%;

            @media (max-width: 1260px) {
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                padding-bottom: 0;
                justify-content: space-between;
            }
        }

        &__image {
            width: 60px;
            height: 60px;
            border-radius: 0.3rem;
            margin-bottom: 0.5rem;
            background-color: $color-light-background;

            @media (max-width: 680px) {
                width: 50px;
            }

            &--active {
                background-color: $color-soft-gray;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }

    &__main-image {
        padding-bottom: 55px;

        img {
            position: sticky;
            top: 110px;
            width: 535px;
            height: 668px;

            @media (max-width: 680px) {
                margin-top: 1rem;
                width: 100%;
                height: auto;
            }
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__name {
        font-size: 2rem;
    }

    &__ecoFriendlyLabel {
        color: $color-copper;
    }

    &__subtitle {
        color: $color-slate-gray;
    }

    &__price {
        font-weight: bold;

        @media (max-width: 1260px) {
            font-size: 1.75rem;
        }
    }

    &__promotion {
        color: $color-emerald-green;
    }

    &__thumbnails {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        @media (max-width: 1260px) {
            margin: 0 auto;
            flex-wrap: wrap;
        }
    }

    &__thumbnail {
        width: 70px;
        border-radius: 0.5rem;
        cursor: pointer;

        @media (max-width: 680px) {
            width: 60px;
        }

        &:hover,
        &--active {
            border: 1px solid $color-black;
        }
    }

    &__size-guide {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;

        &__link {
            display: flex;
            align-items: center
        }

        &__icon {
            margin-right: 0.5rem;
        }
    }

    &__sizes {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }

    &__size {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 46px;
        border: 1px solid $color-silver-gray;
        border-radius: 5px;

        &:hover,
        &--active {
            border: 1px solid $color-black;
        }

        &--no-size {
            margin: 2rem 0;
        }
    }

    &__btns {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem 0;
    }

    &__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        width: 100%;
        padding: 1.2rem;
        border-radius: 2rem;
        font-size: 1rem;
        font-weight: 700;

        &:hover {
            cursor: pointer;
        }

        &--add-cart {
            background-color: $color-black;
            color: $color-white;

            &:hover {
                background-color: color.adjust($color-dark-gray, $lightness: 0.3%);
            }
        }

        &--add-fav {
            background-color: transparent;
            color: $color-graphite;
            border: 1px solid $color-pale-gray;

            &:hover {
                border-color: $color-onyx-gray;
            }
        }
    }

    &__shipping {
        &__title {
            font-size: 1rem;
            font-weight: 300;
            margin-bottom: 0.3rem;
        }
    }

    &__description {
        &__label {
            display: block;
            padding: 2rem 0;
        }

        &__colors,
        &__style {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
    }
}

.circle {
    height: 6px;
    width: 6px;
    background-color: $color-jet-black;
    border-radius: 100%;
    margin-right: 0.8rem;
}
</style>