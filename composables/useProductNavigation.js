import { useRouter } from 'vue-router';
import { useProductStore } from '~/stores/productStore';

export function useProductNavigation() {
  const router = useRouter();
  const productStore = useProductStore();

  const goToProduct = (item) => {
    productStore.setProductProperties(item);
    router.push({
      name: 'Releases-name',
      params: { name: item.productName }
    });
  };

  return { goToProduct };
}
