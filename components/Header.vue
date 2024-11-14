<template>
    <header class="header">
        <div class="header__container">
            <RouterLink to="/">
                <img class="header__logo" src="https://nike-vibe-shop-images.vercel.app/nike-logo.png" alt="Logo da Nike">
            </RouterLink>
            <h3 class="header__title">just do it</h3>
            <ul class="header__iconMenu">
                <li class="header__iconMenu__item">
                    <icon name="ic:outline-account-circle"/>
                </li>
                <li class="header__iconMenu__item">
                    <RouterLink to="/Favorites">
                        <icon name="ic:baseline-favorite-border"/>
                    </RouterLink>
                </li>
                <li class="header__iconMenu__item">
                    <RouterLink to="/Drawer">
                        <icon name="ic:outline-shopping-bag"/>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </header>
</template>

<style lang="scss">
.header {
    position: sticky;
    top: 0;
    left: 0;
    background-color: $color-white;
    padding: 1.5rem 0;
    z-index: 999;
    box-shadow: 0px 0.375rem 0.5rem rgba($color-black, 0.1);

    &__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8%;
    }

    &__logo {
        width: 4.5rem;
    }

    &__title {
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.375rem;
    }

    &__iconMenu {
        display: flex;
        gap: 1rem;

        &__item {
            position: relative;
            font-size: 1.5rem;

            &:hover {
                cursor: pointer;

                &::before {
                    content: '';
                    position: absolute;
                    background-color: $color-light-gray-2;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    top: 44%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            &__icon {
                width: 1.5rem;
            }
        }
    }
}

@media (max-width: 630px) {
    .header {
        padding: 1rem;

        &__iconMenu {
            &__item {
                font-size: 1.2rem;
            }
        }

        
        &__container {
            padding: 0 2%;
        }

        &__logo {
            width: 3rem;
        }

        &__title {
            display: none;
        }

        &__iconMenu {
            &__item {
                width: 1rem;
            }
        }
    }
}
</style>