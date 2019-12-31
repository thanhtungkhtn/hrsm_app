// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    cong: null,
    file: null,
    message: null
  },
  actions: {
    async fetchCong({ commit }) {
      // bang cham cong
      return await HTTP()
        .get("/account/timekeeping")
        .then(async ({ data }) => {
          // console.log(data)
          await commit("setCong", data);
        });
    },
    checkin({ dispatch, commit }) {
      return HTTP()
        .post("/account/turnworkin")
        .then(async () => {
          await dispatch("fetchCong");
          commit("setMessage", null);
        })
        .catch(function(error) {
          commit("setMessage", error.response.data.status);
        });
    },
    checkout({ dispatch, commit }) {
      return HTTP()
        .post("/account/turnworkout")
        .then(async () => {
          await dispatch("fetchCong");
          commit("setMessage", null);
        })
        .catch(function(error) {
          commit("setMessage", error.response.data.status);
        });
    },
    async checkInByImage({ dispatch, commit }, formData) {
      await HTTP()
        .post("/account/upload", formData)
        .then(() => {
          setTimeout(async () => {
            await dispatch("fetchCong");
          }, 3000);

          commit("setMessage", "uploaded");
        });
      commit("setMessage", null);
    },
    async checkOutByImage({ commit }, formDataOut) {
      await HTTP()
        .post("/account/uploadout", formDataOut)
        .then(() => {
          commit("setMessage", "uploaded");
        });
    }
  },
  getters: {},
  mutations: {
    setCong(state, cong) {
      state.cong = cong;
    },

    setNewFile(state, newFile) {
      state.file = newFile;
      console.log(state.file);
    },
    setMessage(state, message) {
      state.message = message;
    },

    setEditMode(state, cong) {
      Vue.set(cong, "isEditMode", true);
    },
    unsetEditMode(state, cong) {
      Vue.set(cong, "isEditMode", false);
    }
  }
};
