<template>
    <div class="releases">
        <ResultsHeader />
        <div class="releases__content">
            <SidebarFilters v-show="showFilters"/>
            <ProductsGrid />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'custom',
});

const { showFilters } = useFilters();

</script>


<style lang="scss">
.releases {
    &__content {
        display: flex;
        transition: all ease 0.5s;
    }
}
</style>