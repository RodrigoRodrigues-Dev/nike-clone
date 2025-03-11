<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <TopNavigation />
    <Header />
    <OfferCarousel />
    <main>
      <slot />
    </main>
    <Footer />
    <SearchResults />
  </div>
</template>
