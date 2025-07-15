<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <LayoutTopNavigation />
    <LayoutHeader />
    <CommonCategoryCarousel />
    <CommonDiscountBanner />
    <main>
      <slot />
    </main>
    <LayoutFooter />
    <UiSearchResults />
  </div>
</template>
