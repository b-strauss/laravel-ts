import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0};
  },
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        // default: InOverview,
      },
    },
  ],
});

export default router;
