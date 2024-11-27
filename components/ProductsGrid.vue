<template>
  <div>
    <div v-if="!visibleProducts.length" class="no-results">
      No products found.
    </div>
    <div v-else class="products-grid">
      <ProductsCard
        v-for="item in visibleProducts"
        :key="item.productId"
        :mainImage="item.imageUrl"
        :title="item.productName"
        :message="item.ecoFriendlyLabel"
        :subtitle="item.productDescription"
        :additional-images="item.additionalImages"
        :colorOptions="`colors ${item.availableColors.length}`"
        :price="`$${item.priceUSD}`"
        :promotion="item.discountLabel"
        :promo="item.promoLabel || 'No promotion available'"
      />
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from '@/stores/filtersStore';
import axios from 'axios';

const filtersStore = useFiltersStore();

onMounted(async () => {
  const { data } = await axios.get('https://cf53ba9b308f2696.mokky.dev/products');
  filtersStore.setProducts(data);
});

const visibleProducts = computed(() => filtersStore.filteredProducts);
</script>


<style lang="scss">
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 0 2rem;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 1rem;
    gap: 0.5rem;
  }
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  margin: 2rem;
  color: $color-charcoal-gray;
}

.no-results {
  text-align: center;
  font-size: 1.5rem;
  margin: 2rem;
  color: $color-stone-gray;
}
</style>