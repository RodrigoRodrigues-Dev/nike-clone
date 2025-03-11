<template>
  <div class="releases-banner">
    <div class="container">
      <div class="releases-banner__content">
        <h4 class="releases-banner__sub-title">Just It</h4>
        <h2 class="releases-banner__title">Releases</h2>
        <p class="releases-banner__description">
          Explore the latest Nike collection, where style meets performance.
          Each release features innovative designs that provide comfort and
          support, ready for any adventure, in any weather.
        </p>
        <RouterLink to="/Releases">
          <button class="releases-banner__btn">Releases</button>
        </RouterLink>
      </div>
    </div>
    <div class="releases-banner__image">
      <picture>
        <source
          media="(max-width: 930px)"
          srcset="
            https://www.nike.qa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Library-Sites-NikeSharedLibrary/default/dw01498204/2024/10/Women/WLP%20P1_img_MB-min.jpg?q=80
          "
        />
        <img
          src="https://www.nike.qa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Library-Sites-NikeSharedLibrary/default/dw2a0e2b47/2024/10/Women/WLP%20P1_img_DT-min.jpg?q=80"
          alt="Nike release image"
        />
      </picture>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:color';

.releases-banner {
  margin: 86px 0;
  text-align: center;

  @media (max-width: 1100px) {
    text-align: start;
  }

  &__content {
    margin: 0 auto;
    width: 65%;

    @media (max-width: 1100px) {
      width: 100%;
    }
  }

  &__sub-title {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  &__title {
    @include title(5rem);
    letter-spacing: 0.3rem;
    margin: 0.5rem 0;

    @media (max-width: 930px) {
      font-size: 4rem;
      letter-spacing: 0;
    }

    @media (max-width: 630px) {
      font-size: 3.5rem;
    }
  }

  &__description {
    font-size: 1.3rem;
    line-height: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 930px) {
      font-size: 1rem;
    }
  }

  &__btn {
    width: 20%;
    background-color: $color-black;
    color: $color-white;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 2rem;
    padding: 1rem;

    @media (max-width: 930px) {
      width: 130px;
      padding: 0.5rem;
    }

    &:hover {
      cursor: pointer;
      background-color: color.adjust($color-dark-gray, $lightness: 0.5%);
    }
  }

  &__image {
    margin-top: 85px;

    img {
      width: 100%;
    }
  }
}
</style>
