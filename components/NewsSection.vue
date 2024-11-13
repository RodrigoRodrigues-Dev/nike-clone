<template>
    <div class="news-section">
        <div class="container">
            <div class="news-section__content">
                <h2 class="news-section__title">New This Week</h2>
                <p class="news-section__description">Featuring the Nike C1TY & more.</p>
            </div>
        </div>
        <div class="news-section__image">
            <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2291,c_limit/90dfcb34-49fe-4f36-a631-23ef81bbcfd2/sitio-web-oficial-de-nike.jpg" alt="">
        </div>
    </div>
</template>

<style lang="scss">
.news-section {
    &__content {
        text-align: center;
        margin-bottom: 3rem;
    }

    &__title {
        @include title(3rem);
        margin-bottom: 0.5rem;

        @media (max-width: 880px) {
            font-size: 2.5rem;
        }
    }

    &__description {
        font-size: 1rem;
        color: $color-gray;
    }

    &__image {
        img {
            width: 100%;
        }
    }
}
</style>