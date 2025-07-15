<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <LayoutTopNavigation />
    <LayoutHeader />
    <CommonOfferCarousel />
    <main>
      <slot />
    </main>
    <LayoutFooter />
    <UiSearchResults />
  </div>
</template>
