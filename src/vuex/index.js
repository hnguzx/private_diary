import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters";

Vue.use(Vuex)

const state = {
    userInfo: {
        userId: '',
        userName: '',
        userBirthday: '',
        userSex: '',
        userPhone: '',
        userEmail: '',
        userHead: ''
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {}
})

export default store