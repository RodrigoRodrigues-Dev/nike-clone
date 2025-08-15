<template>
  <section class="classics">
    <h2 class="classics__title">Shop By Classics</h2>
    <div class="classics__slide-content">
      <!-- Slider para desktop (acima de 960px) -->
      <div
        class="classics__slide classics__slide--desktop"
        :style="{
          transform: `translateX(${currentIndex}px)`,
          transition: transitionEnabled ? 'transform 0.5s ease' : 'none'
        }"
        @transitionend="handleTransitionEnd"
      >
        <div
          class="classics__shoe"
          v-for="(shoe, index) in loopedShoes"
          :key="index"
        >
          <NuxtImg
            provider="cloudinary"
            format="webp"
            :src="shoe.img"
            width="225"
            height="300"
            class="classics__image"
            alt="Shoe Image"
          />
        </div>
      </div>

      <!-- Slider para dispositivos móveis (abaixo de 960px) -->
      <div class="classics__slide classics__slide--mobile">
        <div class="classics__shoe" v-for="(shoe, index) in shoes" :key="index">
          <NuxtImg
            provider="cloudinary"
            format="webp"
            :src="shoe.img"
            alt="Shoe Image"
            width="343"
            height="457"
            class="classics__image"
          />
        </div>
      </div>

      <!-- Controles do slide -->
      <div class="classics__controls">
        <div @click="prevSlide" class="classics__btn classics__btn--left">
          <icon name="ic:baseline-arrow-back-ios-new"></icon>
        </div>
        <div @click="nextSlide" class="classics__btn classics__btn--right">
          <icon name="ic:baseline-arrow-forward-ios"></icon>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const shoes = [
  {
    img: 'v1755016741/Nike%20Clone/Home/Classics%20Slider/shoe-cortez_ziodxk.webp'
  },
  {
    img: 'v1755016800/Nike%20Clone/Home/Classics%20Slider/shoe-air-max_rjmhvu.webp'
  },
  {
    img: 'v1755016832/Nike%20Clone/Home/Classics%20Slider/shoe-blazer_ahlj15.webp'
  },
  {
    img: 'v1755016868/Nike%20Clone/Home/Classics%20Slider/shoe-air-jordan-1_siqiky.webp'
  },
  {
    img: 'v1755016912/Nike%20Clone/Home/Classics%20Slider/shoe-dunk_d9pouv.webp'
  },
  {
    img: 'v1755016941/Nike%20Clone/Home/Classics%20Slider/shoe-air-force-1_zb5gax.webp'
  },
  {
    img: 'v1755016970/Nike%20Clone/Home/Classics%20Slider/shoe-vomero_vzbj62.webp'
  }
];

const currentIndex = ref(-851);
const itemWidth = 241;
const transitionEnabled = ref(true);
const isNavigating = ref(false);

const loopedShoes = computed(() => {
  return [...shoes, ...shoes, ...shoes];
});

onMounted(() => {
  currentIndex.value = -851;
});

const nextSlide = () => {
  if (!isNavigating.value) {
    currentIndex.value -= itemWidth;
    isNavigating.value = true;
  }
};

const prevSlide = () => {
  if (!isNavigating.value) {
    currentIndex.value += itemWidth;
    isNavigating.value = true;
  }
};

const handleTransitionEnd = () => {
  transitionEnabled.value = false;

  if (currentIndex.value <= -2538) {
    currentIndex.value = -851;
  }
  if (currentIndex.value >= -128) {
    currentIndex.value = -1815;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      transitionEnabled.value = true;
      isNavigating.value = false;
    });
  });
};
</script>

<style lang="scss">
.classics {
  overflow: hidden;
  margin: 6rem 0;

  ::-webkit-scrollbar {
    display: none;
  }

  &__title {
    @include title(3rem);
    margin-left: 3rem;
    margin-bottom: 2rem;
    font-weight: bold;

    @media (max-width: 780px) {
      margin-left: 1rem;
      font-size: 2.3rem;
    }
  }

  &__slide {
    display: flex;
    transition: transform 0.5s ease;

    &--desktop {
      @media (max-width: 960px) {
        display: none;
      }
    }

    &--mobile {
      overflow-x: scroll;

      @media (min-width: 960px) {
        display: none;
      }
    }

    &-content {
      position: relative;
    }
  }

  &__shoe {
    min-width: 225px;
    margin-left: 1rem;
    transition: transform 0.5s ease;

    @media (max-width: 960px) {
      min-width: 343px;
    }
  }

  &__image {
    height: auto;
    width: 225px;

    @media (max-width: 960px) {
      width: 343px;
    }
  }

  &__controls {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;

    @media (max-width: 960px) {
      display: none;
    }
  }

  &__btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-white;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    box-shadow: 0px 4px 10px rgba($color-black, 0.2);

    &--left {
      margin-left: 6rem;
    }

    &--right {
      margin-right: 4rem;
    }
  }
}
</style>
