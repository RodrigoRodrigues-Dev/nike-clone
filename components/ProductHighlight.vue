<template>
    <div class="product-highlight">
        <div 
            class="product-highlight__content" 
            v-for="(item, index) in productStore.highlightItems" 
            :key="index"
        >
            <h2 class="product-highlight__text">{{ item.text }}</h2>
            <img class="product-highlight__image" :src="item.image" alt="">
        </div>
    </div>
</template>

<script setup>
    import { useProductStore } from '~/stores/productStore';

    const productStore = useProductStore();
</script>

<style lang="scss">
    .product-highlight {
        margin: 0 auto;
        width: 90%;

        &__image {
            width: 100%;
        }

        &__text {
            margin: 5rem auto;
            text-align: center;
            font-size: 1.35rem;
            font-weight: 100;

            @media (max-width: 960px) {
                margin: 3rem 0;
                font-size: 1rem;
            }
        }
    }
</style>