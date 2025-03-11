/* eslint-disable no-undef */
import { createPinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();

  if (process.client) {
    import('pinia-plugin-persistedstate').then((piniaPersistedState) => {
      pinia.use(piniaPersistedState.default);
    });
  }

  nuxtApp.vueApp.use(pinia);
});
