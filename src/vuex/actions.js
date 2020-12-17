/**
 * 调用mutations，不能直接变更state
 * 可以包含任意的异步调用
 * context与store具有相同的属性和方法
 */
import {login} from "../js/user/user";

export default {
    /*syncAction: context => {
        // context.states
        // context.getters
        console.log('在actions中进行调用');
        context.commit('syncAction')
    },*/
    // 对象的解构
    /*syncAction: ({commit}) => {
        console.log('在actions中进行调用');
        commit('syncAction')
    },*/
    syncAction: ({commit},payload) => {
        console.log('在actions中进行调用');
        debugger
        console.log(payload.data);
        commit('syncAction');
        login().then(data=>{

        }).catch(err=>{

        })
    }

}