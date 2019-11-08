// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    rewardandpunishments: [],

    errorRewardAndPunishments: null,
  },
  actions: {
    fetchRewardAndPunishments({ commit }) {
      return HTTP().get('/raps')
        .then(({ data }) => {
          commit('setRewardAndPunishments', data);
          commit('setRewardAndPunishmentsError', null);
          // console.log(data)
        })
        .catch(function (error) {
          if (error.response) {
            commit('setRewardAndPunishments', null);
            commit('setRewardAndPunishmentsError', error.response.data.message);
            // console.log(error.response.data.message);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          }
        });
    },
  },
  getters: {
  },
  mutations: {
    setRewardAndPunishments(state, rewardandpunishments) {
      state.rewardandpunishments = rewardandpunishments;
    },
    appendEmployee(state, rewardandpunishment) {
      state.rewardandpunishments.push(rewardandpunishment);
    },
    setEditMode(state, rewardandpunishment) {
      Vue.set(rewardandpunishment, 'isEditMode', true);
    },
    unsetEditMode(state, rewardandpunishment) {
      Vue.set(rewardandpunishment, 'isEditMode', false);
    },

    setRewardAndPunishmentsError(state, e) {
      state.errorRewardAndPunishments = e;
    },
  },
};

