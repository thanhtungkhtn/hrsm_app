// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    employees: [],
    currentEmployeeName: null,
    currentEmployeeGender: null,
    currentEmployeeDayOfBirth: null,
    currentEmployeePhoneNumber: null,
    currentEmployeeIdentityCardNumber: null,
    currentEmployeeNativePlace: null,
    currentEmployeeNationality: null,
    currentEmployeeEmail: null,
    currentEmployeeAddress: null,
    currentEmployeeMaritalStatus: null,
    currentEmployeeAvatar: null,
    currentEmployeeFingerprintImage: null,

    newEmployeeName: null,
    newEmployeeGender: null,
    newEmployeeDayOfBirth: null,
    newEmployeePhoneNumber: null,
    newEmployeeIdentityCardNumber: null,
    newEmployeeEmail: null,
    newEmployeeAddress: null,
    newEmployeeNativePlace: null,
    newEmployeeNationality: null,
    newEmployeeMaritalStatus: null,
    newEmployeeAvatar: null,
    newEmployeeFingerprintImage: null,

    errorEmployee: null,
  },
  actions: {
    async fetchEmployees({ commit }) {
      return HTTP().get('/employees')
        .then(({ data }) => {
          commit('setEmployees', data);
          commit('setEmployeesError', null);
          // console.log(data)
        })
        .catch(function (error) {
          if (error.response) {
            commit('setEmployees', null);
            commit('setEmployeesError', error.response.data.message);
            // console.log(error.response.data.message);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          }
        });
    },
    async saveEmployee({dispatch, commit, state}, employee) {
      // console.log(position)
      return HTTP().patch(`/employee/${employee.id}`, {
        // 'id',
        user_id: employee.user_id,
        permision_id: employee.permision_id,
        licensed: employee.licensed,

        name: state.currentEmployeeName ? state.currentEmployeeName : employee.name,
        gender: state.currentEmployeeGender ? state.currentEmployeeGender : employee.gender,
        day_of_birth: state.currentEmployeeDayOfBirth ? state.currentEmployeeDayOfBirth.substring(0, 10) : employee.day_of_birth.substring(0, 10),
        identity_card_number: state.currentEmployeeIdentityCardNumber ? state.currentEmployeeIdentityCardNumber : employee.identity_card_number,
        phone_number: state.currentEmployeePhoneNumber ? state.currentEmployeePhoneNumber : employee.phone_number,
        address: state.currentEmployeeAddress ? state.currentEmployeeAddress : employee.address,
        native_place: state.currentEmployeeNativePlace ? state.currentEmployeeNativePlace : employee.native_place,
        nationality: state.currentEmployeeNationality ? state.currentEmployeeNationality : employee.nationality,

        email: state.currentEmployeeEmail ? state.currentEmployeeEmail : employee.email,

        marital_status: state.currentEmployeeMaritalStatus ? state.currentEmployeeMaritalStatus : employee.marital_status,
        avatar: state.currentEmployeeAvatar ? state.currentEmployeeAvatar : employee.avatar,
        fingerprint_image: state.currentEmployeeFingerprintImage ? state.currentEmployeeFingerprintImage : employee.fingerprint_image,
      })
        .then(async () => {
          await dispatch('fetchEmployees')

          commit('setCurrentEmployeeName', null);
          commit('setCurrentEmployeeGender', null);
          commit('setCurrentEmployeeDayOfBirth', null);
          commit('setCurrentEmployeePhoneNumber', null);
          commit('setCurrentEmployeeIdentityCardNumber', null);
          commit('setCurrentEmployeeNationality', null);
          commit('setCurrentEmployeeEmail', null);
          commit('setCurrentEmployeeAddress', null);
          commit('setCurrentEmployeeNativePlace', null);
          commit('setCurrentEmployeeMaritalStatus', null);
          commit('setCurrentEmployeeAvatar', null);
          commit('setCurrentEmployeeFingerprintImage', null);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    async createEmployee({ commit, state }) {
      return HTTP().post('/employee', {

        // user_id: employee.user_id,
        // permision_id: employee.permision_id,
        // licensed: employee.licensed,
        name: state.newEmployeeName,
        gender: state.newEmployeeGender,
        day_of_birth: state.newEmployeeDayOfBirth,
        identity_card_number: state.newEmployeeIdentityCardNumber,
        phone_number: state.newEmployeePhoneNumber,
        native_place: state.newEmployeeNativePlace,
        nationality: state.newEmployeeNationality,

        address: state.newEmployeeAddress,
        email: state.newEmployeeEmail,
        marital_status: state.newEmployeeMaritalStatus,
        avatar: state.newEmployeeAvatar,
        fingerprint_image: state.newEmployeeFingerprintImage
      })
        .then(({ data }) => {
          commit('appendEmployee', data);

          commit('setNewEmployeeName', null);
          commit('setNewEmployeeGender', null);
          commit('setNewEmployeeDayOfBirth', null);
          commit('setNewEmployeePhoneNumber', null);
          commit('setNewEmployeeIdentityCardNumber', null);
          commit('setNewEmployeeEmail', null);
          commit('setNewEmployeeAddress', null);
          commit('setNewEmployeeNativePlace', null);
          commit('setNewEmployeeNationality', null);
          commit('setNewEmployeeMaritalStatus', null);
          commit('setNewEmployeeAvatar', null);
          commit('setNewEmployeeFingerprintImage', null);
        });
    },
    async deleteEmployee({commit}, employee) {

      return HTTP().delete(`/employee/${employee.id}`)
        .then((res) => {
          res.data ? commit('removeEmployee', employee) : alert("Cannot delete because of a logical error!!")
        });
    },
  },
  getters: {
  },
  mutations: {
    // Edit
    setCurrentEmployeeName(state, name) {
      state.currentEmployeeName = name;
    },
    setCurrentEmployeeGender(state, gender) {
      state.currentEmployeeGender = gender;
    },
    setCurrentEmployeeDayOfBirth(state, birth) {
      state.currentEmployeeDayOfBirth = birth;
    },
    setCurrentEmployeePhoneNumber(state, phone) {
      state.currentEmployeePhoneNumber = phone;
    },
    setCurrentEmployeeIdentityCardNumber(state, identity) {
      state.currentEmployeeIdentityCardNumber = identity;
    },
    setCurrentEmployeeNationality(state, nationality) {
      state.currentEmployeeNationality = nationality;
    },
    setCurrentEmployeeEmail(state, email) {
      state.currentEmployeeEmail = email;
    },
    setCurrentEmployeeAddress(state, address) {
      state.currentEmployeeAddress = address;
    },
    setCurrentEmployeeNativePlace(state, place) {
      state.currentEmployeeNativePlace = place;
    },
    setCurrentEmployeeMaritalStatus(state, status) {
      state.currentEmployeeMaritalStatus = status;
    },
    setCurrentEmployeeAvatar(state, avatar) {
      state.currentEmployeeAvatar = avatar;
    },
    setCurrentEmployeeFingerprintImage(state, image) {
      state.currentEmployeeFingerprintImage = image;
    },

    // Create
    setNewEmployeeName(state, name) {
      state.newEmployeeName = name;
    },
    setNewEmployeeGender(state, gender) {
      state.newEmployeeGender = gender;
    },
    setNewEmployeeDayOfBirth(state, birth) {
      state.newEmployeeDayOfBirth = birth;
    },
    setNewEmployeePhoneNumber(state, phone) {
      state.newEmployeePhoneNumber = phone;
    },
    setNewEmployeeIdentityCardNumber(state, identity) {
      state.newEmployeeIdentityCardNumber = identity;
    },
    setNewEmployeeEmail(state, nationality) {
      state.newEmployeeEmail = nationality;
    },
    setNewEmployeeAddress(state, email) {
      state.newEmployeeAddress = email;
    },
    setNewEmployeeNativePlace(state, address) {
      state.newEmployeeNativePlace = address;
    },
    setNewEmployeeNationality(state, place) {
      state.newEmployeeNationality = place;
    },
    setNewEmployeeMaritalStatus(state, status) {
      state.newEmployeeMaritalStatus = status;
    },
    setNewEmployeeAvatar(state, avatar) {
      state.newEmployeeAvatar = avatar;
    },
    setNewEmployeeFingerprintImage(state, image) {
      state.newEmployeeFingerprintImage = image;
    },

    // fetch
    setEmployees(state, employees) {
      state.employees = employees;
    },

    // display
    appendEmployee(state, employee) {
      state.employees.push(employee);
    },

    removeEmployee(state, employee) {
      try {
        state.employees.results.splice(state.employees.results.findIndex(x => x === employee), 1);
      }
      catch(err) {
        console.log(err)
      }
    },

    setEmployeesError(state, e) {
      state.errorEmployee = e;
    },

    setEditMode(state, employee) {
      Vue.set(employee, 'isEditMode', true);
    },
    unsetEditMode(state, employee) {
      Vue.set(employee, 'isEditMode', false);
    },
  },
};

