<template>
  <div class="product-highlight">
    <div
      class="product-highlight__content"
      v-for="(item, index) in productStore.highlightItems"
      :key="index"
    >
      <h2 class="product-highlight__title">{{ item.title }}</h2>
      <p class="product-highlight__text">{{ item.text }}</p>
      <img class="product-highlight__image" :src="item.image" alt="" />
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

  &__title {
    margin-top: 5rem;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    font-weight: 100;

    @media (max-width: 960px) {
      margin: 3rem 0;
      font-size: 1.5rem;
    }
  }

  &__text {
    margin: 0 auto;
    margin-bottom: 5rem;
    width: 60%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 100;

    @media (max-width: 960px) {
      margin: 0 auto;
      margin-bottom: 3rem;
      font-size: 1rem;
      width: 90%;
    }
  }

  &__content {
    text-align: center;
  }
}
</style>
