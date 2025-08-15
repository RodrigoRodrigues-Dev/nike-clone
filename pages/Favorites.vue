<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="favorites">
    <div class="favorites__container" v-if="favoriteStore.items.length">
      <h1 class="favorites__title">Favorites</h1>
      <div class="favorites__items">
        <div
          class="favorites__item"
          v-for="item in favoriteStore.items"
          :key="item.id"
        >
          <div class="favorites__item-image-container">
            <div
              class="favorites__item-icon-container"
              @click="removeFavorite(item)"
            >
              <icon class="favorites__item-icon" name="ic:round-favorite" />
            </div>
            <NuxtImg
              provider="cloudinary"
              format="webp"
              :src="item.mainImage"
              alt="Favorite item image"
              class="favorites__item-image"
            />
          </div>
          <div class="favorites__item-info">
            <div>
              <p class="favorites__item-name">{{ item.name }}</p>
              <p class="favorites__item-subtitle">{{ item.subTitle }}</p>
            </div>
            <p class="favorites__item-price">${{ item.price }}.00</p>
          </div>
          <button class="favorites__item-button" @click="selectSize(item)">
            Select Size
          </button>
        </div>
      </div>
    </div>

    <div class="no-results__favorite" v-else>
      <p class="no-results__favorite-title">No favorites found.</p>
      <p class="no-results__favorite-description">
        Your favorites list is currently empty. Start adding items to see them
        here!
      </p>
      <RouterLink to="/Releases">
        <button class="no-results__favorite-btn">Continue Shopping</button>
      </RouterLink>
    </div>
  </div>
  <CommonFavoritesModal />
  <CommonPopupItem />
</template>

<script setup>
// eslint-disable-next-line no-undef
definePageMeta({
  layout: 'custom'
});

import { useFavoriteStore } from '~/stores/favoriteStore';

const favoriteStore = useFavoriteStore();

const removeFavorite = (item) => {
  const index = favoriteStore.items.indexOf(item);

  favoriteStore.items.splice(index, 1);
};

const selectSize = (item) => {
  favoriteStore.selectSizeItem = item;
  favoriteStore.isModalOpen = true;
};
</script>

<style lang="scss">
.favorites {
  &__container {
    width: 90%;
    margin: 0 auto;
  }

  &__title {
    font-weight: 300;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__item {
    padding: 1rem;
    width: calc(33.333% - 1rem);
    box-sizing: border-box;

    @media (max-width: 768px) {
      width: calc(50% - 1rem);
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  }

  &__item {
    &-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }

    &-name {
      font-weight: 400;
      font-size: 1rem;
    }

    &-subtitle {
      margin-top: 0.3rem;
      color: $color-gray;
    }

    &-image-container {
      position: relative;
    }

    &-icon-container {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background-color: $color-white;
      padding: 1rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: $color-soft-gray;
        cursor: pointer;
      }
    }

    &-icon {
      font-size: 1.5rem;
    }

    &-image {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }

    &-button {
      padding: 0.6rem 1.5rem;
      border-radius: 2rem;
      background-color: transparent;
      border: 1px solid $color-pale-gray;
      font-size: 1rem;

      &:hover {
        cursor: pointer;
        border: 1px solid $color-onyx-gray;
      }
    }
  }
}

.no-results__favorite {
  margin: 3rem auto;
  width: 60%;

  &-title {
    font-size: 1.5rem;
    font-weight: 300;
  }

  &-description {
    font-size: 1rem;
    color: $color-medium-gray;
    margin: 1rem 0;
  }

  &-btn {
    padding: 1rem 2rem;
    border: 1px solid $color-black;
    border-radius: 2rem;
    background-color: $color-black;
    color: $color-white;
    font-size: 1rem;
    font-weight: 600;

    &:hover {
      cursor: pointer;
      background-color: $color-jet-black;
    }
  }
}
</style>
