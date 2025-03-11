<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <TopNavigation />
    <Header />
    <CategoryCarousel />
    <DiscountBanner />
    <main>
      <slot />
    </main>
    <Footer />
    <SearchResults />
  </div>
</template>
