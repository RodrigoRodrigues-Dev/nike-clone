<template>
  <div class="top-navigation">
    <div class="top-navigation__container">
      <div class="top-navigation__logo">
        <NuxtImg
          src="https://nike-vibe-shop-images.vercel.app/icons/jordan.svg"
          alt="logo Air Jordan"
          format="webp"
        />
        <NuxtImg
          src="https://nike-vibe-shop-images.vercel.app/icons/snkrs.svg"
          alt="logo SNKRS"
          format="webp"
        />
      </div>
      <div class="top-navigation__menu">
        <div class="top-navigation__menu-item">Nike Journal</div>
        <div class="top-navigation__line-vertical"></div>
        <div class="top-navigation__menu-item">Ajuda</div>
        <div class="top-navigation__line-vertical"></div>
        <div class="top-navigation__menu-item">Junte-se a nós</div>
        <div class="top-navigation__line-vertical"></div>
        <div class="top-navigation__menu-item">Entrar</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:color';

.top-navigation {
  z-index: 9999;
  position: relative;
  background-color: $color-light-background;
  padding: 0.7rem 2rem;
  color: $color-primary;
  font-size: 1.2rem;

  &__logo {
    img {
      margin-right: 1.5rem;
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    &-item {
      font-size: 0.76rem;

      &:hover {
        cursor: pointer;
        color: color.adjust($color-primary, $lightness: 25%);
      }
    }
  }

  &__container {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__line-vertical {
    height: 60%;
    width: 1px;
    background-color: $color-black;
  }
}

@media (max-width: 1025px) {
  .top-navigation {
    display: none;
  }
}
</style>
