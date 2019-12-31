// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    luong: null,
  },
  actions: {
    fetchLuong({ commit }) {
      return HTTP().get('/account/getusersa')
        .then(({ data }) => {
          commit('setLuong', data);
          // console.log(data)
        });
    },
  },
  getters: {
  },
  mutations: {
    setLuong(state, luong) {
      state.luong = luong;
    },


    setEditMode(state, luong) {
      Vue.set(luong, 'isEditMode', true);
    },
    unsetEditMode(state, luong) {
      Vue.set(luong, 'isEditMode', false);
    },
    // removeContact(state, contact) {
    //   state.contacts.splice(state.contacts.indexOf(contact), 1);
    // },
  },
};

