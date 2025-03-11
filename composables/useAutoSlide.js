import { ref, onBeforeUnmount, onMounted } from 'vue';

export function useAutoSlide(slides, interval = 3300) {
  const currentIndex = ref(0);
  let intervalId = null;

  const startAutoSlide = () => {
    intervalId = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % slides.value.length;
    }, interval);
  };

  const stopAutoSlide = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const changeSlide = (step) => {
    stopAutoSlide();
    currentIndex.value =
      (currentIndex.value + step + slides.value.length) % slides.value.length;
    startAutoSlide();
  };

  const nextSlide = () => changeSlide(1);
  const prevSlide = () => changeSlide(-1);

  onMounted(() => startAutoSlide());
  onBeforeUnmount(() => stopAutoSlide());

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    startAutoSlide,
    stopAutoSlide
  };
}
