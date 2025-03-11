import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    index: [],
    price: null,
    mainImage: null,
    subTitle: null,
    discountLabel: null,
    ecoFriendlyLabel: null,
    additionalImages: null,
    name: null,
    sizes: null,
    description: null,
    colorDescription: null,
    styleCode: null,
    highlightItems: null,
    selectedGallery: []
  }),
  actions: {
    setProductProperties(prop) {
      this.price = prop.priceUSD || null;
      this.mainImage =
        prop.images.additional.map((image) => image.thumbnail) || null;
      this.subTitle = prop.productDescription || null;
      this.discountLabel = prop.promoLabel || null;
      this.ecoFriendlyLabel = prop.labels.ecoFriendly || null;
      this.additionalImages =
        prop.images.additional.map((image) => image.thumbnail) || null;
      this.name = prop.productName || null;
      this.sizes = prop.details.sizes || null;
      this.description = prop.description || null;
      this.colorDescription = prop.details.colorDescription || null;
      this.styleCode = prop.details.styleCode || null;
      this.selectedGallery =
        prop.images.additional.map((image) => image.gallery) || [];
      this.index = prop.productId || [];
      this.highlightItems = prop.details.highlight || [];
    }
  },
  persist: true
});
