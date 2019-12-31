// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    bangchamcongs: null,
    bangcongs: null,

    currentCongEmployeeId: null,
    currentCongDate: null,
    currentCongCheckIn: null,
    currentCongCheckOut: null,
    currentCongDateWork: null,

    currentBangCongEmployeeId: null,
    currentBangCongDateWork: null,
    currentBangCongMonthWork: null

  },
  actions: {
    async fetchBangChamCongs({ commit }) {
      return HTTP().get('/cg')
        .then(({ data }) => {
          commit('setBangChamCongs', data);
          // console.log(data)
        });
    },
    async fetchBangCongs({ commit }) {
      return HTTP().get('/bcg')
        .then(({ data }) => {
          commit('setBangCongs', data);
          // console.log(data)
        });
    },

    async saveBangChamCong({dispatch, commit, state}, cong) {
      // console.log(cong)
      return HTTP().patch(`/cg/${cong.id}`, {
        employee_id: state.currentCongEmployeeId ? state.currentCongEmployeeId : cong.employee_id,
        date: state.currentCongDate ? state.currentCongDate : cong.date,
        check_in: state.currentCongCheckIn ? state.currentCongCheckIn : cong.check_in,
        check_out: state.currentCongCheckOut ? state.currentCongCheckOut : cong.check_out,
        date_work: state.currentCongDateWork ? state.currentCongDateWork : cong.date_work,
      })
        .then( async () => {
          await dispatch('fetchBangChamCongs')

          commit('setCurrentCongDate', null);
          commit('setCurrentCongCheckIn', null);
          commit('setCurrentCongCheckOut', null);
          commit('setCurrentCongDateWork', null);

        })
        .catch((err) => {
          console.log(err)
        });
    },

    async saveBangCong({dispatch, commit, state}, bcong) {
      // console.log(position)
      return HTTP().patch(`/bcg/${bcong.id}`, {

        employee_id: state.currentBangCongEmployeeId ? state.currentBangCongEmployeeId : bcong.employee_id,
        date_work: state.currentBangCongDateWork ? state.currentBangCongDateWork : bcong.date_work,
        months_work: state.currentBangCongMonthWork ? state.currentBangCongMonthWork : bcong.months_work,
      })
        .then( async () => {
          await dispatch('fetchBangCongs')

          commit('setCurrentBangCongMonthWork', null);
          commit('setCurrentBangCongDateWork', null);
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
  getters: {
  },
  mutations: {
    setBangChamCongs(state, bangchamcongs) {
      state.bangchamcongs = bangchamcongs;
    },
    setBangCongs(state, bangcongs) {
      state.bangcongs = bangcongs;
    },

    setCurrentCongDate(state, date ) {
      state.currentCongDate = date;
    },
    setCurrentCongCheckIn(state, check_in ) {
      state.currentCongCheckIn = check_in;
    },
    setCurrentCongCheckOut(state, check_out ) {
      state.currentCongCheckOut = check_out;
    },
    setCurrentCongDateWork(state, date_work) {
      // console.log(date_work)
      state.currentCongDateWork = date_work;
    },

    setCurrentBangCongDateWork (state, date_work ) {
      state.currentBangCongDateWork = date_work;
    },
    setCurrentBangCongMonthWork(state, months_work ) {
      state.currentBangCongMonthWork = months_work;
    },

    setEditMode(state, congs) {
      Vue.set(congs, 'isEditMode', true);
    },
    unsetEditMode(state, congs) {
      Vue.set(congs, 'isEditMode', false);
    },
    // removeContact(state, contact) {
    //   state.contacts.splice(state.contacts.indexOf(contact), 1);
    // },
  },
};

