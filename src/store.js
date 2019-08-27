import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { url } from './config';
import router from './router';
import EventBus from './EventBus';

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
    logout: (state) => {
      const ste = state;
      ste.user = null;
      ste.accessToken = false;
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
          EventBus.$emit('alt-snackbar', { color: 'success', msg: 'Login Realizado' });
          localStorage.setItem('accessToken', response.data.token);
          commit('loginStop', null);
          commit('updateAccessToken', response.data.token);
          router.push('/home');
        })
        .catch((error) => {
          //commit('loginStop', error.response.data.error);
          if(error.response.status) {
            EventBus.$emit('alt-snackbar', { color: 'error', msg: 'Credenciais Incorretas' });
          }
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
