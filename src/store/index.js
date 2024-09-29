import {createStore} from "vuex"
import repository from "@/api/repository";

const store = createStore({
    modules: {
        auth: {
            state: () => ({
                user: sessionStorage.token ? JSON.parse(sessionStorage.getItem('token')) : null,
                profileMe: {
                    roles: sessionStorage.token ? JSON.parse(sessionStorage.getItem('userName')) : [],
                    username: sessionStorage.token ? JSON.parse(sessionStorage.getItem('userRoles')) : null,
                }
            }),
            getters: {
                user: state => state.user,
                authenticated: state => state.user !== null,
                profileMe: state => state.profileMe,
            },
            mutations: {
                SET_USER(state, user) {
                    state.user = user;
                },
                SET_PROFILE_ME(state, profileMe) {
                    state.profileMe = profileMe;
                },
            },
            actions: {
                async login({commit}, user) {
                    const {data} = await repository.login(user);
                    commit('SET_USER', 'Bearer ' + data.token);

                    sessionStorage.token = JSON.stringify('Bearer ' + data.token);

                    if(data.token) {
                        const {data} = await repository.profileMe();
                        commit('SET_PROFILE_ME',data.body);

                        sessionStorage.userName = JSON.stringify(data.body.roles);
                        sessionStorage.userRoles = JSON.stringify(data.body.username);
                    }
                },
                async logout({commit}) {
                    commit('SET_USER', null);
                    commit('SET_PROFILE_ME', {roles: [],username:null});
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('userName');
                    sessionStorage.removeItem('userRoles');
                    //await repository.logout();
                },

            },
        },
        modelsNoteAll: {
            state: () => ({
                modelsNoteAll: [],
            }),
            getters: {
                modelsNoteAll: state => state.modelsNoteAll,
            },
            mutations: {
                SET_MODELS_ALL(state, models) {
                    state.modelsNoteAll = models
                },
            },
            actions: {
                async getModelsNoteAll({commit}, page, brand) {
                    const {data} = await repository.getModelsAll(page, brand);
                    if (data) {
                        commit('SET_MODELS_ALL', data);
                    }
                },
            },
        },
        models: {
            state: () => ({
                modelsForIdBrand: [],
            }),
            getters: {
                modelsForIdBrand: state => state.modelsForIdBrand,
            },
            mutations: {
                SET_MODELS_FOR_ID_BRAND(state, models) {
                    state.modelsForIdBrand = models
                },
            },
            actions: {
                async modelForIdBrand({commit}, id) {
                    const {data} = await repository.getModelsForIdBrand(id);
                    if (data) {
                        commit('SET_MODELS_FOR_ID_BRAND', data);
                    }
                },
            },
        },
        brands: {
            state: () => ({
                brandForId: [],
                brandAll: [],
                modelForId: []
            }),
            getters: {
                brandForId: state => state.brandForId,
                brandAll: state => state.brandAll,
            },
            mutations: {
                SET_BRAND_FOR_ID(state, brand) {
                    state.brandForId = brand
                },
                SET_ALL_BRANDS(state, brands) {
                    state.brandAll = brands
                },
                SET_MODEL_FOR_ID(state, model) {
                    state.modelForId = model
                },
            },
            actions: {
                async getBrandForId({commit}, id) {
                    const {data} = await repository.getBrandForId(id);
                    if (data) {
                        commit('SET_BRAND_FOR_ID', data.body);
                    }
                },
                async getALlBrands({commit}) {
                    const {data} = await repository.getALlBrands();
                    if (data) {
                        commit('SET_ALL_BRANDS', data.body);
                    }
                },
                async setModelForId({commit}, params) {
                    const {data} = await repository.setModelForId(params);

                    if (data) {
                        commit('SET_MODEL_FOR_ID',data.body);
                    }
                },
            }
        }
    }

})
export default store