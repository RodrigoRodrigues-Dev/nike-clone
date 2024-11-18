<template>
    <footer class="footer">
        <div class="footer__line"></div>
        <div class="footer__content">
            <div class="footer__grid">
                <div
                    class="footer__column"
                    v-for="column in footerList"
                    :key="column.title"
                >
                    <h4 class="footer__heading">{{ column.title }}</h4>
                    <ul class="footer__list">
                        <li
                            class="footer__item"
                            v-for="item in column.items"
                            :key="item"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer__separator"></div>
            <div class="footer__language">
                <icon class="footer__icon" name="ic:baseline-language" />
                United States
            </div>
            <div class="footer__separator"></div>
        </div>
        <div class="footer__sub">
            <span>© 2024 Nike, Inc. Todos los derechos reservados</span>
            <ul class="footer__sub-list">
                <li class="footer__sub-item" v-for="title in subList" :key="title.title">
                    {{ title.title }}
                </li>
            </ul>
        </div>
    </footer>
</template>

<script setup>
const footerList = [
    {
        title: 'Resources',
        items: [
            'Gift Cards',
            'Find a Store',
            'Membership',
            'Nike Journal',
            'Site Feedback',
        ],
    },
    {
        title: 'Help',
        items: [
            'Get Help',
            'Order Status',
            'Shipping and Delivery',
            'Returns',
            'Order Cancellation',
            'Payment Options',
            'Gift Card Balance',
            'Contact Us',
        ],
    },
    {
        title: 'Company',
        items: [
            'About Nike',
            'News',
            'Careers',
            'Investors',
            'Purpose',
            'Sustainability',
        ],
    },
    {
        title: 'Promotions & Discounts',
        items: [
            'Student',
            'Military',
            'Teacher',
            'First Responders & Medical Professionals',
            'Birthday',
        ],
    },
];

const subList = [
    { title: 'Guides' },
    { title: 'Terms of Sale' },
    { title: 'Terms of Use' },
    { title: 'Nike Privacy Policy' },
    { title: 'Your Privacy Choices' },
    { title: 'CA Supply Chains Act' },
];
</script>

<style lang="scss">
.footer {
    max-width: 93%;
    margin: 5rem auto;
    font-size: 0.875rem;

    @media (max-width: 1050px) {
        margin-left: 5%;
        font-size: 1rem;
    }

    &__line {
        height: 1px;
        background-color: $color-light-gray;
        margin-bottom: 3rem;
    }

    &__content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        @media (max-width: 1465px) {
            flex-direction: column;
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;

        @media (max-width: 1050px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        @media (max-width: 885px) {
            grid-template-columns: 1fr;
        }
    }

    &__column {
        min-width: 200px;
    }

    &__heading {
        margin-bottom: 1.5rem;
        font-weight: 500;
    }

    &__list {
        list-style: none;
        padding: 0;
        margin: 0;

        .footer__item {
            color: $color-gray;
            margin-bottom: 0.8rem;
        }
    }

    &__separator {
        display: none;
        width: 100%;
        height: 1px;
        background-color: $color-light-gray;
        margin: 3rem 0;

        @media (max-width: 1465px) {
            display: block;
        }
    }

    &__language {
        display: flex;
        align-items: center;
        color: $color-gray;
        cursor: pointer;

        .footer__icon {
            margin-right: 0.5rem;
        }
    }

    &__sub {
        margin-top: 4rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        color: $color-gray;
        font-size: 0.8rem;

        @media (max-width: 1200px) {
            flex-direction: column;
            align-items: flex-start;
        }

        @media (max-width: 885px) {
            margin-top: 2rem;
        }

        &-list {
            display: flex;
            gap: 1.5rem;
            list-style: none;
            padding: 0;
            margin: 0;

            @media (max-width: 1200px) {
                flex-direction: column;
                gap: 0.8rem;
            }
        }
    }
}

.footer__sub-item, 
.footer__item, 
.footer__language {
    transition: color 0.3s ease;

    &:hover {
        cursor: pointer;
        color: $color-black;
    }
}
</style>