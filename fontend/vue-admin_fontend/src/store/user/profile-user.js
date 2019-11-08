// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    user: null,
    userPhoneNumber: null,
    userAddress: null,
    userMaritalStatus: null,
    userAvatar: null,
    userFingerprintImage: null,

    userError: null
  },
  actions: {
    async fetchUser({ commit }) {
      return HTTP().get('/account')
        .then(({ data }) => {
          commit('setUser', data);
          // console.log(data)
        })
        .catch(error => {
          console.log(error.response)
      });
    },
    async saveUser({dispatch, commit, state}, user) {
      // console.log(user.avatar)
      return HTTP().patch(`/account`, {
        phone_number: state.userPhoneNumber ? state.userPhoneNumber : user.phone_number,
        address: state.userAddress ? state.userAddress : user.address,
        marital_status: state.userMaritalStatus ? state.userMaritalStatus : user.marital_status,
        avatar: state.userAvatar ? state.userAvatar : user.avatar,
        fingerprint_image: state.userFingerprintImage ? state.userFingerprintImage : user.fingerprint_image,
      })
        .then( async () => {
          // 1. user edit => auto display update => ok
          // 2. admin => no
          await dispatch('fetchUser')
          commit('setUserPhoneNumber', null);
          commit('setUserAddress', null);
          commit('setUserMaritalStatus', null);
          commit('setUserAvatar', null);
          commit('setUserFingerprintImage', null);
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setUserEmail(state, { user, email }) {
      user.email = email;
    },

    setUserPhoneNumber(state, userPhoneNumber ) {
      // console.log(userPhoneNumber)
      state.userPhoneNumber = userPhoneNumber;
    },
    setUserAddress(state, userAddress ) {
      // console.log(userAddress)
      state.userAddress = userAddress;
    },
    setUserMaritalStatus(state, userMaritalStatus ) {
      // console.log(userMaritalStatus)
      state.userMaritalStatus = userMaritalStatus;
    },
    setUserAvatar(state, userAvatar ) {
      // console.log(userAvatar)
      state.userAvatar = userAvatar;
    },
    setUserFingerprintImage(state, userFingerprintImage ) {
      // console.log(userFingerprintImage)
      state.userFingerprintImage = userFingerprintImage;
    },

    setEditMode(state, user) {
      Vue.set(user, 'isEditMode', true);
    },
    unsetEditMode(state, user) {
      Vue.set(user, 'isEditMode', false);
    },
  },
};
