import createPersistedState from 'vuex-persistedstate';
// eslint-disable-next-line import/no-cycle
import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-cycle
import authentication from './auth/authentication';
// eslint-disable-next-line import/no-cycle
import user from './user/profile-user';
import permission from './user/permission';
import relation from './user/relation';
import labourcontract from './user/labourcontract';

import employees from './admin/employee'
import offices from './admin/office'
import positions from './admin/position'
import literacies from './admin/literacy'
import labourcontracts from './admin/labourcontract'
import insurrances from './admin/insurrance'
import relatives from './admin/relative'
import raps from './admin/rewardandpunishment'
import permissions from './admin/permission'

// eslint-disable-next-line import/no-cycle
// import projects from './projects';
// eslint-disable-next-line import/no-cycle
// import tasks from './tasks';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
  },
  modules: {
    authentication,
    user,
    permission,
    relation,
    labourcontract,

    employees,
    offices,
    positions,
    literacies,
    labourcontracts,
    insurrances,
    relatives,
    raps,
    permissions
    // projects,
    // tasks,
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    createPersistedState(),
  ],
});
