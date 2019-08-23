import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import axios from 'axios';
import store from './store';
import { url } from './config';

Vue.use(Router)

async function checkAuth(to, from, next) {
  if (!localStorage.getItem('accessToken')) {
    console.log('não existe token');
    return next('/');
  }
  if (store.state.user === null) {
    store.dispatch('fetchAccessToken');
    await axios.get(`${url}/user`, {
      headers: {
        Authorization: `bearer ${store.state.accessToken}`,
      }
    }).then((result) => {
      console.log('congratulations');
    }).catch(() => {
      store.dispatch('logout');
    });
  }
  return next();
}

async function checkPathLogin(to, from, next) {
  if (localStorage.getItem('accessToken')) {
    console.log('checou o login');
    store.dispatch('fetchAccessToken');
    await axios.get(`${url}/user`, {
      headers: {
        Authorization: `bearer ${store.state.accessToken}`,
      }
    }).then((result) => {
      console.log(result);
      return next('/home');
    }).catch(() => {
      store.dispatch('logout');
    });
  }
  return next();
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: checkPathLogin,
    },
    {
      path: '/registrar',
      name: 'registrar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Registrar.vue')
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      beforeEnter: checkAuth,
    },
  ]
})
