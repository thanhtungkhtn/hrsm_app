// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    literacies: [],
    currentLiteracyName: null,
    currentLiteracyHeSoTrinhDo: null,

    newLiteracyName: null,
    newLiteracyHeSoTrinhDo: null,

    errorLiteracy: null
  },
  actions: {
    async fetchLiteracies({ commit }) {
      return HTTP()
        .get("/literacies")
        .then(({ data }) => {
          commit("setLiteracies", data);
          commit("setLiteraciesError", null);
          // console.log(data)
        })
        .catch(function(error) {
          if (error.response) {
            commit("setLiteracies", null);
            commit("setLiteraciesError", error.response.data.message);
          }
        });
    },
    async saveLiteracy({ dispatch, commit, state }, literacy) {
      // console.log(position)
      return HTTP()
        .patch(`/literacy/${literacy.id}`, {
          name: state.currentLiteracyName
            ? state.currentLiteracyName
            : literacy.name,
          professional_coefficient: state.currentLiteracyHeSoTrinhDo
            ? state.currentLiteracyHeSoTrinhDo
            : literacy.professional_coefficient
        })
        .then(async () => {
          await dispatch("fetchLiteracies");
          commit("setCurrentLiteracyName", null);
          commit("setCurrentLiteracyHeSoTrinhDo", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async createLiteracy({ commit, state }) {
      return HTTP()
        .post("/literacy", {
          name: state.newLiteracyName,
          professional_coefficient: state.newLiteracyHeSoTrinhDo
        })
        .then(({ data }) => {
          commit("appendLiteracy", data);
          commit("setNewLiteracyName", null);
          commit("setNewLiteracyHeSoTrinhDo", null);
        });
    },
    async deleteLiteracy({ commit }, literacy) {
      return HTTP()
        .delete(`/literacy/${literacy.id}`)
        .then(res => {
          res.data
            ? commit("removeLiteracy", literacy)
            : alert("Cannot delete because of a logical error!!");
        });
    }
  },
  getters: {},
  mutations: {
    // Edit
    setCurrentLiteracyName(state, name) {
      state.currentLiteracyName = name;
    },
    setCurrentLiteracyHeSoTrinhDo(state, hesotrinhdo) {
      state.currentLiteracyHeSoTrinhDo = hesotrinhdo;
    },

    // Create
    setNewLiteracyName(state, name) {
      // console.log(name)
      state.newLiteracyName = name;
    },
    setNewLiteracyHeSoTrinhDo(state, hesotrinhdo) {
      state.newLiteracyHeSoTrinhDo = hesotrinhdo;
    },

    // Fetch
    setLiteracies(state, literacies) {
      state.literacies = literacies;
    },

    // display
    appendLiteracy(state, literacy) {
      state.literacies.results.push(literacy.data);
    },

    removeLiteracy(state, literacy) {
      try {
        state.literacies.results.splice(
          state.literacies.results.findIndex(x => x === literacy),
          1
        );
      } catch (err) {
        console.log(err);
      }
    },

    setLiteraciesError(state, e) {
      state.errorLiteracy = e;
    },

    setEditMode(state, literacy) {
      Vue.set(literacy, "isEditMode", true);
    },
    unsetEditMode(state, literacy) {
      Vue.set(literacy, "isEditMode", false);
    }
  }
};
