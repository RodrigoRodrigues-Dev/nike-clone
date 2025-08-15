<template>
  <div class="product-card">
    <NuxtImg
      provider="cloudinary"
      format="webp"
      :src="mainImage"
      alt="NikeCourt Zoom Vapor Cage 4 Rafa"
      class="product-card__image"
    />

    <div class="product-card__details">
      <span class="product-card__message">{{ message }}</span>
      <h3 class="product-card__title">{{ title }}</h3>
      <span class="product-card__subtitle">{{ subtitle }}</span>
      <span class="product-card__color-options">{{ colorOptions }}</span>

      <div class="product-card__color-images">
        <div
          v-for="(image, index) in visibleImages"
          :key="index"
          @mouseover="changeMainImage(image)"
        >
          <NuxtImg
            provider="cloudinary"
            format="webp"
            :src="image"
            :alt="'Image ' + (index + 1)"
            class="product-card__additional-image"
          />
        </div>

        <div
          v-if="hiddenImageCount > 0"
          class="product-card__hidden-images-indicator"
        >
          +{{ hiddenImageCount }}
        </div>
      </div>

      <span class="product-card__price">{{ price }}</span>
      <span class="product-card__promotion">{{ promotion }}</span>
      <span class="product-card__promo">{{ promo }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  mainImage: String,
  title: String,
  message: String,
  subtitle: String,
  colorOptions: String,
  price: String,
  promotion: String,
  promo: String,
  additionalImages: {
    type: Array,
    default: () => []
  }
});

const mainImage = ref(props.mainImage);

const changeMainImage = (image) => {
  mainImage.value = image;
};

const allImages = computed(() => [props.mainImage, ...props.additionalImages]);

const maxVisibleImages = 3;
const visibleImages = computed(() =>
  allImages.value.slice(0, maxVisibleImages)
);
const hiddenImageCount = computed(
  () => allImages.value.length - maxVisibleImages
);
</script>

<style lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    .product-card__color-options {
      display: none;
    }

    .product-card__color-images {
      display: flex;
      gap: 0.5rem;
    }
  }

  &__subtitle,
  &__title,
  &__color-options,
  &__price,
  &__message,
  &__promo,
  &__promotion {
    font-weight: 300;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__color-images {
    display: none;
    align-items: center;
  }

  &__message {
    color: $color-copper;
  }

  &__color-options,
  &__subtitle {
    color: $color-dust-gray;

    &__images {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $color-medium-gray;
      visibility: hidden;
    }

    &:hover {
      .product-card__additional-image {
        opacity: 0.8;
      }
    }
  }

  &__image {
    max-width: 100%;
    object-fit: contain;
  }

  &__promo,
  &__promotion {
    color: $color-emerald-green;
  }

  &__hidden-images-indicator {
    font-size: 0.875rem;
    color: $color-medium-gray;
  }

  &__additional-image {
    width: 40px;
    transition: opacity 0.3s ease;
  }
}
</style>
