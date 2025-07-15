<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="cart">
    <template v-if="cartStore.items.length > 0 && !cartStore.purchaseCompleted">
      <!-- Cart Bag Section -->
      <div class="cart__bag">
        <h2 class="cart__bag-title">Bag</h2>
        <div
          class="cart__bag-item"
          v-for="item in cartStore.items"
          :key="item.id"
        >
          <div class="cart__bag-item-content">
            <div>
              <img class="cart__bag-item-image" :src="item.mainImage" alt="" />
              <div class="cart__bag-item-actions">
                <div class="cart__bag-item-actions-quantity">
                  <icon
                    name="tdesign:remove"
                    class="cart__bag-item-actions__btn"
                    :style="{
                      display: item.productAmount >= 2 ? 'block' : 'none'
                    }"
                    @click="removeProductAmount(item)"
                  />
                  <icon
                    name="mi:delete"
                    class="cart__bag-item-actions__btn"
                    :style="{
                      display: item.productAmount < 2 ? 'block' : 'none'
                    }"
                    @click="removeProduct(item)"
                  />
                  {{ item.productAmount }}
                  <icon
                    class="cart__bag-item-actions__btn"
                    name="material-symbols:add"
                    @click="addProductAmount(item)"
                  />
                </div>
                <div class="cart__bag-item-favorite">
                  <icon
                    class="cart__bag-item-favorite-btn"
                    :name="
                      item.markeHeartProduct
                        ? 'mdi:cards-heart'
                        : 'material-symbols:favorite-outline'
                    "
                    @click="addToFavorite(item)"
                  />
                </div>
              </div>
            </div>
            <div class="cart__bag-item-details">
              <div class="cart__bag-item-infos">
                <h1 class="cart__bag-item-title">{{ item.name }}</h1>
                <span class="cart__bag-item-subtitle">{{ item.subTitle }}</span>
                <span class="cart__bag-item-colors">{{ item.colors }}</span>
                <span class="cart__bag-item-size"
                  >Size <span class="blink">{{ item.size }}</span></span
                >
              </div>
              <span class="cart__bag-item-price">${{ item.price }}.00</span>
            </div>
          </div>
          <p class="cart__already-exists" v-if="item.productAddFav">
            This product (same color) is already in your favorite
          </p>
          <div class="cart__bag-item-shipping">
            <div class="cart__bag-item-shipping-top">
              <span>Shipping</span>
              <span
                >Arrives by Mon, Dec 23 to
                <span class="blink">90012</span></span
              >
            </div>
            <div class="cart__bag-item-shipping-bottom">
              <span>Free Pickup</span>
              <span class="blink">Find a Store</span>
            </div>
          </div>
          <div class="cart__separator"></div>
        </div>
      </div>
      <!-- Cart Summary Section -->
      <div class="cart__summary">
        <div class="cart__summary-header" @click="toggleSummary">
          <h2 class="cart__summary-title">Summary</h2>
          <icon
            name="material-symbols-light:keyboard-arrow-down-rounded"
            class="cart__summary-icon"
            size="20px"
          />
        </div>
        <div class="cart__summary-content">
          <div class="cart__summary-subtotal">
            <div class="cart__summary-subtotal-header">
              <h4 class="cart__summary-label">Subtotal</h4>
              <icon
                class="cart__summary-info-icon"
                name="mingcute:question-fill"
              ></icon>
            </div>
            <p class="cart__summary-amount">${{ sumWithInitial }}.00</p>
          </div>
          <div class="cart__summary-frete">
            <div class="cart__summary-frete-header">
              <h4>Estimated Shipping & Handling</h4>
            </div>
            <p>Free</p>
          </div>
          <div class="cart__summary-tax">
            <div class="cart__summary-tax-header">
              <h4>Estimated Tax</h4>
              <icon
                class="cart__summary-info-icon"
                name="mingcute:question-fill"
              ></icon>
            </div>
            <p>—</p>
          </div>
        </div>
        <div class="cart__separator"></div>
        <div class="cart__summary-total">
          <p>Total</p>
          <span>${{ sumWithInitial }}.00</span>
        </div>
        <div class="cart__separator"></div>
        <div class="progress-bar-container">
          <div
            class="progress-bar"
            id="progress-bar"
            :style="{ width: progressWidth }"
          ></div>
        </div>
        <div class="cart__summary-member">
          <p>
            Members get free shipping on orders $50.00+
            <span class="blink">Join us</span> or
            <span class="blink">Sign-in</span>
          </p>
        </div>
        <div class="cart__summary-btns">
          <button
            class="cart__summary-btn cart__summary-btn--check"
            @click="toggleFinalizePurchase"
          >
            Checkout
          </button>
          <button class="cart__summary-btn cart__summary-btn--paypal">
            <img
              src="https://www.nike.com/assets/experience/pet/payment-icons/paypal@2x.png"
              alt="PayPal"
            />
          </button>
        </div>
      </div>
      <!-- Cart Favorite Section -->
      <div class="cart__favorite">
        <h4 class="cart__favorite-title">Favorites</h4>
        <p>
          Want to view your favorites?
          <RouterLink to="/Favorites">
            <span class="blink">Check</span>
          </RouterLink>
        </p>
      </div>
    </template>
    <template
      v-if="cartStore.items.length === 0 && !cartStore.purchaseCompleted"
    >
      <div class="cart__empty">
        <h1 class="cart__empty-title">Your cart is empty</h1>
        <p class="cart__empty-description">
          Looks like you haven't added any items to your cart yet.
        </p>
        <RouterLink to="/Releases" class="cart__empty-link">
          <button class="cart__empty-button">Continue Shopping</button>
        </RouterLink>
      </div>
    </template>
    <template v-if="cartStore.purchaseCompleted">
      <div class="cart__complete">
        <h1 class="cart__complete-title">Purchase completed</h1>
        <p class="cart__complete-description">
          Your purchase has been completed successfully.
        </p>
        <RouterLink to="/Releases" class="cart__complete-link">
          <button class="cart__complete-button" @click="toggleFinalizePurchase">
            Continue Shopping
          </button>
        </RouterLink>
      </div>
    </template>
  </div>
  <CommonPopupItem />
</template>

<script setup>
// eslint-disable-next-line no-undef
definePageMeta({
  layout: 'custom'
});

import { computed } from 'vue';
import { useFavoriteStore } from '~/stores/favoriteStore';
import { RouterLink } from 'vue-router';
import { useCartStore } from '~/stores/cartStore';

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();

const addToFavorite = (item) => {
  const productData = {
    id: item.id,
    name: item.name,
    subTitle: item.subTitle,
    mainImage: item.mainImage,
    price: item.price,
    colors: item.colors,
    size: item.size,
    sizes: item.sizes,
    productAmount: item.productAmount
  };

  const productAlreadyExists = favoriteStore.items.some(
    (product) => product.mainImage === item.mainImage
  );

  if (productAlreadyExists) {
    item.productAddFav = true;
    item.markeHeartProduct = true;
    return;
  }

  item.markeHeartProduct = true;
  favoriteStore.items.unshift(productData);
};

const initializeOriginalPrice = (item) => {
  if (!item.originalPrice) {
    item.originalPrice = item.price;
  }
};

const newPrice = (item) => {
  item.price = item.originalPrice * item.productAmount;
};

const toggleFinalizePurchase = () => {
  cartStore.purchaseCompleted = !cartStore.purchaseCompleted;
  cartStore.items = [];
  setTimeout(() => {
    cartStore.purchaseCompleted = false;
  }, 3500);
};

const toggleSummary = () => {
  const summaryContent = document.querySelector('.cart__summary-content');
  summaryContent.classList.toggle('cart__summary-content--active');
};

const addProductAmount = (item) => {
  item.productAmount++;
  if (item.productAmount > 10) {
    return (item.productAmount = 10);
  }
  newPrice(item);
};

const removeProductAmount = (item) => {
  item.productAmount--;
  if (item.productAmount < 1) {
    return (item.productAmount = 1);
  }
  newPrice(item);
};

const removeProduct = (item) => {
  const indexProduct = cartStore.items.indexOf(item);
  cartStore.items.splice(indexProduct, 1);
};

const values = computed(() => cartStore.items.map((item) => item.price));
const initialValue = 0;
const sumWithInitial = computed(() => {
  return values.value.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
});

const maxAmount = 50;
const progressWidth = computed(() => {
  return Math.min((sumWithInitial.value / maxAmount) * 100, 100) + '%';
});

const updateMarkeHeartProduct = (item) => {
  const productExists = favoriteStore.items.some(
    (product) => product.mainImage === item.mainImage
  );
  if (productExists) {
    item.markeHeartProduct = true;
  } else {
    item.markeHeartProduct = false;
    item.productAddFav = false;
  }
};

cartStore.items.forEach((item) => {
  initializeOriginalPrice(item);
  updateMarkeHeartProduct(item);
});
</script>

<style lang="scss">
.cart {
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 1060px;
  margin: 3rem auto;

  @media (max-width: 1280px) {
    display: block;
  }

  &__bag {
    width: 100%;

    @media (max-width: 1280px) {
      width: 90%;
      margin: 0 auto;
    }

    &-title {
      margin: 1rem 0 2rem;
      font-weight: 100;
    }

    &-item {
      &-content {
        display: flex;
      }

      &-details {
        margin-left: 1rem;
        margin-right: 2rem;
        width: 80%;
        display: flex;
        justify-content: space-between;

        @media (max-width: 1280px) {
          margin-right: 0;
        }

        @media (max-width: 550px) {
          flex-direction: column-reverse;
          justify-content: flex-end;
        }
      }

      &-infos {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      &-title {
        font-size: 1rem;
      }

      &-subtitle,
      &-colors,
      &-size {
        color: $color-medium-gray;
      }

      &-colors {
        @media (max-width: 1280px) {
          display: none;
        }
      }

      &-image {
        width: 164px;
      }

      &-favorite-btn {
        padding: 0.6rem;

        &:hover {
          cursor: pointer;
        }
      }

      &-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1rem 0;

        &__btn {
          padding: 0.6rem;
          &:hover {
            cursor: pointer;
          }
        }

        &-quantity,
        .cart__bag-item-favorite {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid $color-fog-gray;
          border-radius: 3rem;
          font-size: 1rem;
          padding: 0.6rem;

          &:first-child {
            width: 65%;
            justify-content: space-between;
          }
        }
      }

      &-price {
        font-weight: bold;

        @media (max-width: 550px) {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
      }

      &-shipping {
        &-top,
        &-bottom {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        &-top {
          margin-bottom: 2rem;
        }
      }
    }
  }

  &__summary {
    width: 100%;

    @media (max-width: 1280px) {
      z-index: 9999;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: $color-white;
      border-top: 1px solid rgb(172, 172, 172);
      padding: 1.5rem;
    }

    &-header {
      margin: 1rem 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        cursor: pointer;
      }
    }

    &-icon {
      @media (min-width: 1280px) {
        display: none;
      }
    }

    &-content {
      @media (max-width: 1280px) {
        display: none;
      }

      &--active {
        display: block;
      }
    }

    &-title {
      font-weight: 100;

      @media (max-width: 1280px) {
        margin-bottom: 0;
      }
    }

    &-info-icon {
      margin-left: 0.5rem;
    }

    &-frete,
    &-tax,
    &-subtotal,
    &-total {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-header {
        display: flex;
        align-items: center;

        h4 {
          font-weight: 300;
        }
      }
    }

    &-frete {
      margin: 1rem 0;
    }

    &-member {
      margin: 1rem 0;
    }

    .cart__separator {
      margin: 1.5rem 0;
    }

    &-btn {
      width: 100%;
      border: none;
      padding: 1.5rem 0;
      border-radius: 2rem;
      margin-bottom: 0.5rem;
      font-size: 1rem;
      font-weight: 600;

      &:hover {
        cursor: pointer;
      }

      &--check {
        background-color: $color-black;
        color: $color-white;
      }

      &--paypal {
        img {
          width: 17%;
        }

        @media (max-width: 1280px) {
          display: none;
        }
      }
    }
  }

  &__favorite {
    @media (max-width: 1280px) {
      margin-left: 3rem;
    }

    &-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }

  &__separator {
    width: 100%;
    height: 1px;
    background-color: $color-silver-gray;
    margin: 3rem 0;
  }

  &__empty,
  &__complete {
    @media (max-width: 1100px) {
      text-align: center;

      &-description {
        margin: 1rem;
      }
    }

    &-title {
      font-size: 2rem;
      font-weight: 100;
      margin-bottom: 1rem;
    }

    &-description {
      font-size: 1rem;
      color: $color-medium-gray;
      margin-bottom: 1rem;
    }

    &-button {
      padding: 1rem 2rem;
      border: 1px solid $color-black;
      border-radius: 2rem;
      background-color: $color-black;
      color: $color-white;
      font-size: 1rem;
      font-weight: 600;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__already-exists {
    color: $color-red;
    margin-bottom: 0.5rem;
  }
}

.progress-bar-container {
  width: 100%;
  height: 20px;
  background-color: $color-fog-gray;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  width: 0%;
  background-color: $color-spring-green;
  transition: width 0.3s ease;
}

.blink {
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
}
</style>
