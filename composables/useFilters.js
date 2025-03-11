import { onMounted, onBeforeUnmount } from 'vue';

export function useFilters() {
  // eslint-disable-next-line no-undef
  const showFilters = useState('showFilters', () => true);

  const toggleFilter = () => {
    showFilters.value = !showFilters.value;
  };

  const toggleFilterSmallWidth = () => {
    if (window.innerWidth <= 961) {
      showFilters.value = !showFilters.value;
    }
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
    toggleFilterSmallWidth
  };
}
