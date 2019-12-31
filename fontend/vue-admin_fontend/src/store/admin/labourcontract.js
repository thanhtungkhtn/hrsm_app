// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    labourcontracts: [],

    currentLabourContractPosition: null,
    currentLabourContractOffice: null,
    currentLabourContractSalary: null,
    currentLabourContractLiteracy: null,
    currentLabourContractInsurranceEmployeeID: null,

    errorLabourContract: null
  },
  actions: {
    async fetchLabourContracts({ commit }) {
      try {
        return HTTP()
          .get("/lcontracts")
          .then(({ data }) => {
            commit("setLabourContracts", data);
            commit("setLabourContractsError", null);
            // console.log(data)
          })
          .catch(function(error) {
            if (error.response) {
              commit("setLabourContracts", null);
              commit("setLabourContractsError", error.response.data.message);
            }
          });
      } catch (error) {
        alert("Cannot find database row for Labour Contract");
      }
    },
    async saveLabourContract({ dispatch, commit, state }, labourcontract) {
      // console.log(position)
      return HTTP()
        .patch(`/labourcontract/${labourcontract.id}`, {
          position_id: state.currentLabourContractPosition
            ? state.currentLabourContractPosition
            : labourcontract.position_id,
          office_id: state.currentLabourContractOffice
            ? state.currentLabourContractOffice
            : labourcontract.office_id,
          salary_id: state.currentLabourContractSalary
            ? state.currentLabourContractSalary
            : labourcontract.salary_id,
          literacy_id: state.currentLabourContractLiteracy
            ? state.currentLabourContractLiteracy
            : labourcontract.literacy_id,
          insurrance_employee_id: state.currentLabourContractInsurranceEmployeeID
            ? state.currentLabourContractInsurranceEmployeeID
            : labourcontract.insurrance_employee_id
        })
        .then(async () => {
          await dispatch("fetchLabourContracts");

          commit("setCurrentLabourContractPosition", null);
          commit("setCurrentLabourContractOffice", null);
          commit("setCurrentLabourContractSalary", null);
          commit("setCurrentLabourContractLiteracy", null);
          commit("setCurrentLabourContractInsurranceEmployeeID", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async deleteLabourContract({ commit }, labourcontract) {
      return HTTP()
        .delete(`/labourcontract/${labourcontract.id}`)
        .then(res => {
          // console.log(res)
          res.data
            ? commit("removeLabourContract", labourcontract)
            : alert("Cannot delete because of a logical error!!");
        });
    }
  },
  getters: {},
  mutations: {
    setCurrentLabourContractPosition(state, position) {
      state.currentLabourContractPosition = position;
    },
    setCurrentLabourContractOffice(state, office) {
      state.currentLabourContractOffice = office;
    },
    setCurrentLabourContractSalary(state, salary) {
      state.currentLabourContractSalary = salary;
    },
    setCurrentLabourContractLiteracy(state, literacy) {
      state.currentLabourContractLiteracy = literacy;
    },
    setCurrentLabourContractInsurranceEmployeeID(state, insurranceEmployee) {
      state.currentLabourContractInsurranceEmployeeID = insurranceEmployee;
    },

    setLabourContracts(state, labourcontracts) {
      state.labourcontracts = labourcontracts;
    },

    appendLabourContract(state, labourcontract) {
      state.labourcontracts.push(labourcontract);
    },

    removeLabourContract(state, labourcontract) {
      try {
        state.labourcontracts.results.splice(
          state.labourcontracts.results.findIndex(x => x === labourcontract),
          1
        );
        console.log("delele succeed");
      } catch (err) {
        console.log(err);
      }
    },

    setLabourContractsError(state, e) {
      state.errorLabourContract = e;
    },

    setEditMode(state, labourcontract) {
      Vue.set(labourcontract, "isEditMode", true);
    },
    unsetEditMode(state, labourcontract) {
      Vue.set(labourcontract, "isEditMode", false);
    }
  }
};
