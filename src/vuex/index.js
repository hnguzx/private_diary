import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {
            userId: '',
            userName: '',
            userBirthday: '',
            userSex: '',
            userPhone: '',
            userEmail: '',
            userHead: ''
        }
    },
    mutations: {
        updateUserInfo(state, payload) {
            state.userInfo = payload.data
        }
    },
    getters: {
        userInfo(state) {
            return state.userInfo
        }
    },
    actions: {},
    modules: {}
})

export default store