import './_styles.sass';
import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import {sync} from 'vuex-router-sync';
import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

import LtsApp from './lts_app';
import router from './router';
import store from './store';
import i18n from './lang';

gsap.registerPlugin(ScrollToPlugin);

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  i18n,
  router,
  store,
  render: h => h(LtsApp),
}).$mount('#app');
