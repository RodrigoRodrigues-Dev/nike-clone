<template>
    <div class="popupItem" :style="{ display: showPopup ? 'block' : 'none' }" v-if="firstItem">
        <icon class="popupItem__close" name="material-symbols:cancel" style="color: #D0D0D0; width: 30px; height: 30px;" @click="closePopup" />
        <div v-if="isCart" class="popupItem__add">
            <icon name="material-symbols:verified-rounded" style="color: green; margin-right: 0.5rem; width: 25px; height: 25px;" />
            <h3>Added to Bag</h3>
        </div>
        <div v-else class="popupItem__fav">
            <icon name="material-symbols:favorite" style="color: #FA8072; margin-right: 0.5rem; width: 25px; height: 25px;" />
            <h3>Added to Favorite</h3>
        </div>
        <div class="popupItem__infos">
            <img :src="firstItem.mainImage" class="popupItem__image" />
            <div class="popupItem__infos-content">
                <span>{{ firstItem.name }}</span>
                <span class="popupItem__infos-subTitle">{{ firstItem.subTitle }}</span>
                <span class="popupItem__infos-size">{{ firstItem.size }}</span>
                <span>${{ firstItem.price }}.00</span>
            </div>
        </div>
        <div class="popupItem__btns">
            <RouterLink to="/Cart" v-if="isCart">
                <button class="popupItem__btn popupItem__btn--view">View Bag ({{ cartStore.items.length }})</button>
            </RouterLink>
            <RouterLink to="/Favorites" v-else>
                <button class="popupItem__btn popupItem__btn--view">View Favorite ({{ favoriteStore.items.length }})</button>
            </RouterLink>
        </div>
    </div>
    <div class="modal-overlay" :style="{ display: showPopup ? 'block' : 'none' }" @click="closePopup"></div>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';
import { useFavoriteStore } from '~/stores/favoriteStore';
import { watch, ref } from 'vue';

const showPopup = ref(false);
const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const firstItem = ref(null);
const isCart = ref(false);

const closePopup = () => {
    showPopup.value = false;
    document.body.style.overflow = '';
};

const handlePopup = (items, isCartItem) => {
    firstItem.value = items[0];
    isCart.value = isCartItem;
    window.scrollTo({ top: 0 });
    document.body.style.overflow = 'hidden';
    showPopup.value = true;
    setTimeout(() => {
        document.body.style.overflow = '';
        showPopup.value = false;
    }, 1800);
};

let previousFavoriteCount = favoriteStore.items.length;

watch(
    () => favoriteStore.items.length,
    (newLength, oldLength) => {
        if (newLength > oldLength) {
            handlePopup(favoriteStore.items, false);
        }
        previousFavoriteCount = newLength;
    }
);

watch(
    () => cartStore.items.length,
    (newLength, oldLength) => {
        if (newLength > oldLength) {
            handlePopup(cartStore.items, true);
        }
    }
);
</script>

<style lang="scss">
.popupItem {
    z-index: 9999;
    position: absolute;
    top: 122px;
    right: 20px;
    background-color: $color-white;
    width: 380px;
    padding: 1.5rem;
    border-radius: 0 0 1rem 1rem;
    box-sizing: content-box;

    @media (max-width: 1025px) {
        top: 77px;
    }

    @media (max-width: 630px) {
        top: auto;
        bottom: 0;
        right: 50%;
        transform: translateX(50%);
        border-radius: 1rem 1rem 0 0;

        width: 85%;
    }

    &__close {
        position: absolute;
        right: 20px;

        &:hover {
            cursor: pointer;
        }
    }

    &__infos {
        display: flex;
        align-items: start;
        padding: 1rem 0;

        &-content {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }

        &-subTitle,
        &-size {
            color: $color-gray;
        }
    }

    &__add,
    &__fav {
        display: flex;
        align-items: center;
    }

    &__image {
        width: 100px;
        margin-right: 1rem;
    }

    &__btns {
        width: 100%;
    }

    &__btn {
        width: 100%;
        border: none;
        border-radius: 2rem;
        padding: 1rem 0;
        font-size: 1rem;

        &:hover {
            cursor: pointer;
        }

        &--view {
            font-weight: 700;
            background-color: transparent;
            border: 1px solid $color-medium-gray;
        }
    }
}

.modal-overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: $color-black;
    opacity: 15%;
}
</style>