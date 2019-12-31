// import router from '../router';
import Vue from "vue";
// eslint-disable-next-line import/no-cycle
import HTTP from "../../https";

export default {
  namespaced: true,
  state: {
    permissions: [],
    newPermissionName: null,
    currentPermissionName: null,

    currentPermissionDetailActionName: null,
    currentPermissionDetailActionCode: null,
    currentPermissionDetailCheckAction: null,

    errorPermission: null
  },
  actions: {
    async fetchPermissions({ commit }) {
      return HTTP()
        .get("/permissions")
        .then(({ data }) => {
          commit("setPermissions", data);
          commit("setPermissionsError", null);
          // console.log(data)
        })
        .catch(function(error) {
          if (error.response) {
            commit("setPermissions", null);
            commit("setPermissionsError", error.response.data.message);
          }
        });
    },
    async createPermission({ commit, state }) {
      return HTTP()
        .post("/permission", {
          name_per: state.newPermissionName
        })
        .then(({ data }) => {
          commit("appendPermission", data);
          commit("setNewPermissionName", null);
        });
    },
    async savePermission({ dispatch, commit, state }, permission) {
      // console.log(permission)
      return HTTP()
        .patch(`/permission/${permission.id}`, {
          name_per: state.currentPermissionName
            ? state.currentPermissionName
            : permission.name //isMember ? "$2.00" : "$10.00"
        })
        .then(async () => {
          await dispatch("fetchPermissions");

          commit("setCurrentPermissionName", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async deletePermission({ commit }, permission) {
      return HTTP()
        .delete(`/permission/${permission.id}`)
        .then(res => {
          res.data
            ? commit("removePermission", permission)
            : alert("Cannot delete because of a logical error!!");
        });
    },

    //  Permission Detail
    async savePermissionDetail({ dispatch, commit, state }, permission_detail) {
      return HTTP()
        .patch(`/perdet/${permission_detail.id}`, {
          action_name: state.currentPermissionDetailActionName
            ? state.currentPermissionDetailActionName
            : permission_detail.action_name,
          action_code: state.currentPermissionDetailActionCode
            ? state.currentPermissionDetailActionCode
            : permission_detail.action_code,
          check_action: state.currentPermissionDetailCheckAction
            ? state.currentPermissionDetailCheckAction
            : permission_detail.check_action
        })
        .then(async () => {
          await dispatch("fetchPermissions");

          commit("setCurrentPermissionDetailActionName", null);
          commit("setCurrentPermissionDetailActionCode", null);
          commit("setCurrentPermissionDetailCheckAction", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async deletePermissionDetail({ commit }, permission_detail) {
      return HTTP()
        .delete(`/perdet/${permission_detail.id}`)
        .then(res => {
          res.data
            ? commit("removePermissionDetail", permission_detail)
            : alert("Cannot delete because of a logical error!!");
        });
    }
  },
  getters: {},
  mutations: {
    setNewPermissionName(state, name) {
      state.newPermissionName = name;
    },
    setPermissions(state, permissions) {
      state.permissions = permissions;
    },
    appendPermission(state, permission) {
      alert(permission.status);
      state.permissions.results.push(permission.data);
    },

    setCurrentPermissionName(state, name) {
      console.log(name);
      state.currentPermissionName = name;
    },

    setCurrentPermissionDetailActionName(state, action_name) {
      state.currentPermissionDetailActionName = action_name;
    },
    setCurrentPermissionDetailActionCode(state, action_code) {
      state.currentPermissionDetailActionCode = action_code;
    },
    setCurrentPermissionDetailCheckAction(state, check_action) {
      state.currentPermissionDetailCheckAction = check_action;
    },

    setEditMode(state, permission) {
      Vue.set(permission, "isEditMode", true);
    },
    unsetEditMode(state, permission) {
      Vue.set(permission, "isEditMode", false);
    },

    // Delete
    removePermission(state, permission) {
      try {
        state.permissions.results.splice(
          state.permissions.results.findIndex(x => x === permission),
          1
        );
      } catch (err) {
        console.log(err);
      }
    },

    removePermissionDetail(state, permission_detail) {
      try {
        state.permissions.results.map(x => {
          x.permisionDetail.splice(
            x.permisionDetail.findIndex(x => x === permission_detail),
            1
          );
        });
      } catch (err) {
        console.log(err);
      }
    },

    setPermissionsError(state, e) {
      state.errorPermission = e;
    }
  }
};
