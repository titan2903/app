import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Play from '../views/Play.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/play',
    name: 'Play',
    component: Play,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const guard = (to, from, next) => {
  const uname = localStorage.getItem('username');
  if (to.name !== 'Home' && !uname) {
    next('/');
  } else if (to.name == 'Home' && uname) {
    next('/play');
  } else {
    next();
  }
};

router.beforeEach(guard);

export default router;
