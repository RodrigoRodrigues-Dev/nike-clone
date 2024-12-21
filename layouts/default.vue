<template>
    <div>
        <TopNavigation />
        <Header />
        <CategoryCarousel />
        <DiscountBanner />
        <main>
            <slot />
        </main>
        <Footer />
        <SearchResults />
    </div>
</template>