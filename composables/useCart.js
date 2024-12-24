import { useCartStore } from '~/stores/cartStore';
import { useProductStore } from '~/stores/productStore';
import { useFavoriteStore } from '~/stores/favoriteStore';

export function useCart() {
    const cartStore = useCartStore();
    const productStore = useProductStore();
    const favoriteStore = useFavoriteStore();

    const sizeSelect = ref(false);
    const activeSize = ref('');
    const indexImage = ref(0);
    const productAdd = ref(false);

    const addToCart = (productData = null) => {
        if (!activeSize.value) {
            sizeSelect.value = true;
            return;
        }

        if (!productData) {
            productData = {
                index: productStore.index,
                name: productStore.name,
                mainImage: productStore.mainImage?.[indexImage.value],
                price: productStore.price,
                subTitle: productStore.subTitle,
                colors: productStore.colorDescription,
                size: activeSize.value,
                productAmount: 1
            };
        }

        const existingProduct = cartStore.items.find(
            (item) => item.mainImage === productData.mainImage && item.size === productData.size
        );

        if (existingProduct) {
            productAdd.value = true;
            return;
        }
        
        favoriteStore.isModalOpen = false;
        productAdd.value = false;
        cartStore.items.unshift(productData);
        sizeSelect.value = false;
    };

    return {
        sizeSelect,
        activeSize,
        indexImage,
        productAdd,
        addToCart,
    };
}