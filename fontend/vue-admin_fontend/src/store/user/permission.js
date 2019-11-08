// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    permission: null,
  },
  actions: {
    fetchPermission({ commit }) {
      return HTTP().get('/account/per')
        .then(({ data }) => {
          commit('setPermission', data);
          // console.log(data)
        });
    },
  },
  getters: {
  },
  mutations: {
    setPermission(state, permission) {
      state.permission = permission;
    },


    setEditMode(state, user) {
      Vue.set(user, 'isEditMode', true);
    },
    unsetEditMode(state, user) {
      Vue.set(user, 'isEditMode', false);
    },
  },
};
