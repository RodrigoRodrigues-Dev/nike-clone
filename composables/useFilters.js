export function useFilters() {
    const showFilters = useState('showFilters', () => true);

    const toggleFilter = () => {
        showFilters.value = !showFilters.value;
    };

    const handleResize = () => {
        showFilters.value = window.innerWidth >= 961;
    };

    onMounted(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });

    return {
        showFilters,
        toggleFilter,
    };
}