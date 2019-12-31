// import router from '../router';
// import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    data: null,
  },
  actions: {
    fetchData({ commit }) { // vi luong duoc tinh tu dong
      return HTTP().get('/statistical')
        .then(({ data }) => {
          commit('setData', data);
          // console.log(data)
        });
    },

  },
  getters: {
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
  },
};

