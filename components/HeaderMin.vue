<template>
    <header class="header-min">
        <RouterLink to="/">
            <img class="header-min__logo" src="https://nike-inspired-site-images.vercel.app/nike-logo.png" alt="Nike Logo">
        </RouterLink>
    </header>
</template>

<style lang="scss">

.header-min {
    background-color: $color-light-background;
    padding: 2rem;
    margin-bottom: 1.25rem;

    &__logo {
        width: 4rem;
    }
}

@media (max-width: 630px) {
    .header-min {
        &__logo {
            width: 3.5rem;
        }
    }
}
</style>