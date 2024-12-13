<template>
  <template v-if="isLoading">
    <div class="loading">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </template>
  <template v-else-if="!visibleProducts.length">
    <div class="no-results">
      <p>No products found.</p>
    </div>
  </template>
  <template v-else>
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
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useFiltersStore } from '@/stores/filtersStore';
import { useProductStore } from '@/stores/productStore';

const filtersStore = useFiltersStore();
const productStore = useProductStore();
const router = useRouter();

const isLoading = ref(true);

const goToProduct = (item) => {
  productStore.setProductProperties(item);
  router.push({
    name: 'Releases-name',
    params: { name: item.productName },
  });
};

onMounted(async () => {
  try {
    const { data } = await axios.get('https://cf53ba9b308f2696.mokky.dev/products');
    setTimeout(() => {
      filtersStore.setProducts(data);
      isLoading.value = false;
    }, 550);
  } catch (error) {
    console.error('Error fetching products:', error);
    isLoading.value = false;
  }
});

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

.loading {
  margin: 2rem;
  text-align: center;
  font-size: 1.5rem;
  color: $color-charcoal-gray;
}

.no-results {
  margin: 2rem;
  text-align: center;
  font-size: 1.5rem;
  color: $color-stone-gray;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  color: $color-charcoal-gray;
}

.lds-ring,
.lds-ring div {
  box-sizing: border-box;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid currentColor;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: currentColor transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>