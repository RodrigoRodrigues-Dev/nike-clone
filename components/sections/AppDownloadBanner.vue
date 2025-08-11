<template>
  <section class="container">
    <div class="appDownload">
      <!-- Image Desktop -->
      <NuxtImg
        provider="cloudinary"
        format="webp"
        alt="Download do App Desktop"
        src="v1755006974/Nike Clone/Home/app_download_tout_desk_y7h7pr.png"
        width="935"
        height="156"
        class="banner-desktop"
      />
      <!-- Image Mobile -->
      <NuxtImg
        provider="cloudinary"
        format="webp"
        alt="Download do App Mobile"
        src="v1755007538/Nike Clone/Home/app_download_tout_mob_k7po3p.png"
        class="banner-mobile"
      />
    </div>
  </section>
</template>

<style lang="scss">
.appDownload {
  margin: 50px 0;
  display: flex;
  justify-content: center;
  width: 100%;

  .banner-desktop {
    display: block;
  }
  .banner-mobile {
    display: none;
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .appDownload .banner-desktop {
    display: none;
  }
  .appDownload .banner-mobile {
    display: block;
  }
}
</style>
