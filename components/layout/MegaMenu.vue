<template>
  <div class="mega-menu">
    <div class="mega-menu__main">
      <NuxtImg
        provider="cloudinary"
        format="webp"
        alt="Nike logo"
        src="v1755015974/Nike%20Clone/assets/nike-logo_exj6np.png"
        class="mega-menu__logo"
      />
      <ul class="mega-menu__nav-links">
        <li class="mega-menu__nav-link">Find a Store</li>
        <li class="mega-menu__nav-link">Help</li>
        <li class="mega-menu__nav-link">Join Us</li>
        <li class="mega-menu__nav-link">Sign In</li>
      </ul>
      <div class="mega-menu__content">
        <div
          class="mega-menu__section"
          v-for="(section, index) in sections"
          :key="index"
        >
          <h3 class="mega-menu__section-title" @click="toggleList">
            {{ section.title }}
          </h3>
          <ul class="mega-menu__list">
            <li
              v-for="(item, index) in section.items"
              :key="index"
              class="mega-menu__list-item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const sections = [
  {
    title: 'Featured',
    items: [
      'Air force 1',
      'Jordan 1',
      'Metcon',
      'Air Max 270',
      'Air Max 97',
      'Air Max 90',
      'Blazer',
      'Pegasus'
    ]
  },
  {
    title: 'Shoes',
    items: [
      'All Shoes',
      'Jordan Shoes',
      'Metcon',
      'Running Shoes',
      'Basketball Shoes',
      'Tennis Shoes',
      'Training Shoes',
      'Custom Shoes',
      'Sale Shoes',
      'Soccer Cleats'
    ]
  },
  {
    title: 'Clothing',
    items: [
      'All Clothing',
      'Tops & T-Shirts',
      'Shorts',
      'Hoodies & Pullovers',
      'Joggers & Sweatpants',
      'Sports Bras',
      'Pants & Tights',
      'Socks',
      'Yoga',
      'NikeLab',
      'Plus Size',
      'Big & Tall',
      'Sale Clothing'
    ]
  },
  {
    title: 'Kids',
    items: [
      'Infant & Toddler Shoes',
      'Kids Shoes',
      'Kids Basketball Shoes',
      'Kids Running Shoes',
      'Kids Jordan Shoes',
      'Kids Clothing',
      'Kids Backpacks',
      'Kids Socks',
      'Kids Sale'
    ]
  }
];

const toggleList = (e) => {
  if (window.innerWidth <= 880) {
    const elementBrother = e.target.nextElementSibling;
    if (elementBrother) {
      elementBrother.classList.toggle('mega-menu__list--toggled');
    }
  }
};

const updateFooterLists = () => {
  if (typeof window !== 'undefined') {
    const lists = document.querySelectorAll('.mega-menu__list');
    if (window.innerWidth <= 880) {
      lists.forEach((list) => {
        list.classList.add('mega-menu__list--toggled');
      });
    } else {
      lists.forEach((list) => {
        list.classList.remove('mega-menu__list--toggled');
      });
    }
  }
};

onMounted(() => {
  updateFooterLists();
  window.addEventListener('resize', updateFooterLists);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateFooterLists);
});
</script>

<style lang="scss">
.mega-menu {
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 880px) {
    justify-content: start;
    align-items: start;
    text-align: start;
    margin-left: 5%;
  }

  &__logo {
    width: 5.6rem;

    @media (max-width: 880px) {
      width: 4.5rem;
    }
  }

  &__nav-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 3rem;
    margin-bottom: 5rem;

    @media (max-width: 540px) {
      gap: 2rem;
      flex-direction: column;
    }
  }

  &__nav-link {
    cursor: pointer;

    &:hover {
      color: $color-dark-gray;
    }

    @media (max-width: 880px) {
      font-size: 1.3rem;
    }
  }

  &__content {
    display: flex;
    gap: 7rem;
    overflow-y: hidden;
    height: 250px;

    @media (max-width: 880px) {
      flex-direction: column;
      overflow: visible;
      height: auto;
      gap: 2rem;
    }

    &:hover {
      overflow-y: visible;
      height: auto;
    }
  }

  &__list {
    max-height: 9999px;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;

    &-item {
      color: $color-gray;
      margin: 1.5rem 0;

      @media (max-width: 880px) {
        font-size: 1.3rem;
      }

      &:hover {
        color: $color-black;
        cursor: pointer;
      }
    }

    &--toggled {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
    }
  }

  &__section {
    text-align: start;

    &-title {
      font-size: 1.4rem;
      font-weight: 300;
      margin-bottom: 0.5rem;

      @media (max-width: 880px) {
        font-size: 1.7rem;
      }
    }
  }
}
</style>
