<template>
    <aside class="filters">
        <div class="filters__close">
            <icon name="ic:baseline-cancel" size="40px" @click="toggleFilter" />
        </div>
        <div class="filters__separator filters__separator--ocult"></div>
        <ul class="filters__categories">
            <li class="filters__categories-item" v-for="item in categories" :key="item.name"
                @click="toggleCategory(item.name)">
                {{ item.name }}
            </li>
        </ul>
        <div class="filters__separator"></div>
        <div class="filters__group" v-for="group in filterGroup" :key="group.title">
            <span @click="toggleList" class="filters__group-title">
                {{ group.title }}
                <template v-if="(getSelectedFilterCount(group.title))">
                    ({{ getSelectedFilterCount(group.title)}})
                </template>
                <icon name="ic:baseline-keyboard-arrow-down" />
            </span>

            <ul ref="groupLists" class="filters__group-list" :class="{
                'filters__group-list--toggled': toggledGroups[group.title],
                'filters__group-list--color': group.title === 'Color'
            }">
                <li v-for="item in group.group" :key="item.name || item" class="filters__categories-item"
                    :class="{ 'filters__categories-item--color': group.title === 'Color' }"
                    @click="handleItemClick(group.title, item, $event)">
                    <template v-if="group.title === 'Color'">
                        <span class="filters__color-circle" :style="{ backgroundColor: item.colorCode }"></span>
                        <h4 class="filters__color-name">{{ item.name }}</h4>
                    </template>
                    <template v-else>
                        <div class="filters__label">
                            <div class="filters__pseudo-checkbox"></div>
                            {{ item }}
                        </div>
                    </template>
                </li>
            </ul>
            <div class="filters__separator"></div>
        </div>
    </aside>
</template>

<script setup>
import { useFiltersStore } from '@/stores/filtersStore';

const filtersStore = useFiltersStore();

const { toggleFilter } = useFilters();

const filterMappings = {
    'Gender': 'genderFilters',
    'Color': 'colorFilters',
    'Shop by Price': 'priceFilters',
    'Sale & Offers': 'saleFilters',
    'Kids Age': 'kidAgeFilters',
    'Kids': 'kidGenderFilters',
    'Brand': 'brandFilters',
    'Sports & Activities': 'activityTypeFilters',
    'Best for': 'climateFilters',
};

const getSelectedFilterCount = (groupTitle) => {
    const filterKey = filterMappings[groupTitle];
    return filterKey ? filtersStore.selectedFilters[filterKey].length : 0;
};


const handleItemClick = (groupTitle, item) => {
    if (groupTitle === 'Shop by Price') {
        togglePriceRange(item);
    } else if (groupTitle === 'Color') {
        toggleColor(item.name);
    } else if (groupTitle === 'Gender') {
        toggleGender(item);
    } else if (groupTitle === 'Kids') {
        toggleGenderKid(item)
    } else if (groupTitle === 'Kids Age') {
        toggleKidsAge(item)
    } else if (groupTitle === 'Sale & Offers') {
        toggleSale(item)
    } else if (groupTitle === 'Brand') {
        toggleBrand(item)
    } else if (groupTitle === 'Sports & Activities') {
        toggleActiveType(item)
    } else if (groupTitle === 'Best for') {
        toggleClimate(item)
    } else {
        toggleCategory(item)
    }

    const clickedElement = event.currentTarget;
    const pseudoCheckbox = clickedElement.querySelector('.filters__pseudo-checkbox');

    if (pseudoCheckbox) {
        pseudoCheckbox.classList.toggle('filters__pseudo-checkbox--check');
    }
};

const togglePriceRange = (range) => {
    filtersStore.setPriceRangeFilter(range);
};

const toggleGender = (gender) => {
    filtersStore.setGenderFilter(gender)
}

const toggleGenderKid = (kidGender) => {
    filtersStore.setKidGenderFilter(kidGender)
}

const toggleActiveType = (type) => {
    filtersStore.setActivityTypeFilter(type)
};

const toggleClimate = (climate) => {
    filtersStore.setClimateFilter(climate)
}

const toggleKidsAge = (kidAge) => {
    filtersStore.setKidsAgeFilter(kidAge)
}

const toggleBrand = (brand) => {
    filtersStore.setBrandFilter(brand)
}

const toggleCategory = (category) => {
    filtersStore.setCategoryFilter(category);
};

const toggleSale = (sale) => {
    filtersStore.setSaleFilter(sale);
};

const toggleColor = (color) => {
    filtersStore.setColorFilter(color);
};

// Dados de categorias e filtros
const categories = [
    { name: 'Shoes' },
    { name: 'Hoodies & Pullovers' },
    { name: 'Jackets & Vests' },
    { name: 'Pants & Tights' },
    { name: 'Tops & T-Shirts' },
    { name: 'Shorts' },
    { name: 'Tights & Leggings' },
    { name: 'Tracksuits' },
    { name: 'Accessories & Equipment' },
];

const filterGroup = [
    { title: 'Sale & Offers', group: ['Black Friday - Up to 60% Off', 'See Price in Bag', 'Sale'] },
    { title: 'Shop by Price', group: ['$25 - $50', '$50 - $100', '$100 - $150', '$Over $150'] },
    { title: 'Gender', group: ['Men', 'Women', 'Unisex'] },
    { title: 'Kids', group: ['Boys', 'Girls'] },
    { title: 'Kids Age', group: ['Babies & Toddlers (0-3 yrs)', 'Little Kids (3-7 yrs)', 'Big Kids (7-15 yrs)'] },
    {
        title: 'Color', group: [
            { name: 'Black', colorCode: '#000000' },
            { name: 'Blue', colorCode: '#1790C8' },
            { name: 'Brown', colorCode: '#825D41' },
            { name: 'Green', colorCode: '#7BBA3C' },
            { name: 'Grey', colorCode: '#808080' },
            { name: 'Orange', colorCode: '#F36B26' },
            { name: 'Pink', colorCode: '#F0728F' },
            { name: 'Purple', colorCode: '#8D429F' },
            { name: 'Red', colorCode: '#E7352B' },
            { name: 'White', colorCode: '#FFFFFF' },
            { name: 'Yellow', colorCode: '#FED533' }
        ]
    },
    { title: 'Brand', group: ['Nike Sportswear'] },
    { title: 'Sports & Activities', group: ['Lifestyle', 'Training & Gym', 'Tennis'] },
    { title: 'Best for', group: ['Cold Weather'] },
];

const toggledGroups = ref({});

const toggleList = (e) => {
    const groupTitle = e.target.textContent.trim();
    toggledGroups.value[groupTitle] = !toggledGroups.value[groupTitle];

    const listElement = e.target.nextElementSibling;
    if (toggledGroups.value[groupTitle]) {
        listElement.style.height = `${listElement.scrollHeight}px`;
    } else {
        listElement.style.height = '0';
    }
};
</script>

<style lang="scss">
.filters {
    background-color: $color-white;
    position: sticky;
    max-height: 920px;
    overflow-y: scroll;
    top: calc(3rem + 2rem + 4.5rem);
    margin-left: 2rem;
    padding: 1rem;
    width: 260px;

    @media (max-width: 960px) {
        position: fixed;
        margin: 0;
        padding: 1.5rem;
        top: 0;
        left: 0;
        height: 100%;
        width: 100vw;
        z-index: 999999;
    }

    &__label {
        display: flex;
    }

    &__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.5rem;
        display: none;

        @media (max-width: 960px) {
            display: block;
        }
    }

    &__separator {
        width: 100%;
        height: 1px;
        background-color: $color-fog-gray;
        margin: 1rem 0;
        display: block;

        &--ocult {
            @media (max-width: 960px) {
                display: none;
            }
        }
    }

    &__categories {
        margin-top: 1rem;
        margin-bottom: 3rem;

        &-item {
            margin: 1rem 0;
            cursor: pointer;

            &:hover {
                color: $color-dark-gray;
            }

            &--color {
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }

    &__group {
        margin: 1rem 0;

        &-title {
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            font-weight: 300;
            cursor: pointer;
        }

        &-list {
            margin: 0;
            height: 0;
            overflow-y: hidden;
            transition: height 0.3s ease-in-out;

            &--toggled {
                margin: 0.5rem 0;
            }

            &--color {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                justify-content: start;
                align-items: center;

                @media (max-width: 960px) {
                    justify-content: center;
                }
            }
        }

        &-item {
            margin: 0.5rem 0;

            &:hover {
                color: $color-dark-gray;
                cursor: pointer;
            }

            &--color {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
}

.filters__color-circle {
    display: block;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 0.5px solid $color-fog-gray;
}

.filters__color-name {
    font-size: 0.8rem;
    font-weight: 300;
    margin: 0.5rem 0;
}

.filters__pseudo-checkbox {
    max-height: 20px;
    min-width: 20px;
    border: 1px solid $color-fog-gray;
    border-radius: 0.3rem;
    margin-right: 0.5rem;

    &--check {
        position: relative;
        display: inline-block;
        background-color: $color-black;

        &::before {
            content: '\2713';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 13px;
            color: $color-white;
            border: none;
        }
    }
}
</style>