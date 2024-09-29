import api from "@/api/index";

const API_URL = 'http://auto_app.loc/api'


export default {
    login(params) {
        return api.post(API_URL + '/login', params)
    },

    profileMe() {
        return api.get(API_URL + '/userMe')
    },

    logout() {
        return api.post(API_URL + '/exit')
    },

    getModelsAll(page, brand) {
        // ?page=${params.page}&brand=${params.brand}
        return api.get(API_URL + `/models`, {
            params: {
                page,
                brand
            }
        })
    },

    getModelsForIdBrand(brandId) {
        return api.get(API_URL + `/models`, {
            params: {
                brand: brandId
            }
        })
    },

    getBrandForId(brandId) {
        return api.get(API_URL + `/models`, {
            params: {
                brand: brandId
            }
        })
    },

    getALlBrands() {
        return api.get(API_URL + `/brands`, {
            params: {
                all: true
            }
        })
    },
    setModelForId(setParams) {
        return api.put(API_URL + `/models/` + setParams.id,
            {
                name:setParams.name,
                attributes:{
                    steering_position: setParams.attributes.steering_position,
                    color: setParams.attributes.color
                },
                brandId: setParams.brand.id
            })
    },

    deleteModelForId(id) {
        return api.delete(API_URL + `/models/`+id)
    },

    addModel(params) {
        return api.post(API_URL + `/models/`, {
            name:params.name,
            attributes:{
                steering_position: params.attributes.steering_position,
                color: params.attributes.color
            },
            brandId: params.brand.id
        })
    }
}