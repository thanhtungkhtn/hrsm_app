// import router from '../router';
import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import HTTP from '../../https';

export default {
  namespaced: true,
  state: {
    relations: [],
    newRelationName: null,
    newRelationship: null,
    currentRelationName: null,
    currentRelationship: null,

    newRelationError: null,
  },
  actions: {
    fetchRelation({ commit }) {
      return HTTP().get('/account/relative')
        .then(({ data }) => {
          commit('setRelations', data);
          // console.log(data)
        });
    },
    deleteRelation({ commit }, relation) {
      return HTTP().delete(`/account/relative/${relation.id}`)
        .then(() => {
          commit('removeRelation', relation);
        });
    },
    saveRelation({commit, state}, relation) {
      // console.log(relation)
      return HTTP().patch(`/account/relative/${relation.id}`, {
        name: state.currentRelationName ? state.currentRelationName : relation.name, //isMember ? "$2.00" : "$10.00"
        relationship: state.currentRelationship ? state.currentRelationship : relation.relationship,
      })
        .then(() => {
          commit('setCurrentRelationName', null);
          commit('setCurrentRelationship', null);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    createRelation({commit , state }) {
      // console.log(state.newRelationName)
      return HTTP().post('/account/relative', { // /account/relative
        name: state.newRelationName,
        relationship: state.newRelationship,
      })
        .then(() => {
          // commit('appendRelation', data.new_relative);
          commit('setNewRelationName', null);
          commit('setNewRelationship', null);
        });
    }
  },
  getters: {
  },
  mutations: {
    setCurrentRelation(state, relation) {
      state.currentRelation = relation;
    },

    setNewRelationName(state, name) {
      // console.log(name)
      state.newRelationName = name;
    },
    setNewRelationship(state, relationship) {
      // console.log(relationship)
      state.newRelationship = relationship;
    },

    setRelations(state, relation) {
      state.relations = relation;
    },
    appendRelation(state, relations) {
      state.relations.push(relations);
    },

    setCurrentRelationName(state,name ) {
      // console.log(name)
      state.currentRelationName = name;
    },
    setCurrentRelationship( state, relationship ) {
      // console.log(relationship)
      state.currentRelationship = relationship;
    },

    setEditMode(state, relation) {
      Vue.set(relation, 'isEditMode', true);
    },
    unsetEditMode(state, relation) {
      Vue.set(relation, 'isEditMode', false);
    },

    removeRelation(state, relation) {
      try {
        // console.log(state.relations);
        // console.log(relation);

        state.relations.results.splice(state.relations.results.findIndex(x => x === relation), 1);
      }
      catch(err) {
        console.log(err)
      }
    },
  },
};

