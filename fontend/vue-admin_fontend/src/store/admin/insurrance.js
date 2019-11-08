// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    insurrances: [],

    currentInsurranceType: null,
    currentInsurranceCardNumber: null,
    currentInsurranceInsuredValue: null,
    currentInsurranceDayOfIssue: null,
    currentInsurranceExpirationDate: null,
    currentInsurrancePlaceOfIssue: null,

    newInsurranceType: null,
    newInsurranceCardNumber: null,
    newInsurranceInsuredValue: null,
    newInsurranceDayOfIssue: null,
    newInsurranceExpirationDate: null,
    newInsurrancePlaceOfIssue: null,

    errorInsurrance: null,
  },
  actions: {
    async fetchInsurrances({ commit }) {
      return HTTP().get('/insurrances')
        .then(({ data }) => {
          commit('setInsurrances', data);
          commit('setInsurrancesError', null);
          // console.log(data)
        })
        .catch(function (error) {
          if (error.response) {
            commit('setInsurrances', null);
            commit('setInsurrancesError', error.response.data.message);
            // console.log(error.response.data.message);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          }
        });
    },
    async saveInsurrance({dispatch, commit, state}, insurrance) {
      // console.log(position)
      return HTTP().patch(`/insurrance/${insurrance.id}`, {
        type: state.currentInsurranceType ? state.currentInsurranceType : insurrance.type,
        card_number: state.currentInsurranceCardNumber ? state.currentInsurranceCardNumber : insurrance.card_number,
        insurance_money: state.currentInsurranceInsuredValue ? state.currentInsurranceInsuredValue : insurrance.insurance_money,
        day_of_issue: state.currentInsurranceDayOfIssue ? state.currentInsurranceDayOfIssue.substring(0, 10) : insurrance.day_of_issue.substring(0, 10),
        expiration_date: state.currentInsurranceExpirationDate ? state.currentInsurranceExpirationDate.substring(0, 10) : insurrance.expiration_date.substring(0, 10),
        place_of_issue: state.currentInsurrancePlaceOfIssue ? state.currentInsurrancePlaceOfIssue : insurrance.place_of_issue,
       })
        .then(async () => {
          await dispatch('fetchInsurrances')

          commit('setCurrentInsurranceType', null);
          commit('setCurrentInsurranceCardNumber', null);
          commit('setCurrentInsurranceMoney', null);
          commit('setCurrentInsurranceDayOfIssue', null);
          commit('setCurrentInsurranceExpirationDate', null);
          commit('setCurrentInsurrancePlaceOfIssue', null);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    async createInsurrance({ commit, state }) {
      return HTTP().post('/insurrance', {
        type: state.newInsurranceType,
        card_number: state.newInsurranceCardNumber,
        insurance_money: state.newInsurranceInsuredValue,
        day_of_issue: state.newInsurranceDayOfIssue,
        expiration_date: state.newInsurranceExpirationDate,
        place_of_issue: state.newInsurrancePlaceOfIssue
      })
        .then(({ data }) => {
          commit('appendInsurrance', data);

          commit('setNewInsurranceType', null);
          commit('setNewInsurranceCardNumber', null);
          commit('setNewInsurranceInsuredValue', null);
          commit('setNewInsurranceDayOfIssue', null);
          commit('setNewInsurranceExpirationDate', null);
          commit('setNewInsurrancePlaceOfIssue', null);

        });
    },
    async deleteInsurrance({commit}, insurrance) {
      return HTTP().delete(`/insurrance/${insurrance.id}`)
        .then((res) => {
          res.data ? commit('removeInsurrance', insurrance) : alert("Cannot delete because of a logical error!!")
        });
    },
  },
  getters: {
  },
  mutations: {
    // Edit
    setCurrentInsurranceType(state, type ) {
      state.currentInsurranceType = type;
    },
    setCurrentInsurranceCardNumber(state,  cardnumber) {
      state.currentInsurranceCardNumber = cardnumber;
    },
    setCurrentInsurranceMoney(state,  money) {
      state.currentInsurranceInsuredValue = money;
    },
    setCurrentInsurranceDayOfIssue(state,  day_of_issue) {
      state.currentInsurranceDayOfIssue = day_of_issue;
    },
    setCurrentInsurranceExpirationDate(state,  expiration_date) {
      state.currentInsurranceExpirationDate = expiration_date;
    },
    setCurrentInsurrancePlaceOfIssue(state,  place_of_issue) {
      state.currentInsurrancePlaceOfIssue = place_of_issue;
    },

    // Create
    setNewInsurranceType(state, type ) {
      state.newInsurranceType = type;
    },
    setNewInsurranceCardNumber(state, card_number ) {
      state.newInsurranceCardNumber = card_number;
    },
    setNewInsurranceInsuredValue(state, insurance_money ) {
      state.newInsurranceInsuredValue = insurance_money;
    },
    setNewInsurranceDayOfIssue(state, day_of_issue ) {
      state.newInsurranceDayOfIssue = day_of_issue;
    },
    setNewInsurranceExpirationDate(state, expiration_date ) {
      state.newInsurranceExpirationDate = expiration_date;
    },
    setNewInsurrancePlaceOfIssue(state, place_of_issue ) {
      state.newInsurrancePlaceOfIssue = place_of_issue;
    },

    // fetch
    setInsurrances(state, insurrances) {
      state.insurrances = insurrances;
    },

    // display
    appendInsurrancee(state, insurrance) {
      state.insurrances.push(insurrance);
    },

    removeInsurrance(state, position) {
      try {
        state.insurrances.results.splice(state.insurrances.results.findIndex(x => x === position), 1);
      }
      catch(err) {
        console.log(err)
      }
    },

    setInsurrancesError(state, e) {
      state.errorInsurrance = e;
    },

    setEditMode(state, insurrance) {
      Vue.set(insurrance, 'isEditMode', true);
    },
    unsetEditMode(state, insurrance) {
      Vue.set(insurrance, 'isEditMode', false);
    },
  },
};

