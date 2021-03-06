import Vue from 'vue';
import VueI18n from 'vue-i18n';
import de from './de';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'de',
  messages: {
    de,
  },
  numberFormats: {
    de: {
      currency: {
        style: 'currency',
        currency: 'EUR',
      },
      decimal: {
        style: 'decimal',
      },
    },
  },
  missing: (locale, key) => {
    return `#${locale}:${key}#`;
  },
});
