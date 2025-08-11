<template>
  <section class="container">
    <div class="appDownload">
      <picture>
        <source
          media="(max-width: 1024px)"
          srcset="
            https://nike-vibe-shop-images.vercel.app/banners/App/app%20download%20tout%20mob.png
          "
          alt="Download do App for Mobile"
        />
        <img
          src="https://nike-vibe-shop-images.vercel.app/banners/App/app%20download%20tout%20desk.png"
          alt="Download do App"
        />
      </picture>
    </div>
  </section>
</template>

<style lang="scss">
.appDownload {
  margin: 50px 0;
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
