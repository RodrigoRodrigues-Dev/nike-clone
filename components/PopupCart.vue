<template>
    <div class="popupCart" :style="{ display: showPopup ? 'block' : 'none' }" v-if="firstItem">
        <icon class="popupCart__close" name="material-symbols:cancel" style="color: #D0D0D0; width: 30px; height: 30px;" @click="closePopup" />
        <div class="popupCart__add">
            <icon name="material-symbols:verified-rounded" style="color: green; margin-right: 0.5rem; width: 25px; height: 25px;" />
            <h3>Added to Bag</h3>
        </div>
        <div class="popupCart__infos">
            <img :src="firstItem.mainImage" class="popupCart__image" />
            <div class="popupCart__infos-content">
                <span>{{ firstItem.name }}</span>
                <span class="popupCart__infos-subTitle">{{ firstItem.subTitle }}</span>
                <span class="popupCart__infos-size">{{ firstItem.size }}</span>
                <span>${{ firstItem.price }}</span>
            </div>
        </div>
        <div class="popupCart__btns">
            <RouterLink to="/Cart">
                <button class="popupCart__btn popupCart__btn--view">View Bag ({{ cartStore.itens.length }})</button>
            </RouterLink>
        </div>
    </div>
    <div class="modal-overlay" :style="{ display: showPopup ? 'block' : 'none' }" @click="closePopup"></div>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';

const showPopup = ref(false);
const cartStore = useCartStore();
const firstItem = computed(() => cartStore.itens[0]);

const closePopup = () => {
    showPopup.value = false;
    document.body.style.overflow = '';
};

watch(cartStore.itens, () => {
    window.scrollTo({ top: 0 });
    document.body.style.overflow = 'hidden';
    showPopup.value = true;
    setTimeout(() => {
        document.body.style.overflow = '';
        showPopup.value = false;
    }, 2500);
});
</script>

<style lang="scss">
.popupCart {
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

    &__add {
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