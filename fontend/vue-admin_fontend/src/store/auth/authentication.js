/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-named-as-default-member
import router from '../../router';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    loginEmail: '',
    loginPassword: '',
    loginError: null,
    token: null,
  },
  actions: {
    // navi() {
    //   this.isLoggedIn ?  router.push('/dashboard') : router.push('/pages/login');
    // },
    logout({ commit }) {
      commit('setToken', null);
      localStorage.removeItem('token');

      router.push('/pages/login');
    },
    login({ commit, state }) {
      commit('setLoginError', null);
      console.log(state.loginEmail)
      console.log(state.loginPassword)

      return HTTP().post('/auth/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      })
        .then(({ data }) => {
          console.log(data.token);
          commit('setToken', data.token);
          localStorage.setItem('token', data.token)

          router.push('/');
        })
        .catch(() => {
          commit('setLoginError', 'An error has occured trying to login.');
        });
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
  },
};
