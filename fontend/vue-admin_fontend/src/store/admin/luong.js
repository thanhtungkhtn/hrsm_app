// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    bangluongs: null
  },
  actions: {
    fetchBangLuongs({ commit }) {
      // vi luong duoc tinh tu dong
      return HTTP()
        .get("/blg")
        .then(({ data }) => {
          commit("setBangLuongs", data);
          // console.log(data)
        });
    }
  },
  getters: {},
  mutations: {
    setBangLuongs(state, bangluongs) {
      state.bangluongs = bangluongs;
    },

    setEditMode(state, congs) {
      Vue.set(congs, "isEditMode", true);
    },
    unsetEditMode(state, congs) {
      Vue.set(congs, "isEditMode", false);
    }
    // removeContact(state, contact) {
    //   state.contacts.splice(state.contacts.indexOf(contact), 1);
    // },
  }
};
