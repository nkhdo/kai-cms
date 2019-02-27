import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/models/:slug',
      name: 'ModelDetails',
      component: () => import('@/views/ModelDetails.vue'),
    },
  ],
});
