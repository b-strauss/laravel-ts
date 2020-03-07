import Vue from 'vue';
import Vuex from 'vuex';
import createVuexLogger from 'vuex/dist/logger';

import config from './module/config';

Vue.use(Vuex);

const plugins = [];

// TODO: disable if environment is production
if (__BUILD_IS_DEVELOPMENT__) {
  plugins.push(
    createVuexLogger({
      logger: console,
    }),
  );
}

export default new Vuex.Store({
  plugins,
  modules: {
    config,
  },
});
