<template>
  <div v-if="!visibleProducts.length">
    <div class="no-results">
      <p>No products found.</p>
    </div>
  </div>
  <div v-else>
    <div class="products-grid">
      <ProductsCard 
        v-for="item in visibleProducts" 
        :key="item.productId" 
        :mainImage="item.images.main"
        :title="item.productName" 
        :message="item.ecoFriendlyLabel" 
        :subtitle="item.productDescription"
        :additional-images="item.images.thumbnailImages" 
        :colorOptions="`colors ${item.details.availableColors.length}`"
        :price="`$${item.priceUSD}`" 
        :promotion="item.discountLabel" 
        :promo="item.promoLabel"
        @click="goToProduct(item)" 
      />
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from './stores/filtersStore';
import { useProductNavigation } from '~/composables/useProductNavigation';

const filtersStore = useFiltersStore();
const { goToProduct } = useProductNavigation();

const visibleProducts = computed(() => filtersStore.filteredProducts);
</script>

<style lang="scss">
.products-grid {
  margin: 0 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3.5rem;
  column-gap: 1.5rem;

  @media (max-width: 960px) {
    margin: 0 1rem;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2rem;
    column-gap: 0.5rem;
  }
}

.no-results {
  margin: 2rem;
  text-align: center;
  font-size: 1.5rem;
}
</style>