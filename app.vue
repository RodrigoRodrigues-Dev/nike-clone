<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useFiltersStore } from './stores/filtersStore';
import { useSearchResults } from '~/stores/searchResults';

const filtersStore = useFiltersStore();
const searchResults = useSearchResults();

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://cf53ba9b308f2696.mokky.dev/products'
    );
    setTimeout(() => {
      filtersStore.setProducts(data);
      searchResults.products = data;
    }, 550);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
</script>
