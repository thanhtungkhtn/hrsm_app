// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    offices: [],
    currentOfficeName: null,
    newOfficeName: null,

    errorOffice: null
  },
  actions: {
    async fetchOffices({ commit }) {
      return HTTP()
        .get("/offices")
        .then(({ data }) => {
          commit("setOffices", data);
          commit("setOfficesError", null);
          // console.log(data)
        })
        .catch(function(error) {
          if (error.response) {
            commit("setOffices", null);
            commit("setOfficesError", error.response.data.message);
          }
        });
    },
    async saveOffice({ dispatch, commit, state }, office) {
      // console.log(office)
      return HTTP()
        .patch(`/office/${office.id}`, {
          name: state.currentOfficeName ? state.currentOfficeName : office.name //isMember ? "$2.00" : "$10.00"
        })
        .then(async () => {
          commit("setCurrentOfficeName", null);
          await dispatch("fetchOffices");
        })
        .catch(err => {
          console.log(err);
        });
    },
    async createOffice({ commit, state }) {
      return HTTP()
        .post("/office", {
          name: state.newOfficeName
        })
        .then(({ data }) => {
          commit("appendOffice", data);
          commit("setNewOfficeName", null);
        });
    },
    async deleteOffice({ commit }, office) {
      return HTTP()
        .delete(`/office/${office.id}`)
        .then(res => {
          // console.log(res.data)
          res.data
            ? commit("removeOffice", office)
            : alert("Cannot delete because of a logical error!!");
        });
    }
  },
  getters: {},
  mutations: {
    setCurrentOfficeName(state, name) {
      state.currentOfficeName = name;
    },
    setNewOfficeName(state, name) {
      console.log(name);
      state.newOfficeName = name;
    },
    setOffices(state, offices) {
      state.offices = offices;
    },
    appendOffice(state, office) {
      state.offices.results.push(office.data);
    },
    setEditMode(state, office) {
      Vue.set(office, "isEditMode", true);
    },
    unsetEditMode(state, office) {
      Vue.set(office, "isEditMode", false);
    },

    setOfficesError(state, e) {
      state.errorOffice = e;
    },

    removeOffice(state, office) {
      try {
        state.offices.results.splice(
          state.offices.results.findIndex(x => x === office),
          1
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
};
