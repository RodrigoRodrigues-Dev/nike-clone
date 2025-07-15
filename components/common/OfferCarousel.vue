<template>
  <div class="offer-carousel">
    <div class="offer-carousel__content">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="offer-carousel__slide"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <h2 class="offer-carousel__title">{{ slide.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAutoSlide } from '@/composables/useAutoSlide';

const slides = ref([
  { title: 'Up to 60% Off: Use Code ACCESS' },
  { title: 'Give a Nike Gift Card this Season' },
  { title: 'Look for Store Pickup at Checkout' },
  { title: "'Shop Today's Featured Styles" }
]);

const { currentIndex } = useAutoSlide(slides);
</script>

<style lang="scss">
.offer-carousel {
  background-color: $color-light-background;
  position: relative;
  padding: 1.3rem 0;

  &__content {
    display: flex;
    width: 50%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;

    @media (max-width: 1380px) {
      width: 90%;
    }
  }

  &__slide {
    min-width: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s ease;

    @media (max-width: 980px) {
      flex-direction: column;
    }
  }

  &__title {
    font-size: 0.75rem;
    font-weight: 300;
    text-decoration: underline;

    @media (max-width: 980px) {
      padding: 0.5rem 0;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
