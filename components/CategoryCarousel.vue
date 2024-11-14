<template>
    <div class="category-carousel">
        <div class="category-carousel__content">
            <div 
                v-for="(slide, index) in slides"
                :key="index"
                class="category-carousel__slide"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
                <img :src="slide.image" :alt="slide.alt" class="category-carousel__image">
                <h2 class="category-carousel__title">{{ slide.title }}</h2>
                <p class="category-carousel__description">
                    {{ slide.description }} 
                    <span class="category-carousel__link">Saiba Mais</span>
                </p>
            </div>

            <div class="category-carousel__controls">
                <icon name="ic:baseline-arrow-back-ios-new" class="category-carousel__button category-carousel__button--prev" @click="prevSlide">Anterior</icon>
                <icon name="ic:baseline-arrow-forward-ios" class="category-carousel__button category-carousel__button--next" @click="nextSlide">Próximo</icon>
            </div>
        </div>
    </div>
</template>

<script setup>
const currentIndex = ref(0);
const slides = ref([
    {
        image: "https://nike-vibe-shop-images.vercel.app/icons/icon_release_shoes.png",
        title: "TÊNIS DE CORRIDA",
        description: "Encontre o seu tênis ideal."
    },
    {
        image: "https://nike-vibe-shop-images.vercel.app/icons/gift_card.png",
        title: "CARTÃO PRESENTE",
        description: "para presentes de última hora."
    }
]);

let intervalId;

const startAutoSlide = () => {
    intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % slides.value.length;
    }, 3300);
};

const changeSlide = (step) => {
    clearInterval(intervalId);
    currentIndex.value = (currentIndex.value + step + slides.value.length) % slides.value.length;
    startAutoSlide();
};

const nextSlide = () => changeSlide(1);
const prevSlide = () => changeSlide(-1);

onMounted(() => startAutoSlide());
onBeforeUnmount(() => clearInterval(intervalId));
</script>

<style lang="scss">
.category-carousel {
    background-color: $color-light-background;
    position: relative;
    padding: 1rem 0;

    &__content {
        display: flex;
        width: 50%;
        margin: 0 auto;
        overflow: hidden;
        position: relative;

        @media (max-width: 1380px) {
            width: 90%;
        }
    }

    &__slide {
        min-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.5s ease;

        @media (max-width: 980px) {
            flex-direction: column;
        }
    }

    &__image {
        width: 3rem;
    }

    &__title {
        font-size: 1rem;
        padding: 0 0 0 0.7rem;
        margin: 0;

        @media (max-width: 980px) {
            padding: 0.5rem 0;
        }
    }

    &__description {
        font-size: 0.875rem;
        padding: 0 0.7rem;
    }

    &__link {
        margin-left: 0.3rem;
        text-decoration: underline;
        cursor: pointer;
    }

    &__controls {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    &__button {
        background: $color-dark-gray;
        color: $color-white;
        border: none;
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        cursor: pointer;
        font-size: 1.5rem;

        @media (max-width: 630px) {
            font-size: 1.2rem;
        }
    }
}
</style>