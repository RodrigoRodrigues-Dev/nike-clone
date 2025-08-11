<template>
  <section class="news-section">
    <div class="container">
      <div class="news-section__content">
        <h2 class="news-section__title">New This Week</h2>
        <p class="news-section__description">Featuring the Nike C1TY & more.</p>
      </div>
    </div>
    <div class="news-section__image">
      <NuxtImg
        provider="cloudinary"
        format="webp"
        src="v1755008443/Nike%20Clone/Home/sitio-web-oficial-de-nike_o5exk0.avif"
        alt="Banner Image"
        class="banner-image"
      />
    </div>
  </section>
</template>

<style lang="scss">
.news-section {
  &__content {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__title {
    @include title(3rem);
    margin-bottom: 0.5rem;

    @media (max-width: 880px) {
      font-size: 2.5rem;
    }
  }

  &__description {
    font-size: 1rem;
    color: $color-gray;
  }

  &__image {
    .banner-image {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
}
</style>
