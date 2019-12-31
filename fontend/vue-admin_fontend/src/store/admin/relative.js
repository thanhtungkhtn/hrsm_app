// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    relatives: [],

    errorRelation: null
  },
  actions: {
    fetchRelatives({ commit }) {
      return HTTP()
        .get("/relatives")
        .then(({ data }) => {
          commit("setRelatives", data);
          commit("setRelativesError", null);
        })
        .catch(function(error) {
          if (error.response) {
            commit("setRelatives", null);
            commit("setRelativesError", error.response.data.message);
          }
        });
    },
    deleteRelative({ commit }, relatives) {
      return HTTP()
        .delete(`/relatives/${relatives.id}`)
        .then(() => {
          commit("removeRelative", relatives);
        });
    }
  },
  getters: {},
  mutations: {
    setRelatives(state, relatives) {
      state.relatives = relatives;
    },
    // appendRelation(state, relative) {
    //   state.relatives.push(relative);
    // },

    removeRelative(state, relative) {
      try {
        state.relatives.results.splice(
          state.relatives.results.findIndex(x => x === relative),
          1
        );
      } catch (err) {
        console.log(err);
      }
    },

    setRelativesError(state, e) {
      state.errorRelation = e;
    },

    setEditMode(state, relative) {
      Vue.set(relative, "isEditMode", true);
    },
    unsetEditMode(state, relative) {
      Vue.set(relative, "isEditMode", false);
    }
  }
};
