import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { url } from './config';
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logingIn: false,
    logingError: null,
    accessToken: false,
    user: null,
  },
  mutations: {
    loginStart: (state) => {
      const ste = state;
      ste.logingIn = true;
    },
    loginStop: (state, errorMsg) => {
      const ste = state;
      ste.logingIn = false;
      ste.logingError = errorMsg;
    },
    updateAccessToken: (state, accessToken) => {
      const ste = state;
      ste.accessToken = accessToken;
    },
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      axios
        .post(`${url}/auth/login`, {
          ...loginData,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('accessToken', response.data.token);
          commit('loginStop', null);
          commit('updateAccessToken', response.data.token);
          router.push('/home');
        })
        .catch((error) => {
          console.log(error);
          //commit('loginStop', error.response.data.error);
          commit('updateAccessToken', null);
        });
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      commit('logout');
      router.push('/');
    },
  }
})
