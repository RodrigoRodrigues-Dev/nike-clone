<template>
  <div v-if="!visibleProducts.length" class="no-results">
    <p>No products found.</p>
  </div>
  <div v-else class="products-grid">
    <UiProductsCard 
      v-for="item in visibleProducts" 
      :key="item.productId" 
      :mainImage="item.images.main"
      :title="item.productName" 
      :message="item.labels.ecoFriendly" 
      :subtitle="item.productDescription"
      :additional-images="item.images.thumbnailImages" 
      :colorOptions="`colors ${item.details.availableColors.length}`"
      :price="`$${item.priceUSD}`" 
      :promotion="item.discountLabel" 
      :promo="item.promoLabel"
      @click="goToProduct(item)" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFiltersStore } from '../../stores/filtersStore';
import { useProductNavigation } from '~/composables/useProductNavigation';

const filtersStore = useFiltersStore();
const { goToProduct } = useProductNavigation();

const visibleProducts = computed(() => filtersStore.filteredProducts);
</script>

<style lang="scss">
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3.5rem;
  column-gap: 1.5rem;

  margin: 0 2rem;
  flex: 1;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2rem;
    column-gap: 0.5rem;

    margin: 0 1rem;
  }
}

.no-results {
  margin: 2rem;
  text-align: center;
  font-size: 1.5rem;
}
</style>
