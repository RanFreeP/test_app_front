import Vue from 'vue'
import Vuex from 'vuex'
import repository from "@/api/repository";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: {
      state: () => ({
        user: sessionStorage.token ? JSON.parse(sessionStorage.getItem('token')) : null,
        profileMe: '',
        role: [],
        rights: [],
      }),
      getters: {
        user: state => state.user,
        authenticated: state => state.user !== null,
        profileMe: state => state.profileMe,
        role: state => state.role,
        rights: state => state.rights,
      },
      mutations: {
        SET_USER(state, user) {
          state.user = user;
        },
        SET_PROFILE_ME(state, profileMe) {
          state.profileMe = profileMe;
        },
        SET_ROLE_ME(state, roles) {
          if (roles) {
            state.role = Object.entries(roles).map((arr) => ({
              id: arr[0],
              name: arr[1],
              priority: arr[2],
            }));
          } else
            state.role = roles
        },
        SET_RIGHTS_ME(state, rights) {
            state.rights = rights
        }
      },
      actions: {
        async login({commit}, user) {
          const {data} = await repository.login(user);
          commit('SET_USER','Bearer '+data.token);

          sessionStorage.token = JSON.stringify('Bearer '+data.token);

          if(data) {
            const {data} = await repository.profileMe();
            commit('SET_PROFILE_ME',data.userProfile);
            commit('SET_ROLE_ME',data.userProfile.roles);
            commit('SET_RIGHTS_ME',data.userProfile.right);
          }
        },
        async logout({commit}) {
          commit('SET_USER',null);
          commit('SET_PROFILE_ME',null);
          commit('SET_ROLE_ME',null);
          commit('SET_RIGHTS_ME',null);
          sessionStorage.removeItem('token');
          //await repository.logout();
        },
        async profileMe({commit}) {
          const {data} = await repository.profileMe();
          if (data && data.userProfile) {
            commit('SET_PROFILE_ME',data.userProfile);
            commit('SET_ROLE_ME',data.userProfile.roles);
            commit('SET_RIGHTS_ME',data.userProfile.right);
          }
        }
      },
    },
    users: {
      state: () => ({
        users: [],
        userForId: [],
      }),
      getters: {
        users: state => state.users,
        userForId: state => state.userForId,
      },
      mutations: {
        SET_USERS_ALL(state, users) {
            state.users = users
        },
        SET_USERS_FOR_ID(state, user) {
          state.userForId = user
        }
      },
      actions: {
        async getAllUsers({commit}) {
          const {data} = await repository.getUsersAll();
          if (data) {
            commit('SET_USERS_ALL',data.users);
          }
        },
        async getUserForId({commit}, id) {
          const {data} = await repository.getUserForId(id);
          if (data) {
            commit('SET_USERS_FOR_ID',data.user);
          }
        }
      },
    },
    bids: {
      state: () => ({
        bids: [],
      }),
      getters: {
        bids: state => state.bids,
      },
      mutations: {
        SET_BIDS(state, bids) {
          state.bids = bids
        },
      },
      actions: {
        async getBids({commit},type) {
          const {data} = await repository.getBids(type);
          if (data) {
            commit('SET_BIDS',data.bids);
          }
        },
      },
    },
    bidsDeleted: {
      state: () => ({
        bidsDeleted: [],
      }),
      getters: {
        bidsDeleted: state => state.bidsDeleted,
      },
      mutations: {
        SET_BIDS_DELETED(state, bids) {
          state.bidsDeleted = bids
        },
      },
      actions: {
        async getBidsDeleted({commit}) {
          const {data} = await repository.getBidsDeleted();
          if (data) {
            commit('SET_BIDS_DELETED',data);
          }
        },
      },
    },
    documentCarAll: {
      state: () => ({
        documentCarAll: [],
      }),
      getters: {
        documentCarAll: state => state.documentCarAll,
      },
      mutations: {
        SET_DOCUMENT_CAR_ALL(state, documentCar) {
          state.documentCarAll = documentCar
        },
      },
      actions: {
        async getDocumentCarAll({commit}) {
          const {data} = await repository.getDocumentCarAll();
          if (data) {
            commit('SET_DOCUMENT_CAR_ALL',data.carDocuments);
          }
        },
      },
    },
    documentCarReviewed: {
      state: () => ({
        documentCarReviewed: [],
      }),
      getters: {
        documentCarReviewed: state => state.documentCarReviewed,
      },
      mutations: {
        SET_DOCUMENT_CAR_REVIEWED(state, documentCar) {
          state.documentCarReviewed = documentCar
        },
      },
      actions: {
        async getDocumentCarReviewed({commit}) {
          const {data} = await repository.getDocumentCarReviewed();
          if (data) {
            commit('SET_DOCUMENT_CAR_REVIEWED',data.carDocuments);
          }
        },
      },
    },
    documentCarUnReviewed: {
      state: () => ({
        documentCarUnReviewed: [],
      }),
      getters: {
        documentCarUnReviewed: state => state.documentCarUnReviewed,
      },
      mutations: {
        SET_DOCUMENT_CAR_REVIEWED(state, documentCar) {
          state.documentCarUnReviewed = documentCar
        },
      },
      actions: {
        async getDocumentCarUnReviewed({commit}) {
          const {data} = await repository.getDocumentCarUnReviewed();
          if (data) {
            commit('SET_DOCUMENT_CAR_REVIEWED',data.carDocuments);
          }
        },
      },
    }
  }

})
