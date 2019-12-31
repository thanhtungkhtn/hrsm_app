// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    positions: [],
    currentPositionName: null,
    currentPositionBasicSalary: null,
    currentPositionHeSoChucVu: null,
    currentPositionHeSoTrachNhiem: null,

    newPositionName: null,
    newPositionBasicSalary: null,
    newPositionHeSoChucVu: null,
    newPositionHeSoTrachNhiem: null,

    errorPosition: null
  },
  actions: {
    async fetchPositions({ commit }) {
      return HTTP()
        .get("/positions")
        .then(({ data }) => {
          commit("setPositions", data);
          commit("setPositionsError", null);
          // console.log(data)
        })
        .catch(function(error) {
          if (error.response) {
            commit("setPositions", null);
            commit("setPositionsError", error.response.data.message);
          }
        });
    },
    async savePosition({ dispatch, commit, state }, position) {
      // console.log(position)
      return HTTP()
        .patch(`/position/${position.id}`, {
          name: state.currentPositionName
            ? state.currentPositionName
            : position.name,
          basic_salary: state.currentPositionBasicSalary
            ? state.currentPositionBasicSalary
            : position.basic_salary,
          position_coefficient: state.currentPositionHeSoChucVu
            ? state.currentPositionHeSoChucVu
            : position.position_coefficient,
          responsibility_coefficient: state.currentPositionHeSoTrachNhiem
            ? state.currentPositionHeSoTrachNhiem
            : position.responsibility_coefficient
        })
        .then(async () => {
          await dispatch("fetchPositions");

          commit("setCurrentPositionName", null);
          commit("setCurrentPositionBasicSalary", null);
          commit("setCurrentPositionHeSoChucVu", null);
          commit("setCurrentPositionHeSoTrachNhiem", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async createPosition({ commit, state }) {
      return HTTP()
        .post("/position", {
          name: state.newPositionName,
          basic_salary: state.newPositionBasicSalary,
          position_coefficient: state.newPositionHeSoChucVu,
          responsibility_coefficient: state.newPositionHeSoTrachNhiem
        })
        .then(({ data }) => {
          commit("appendPosition", data);
          commit("setNewPositionName", null);
          commit("setNewPositionBasicSalary", null);
          commit("setNewPositionHeSoChucVu", null);
          commit("setNewPositionHeSoTrachNhiem", null);
        });
    },
    async deletePosition({ commit }, position) {
      return HTTP()
        .delete(`/position/${position.id}`)
        .then(res => {
          res.data
            ? commit("removePosition", position)
            : alert("Cannot delete because of a logical error!!");
        });
    }
  },
  getters: {},
  mutations: {
    // Edit
    setCurrentPositionName(state, name) {
      state.currentPositionName = name;
    },
    setCurrentPositionBasicSalary(state, positionBasicSalary) {
      state.currentPositionBasicSalary = positionBasicSalary;
    },
    setCurrentPositionHeSoChucVu(state, hesochucvu) {
      state.currentPositionHeSoChucVu = hesochucvu;
    },
    setCurrentPositionHeSoTrachNhiem(state, hesotrachnhiem) {
      state.currentPositionHeSoTrachNhiem = hesotrachnhiem;
    },

    // Create
    setNewPositionName(state, name) {
      state.newPositionName = name;
    },
    setNewPositionBasicSalary(state, positionBasicSalary) {
      state.newPositionBasicSalary = positionBasicSalary;
    },
    setNewPositionHeSoChucVu(state, hesochucvu) {
      state.newPositionHeSoChucVu = hesochucvu;
    },
    setNewPositionHeSoTrachNhiem(state, hesotrachnhiem) {
      state.newPositionHeSoTrachNhiem = hesotrachnhiem;
    },

    // Fetch
    setPositions(state, positions) {
      state.positions = positions;
    },

    // display
    appendPosition(state, position) {
      state.positions.results.push(position.data);
    },

    removePosition(state, position) {
      try {
        state.positions.results.splice(
          state.positions.results.findIndex(x => x === position),
          1
        );
      } catch (err) {
        console.log(err);
      }
    },

    setPositionsError(state, e) {
      state.errorPosition = e;
    },

    setEditMode(state, position) {
      Vue.set(position, "isEditMode", true);
    },
    unsetEditMode(state, position) {
      Vue.set(position, "isEditMode", false);
    }
  }
};
