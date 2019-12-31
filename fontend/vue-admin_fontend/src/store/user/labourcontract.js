// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    labourcontract: null
  },
  actions: {
    fetchLabourContract({ commit }) {
      return HTTP()
        .get("/account/labourcontract")
        .then(({ data }) => {
          commit("setLabourContract", data);
        });
    }
  },
  getters: {},
  mutations: {
    setLabourContract(state, labourcontract) {
      state.labourcontract = labourcontract;
    },

    setEditMode(state, labourcontract) {
      Vue.set(labourcontract, "isEditMode", true);
    },
    unsetEditMode(state, labourcontract) {
      Vue.set(labourcontract, "isEditMode", false);
    }
    // removeContact(state, contact) {
    //   state.contacts.splice(state.contacts.indexOf(contact), 1);
    // },
  }
};
