/**
 * 从这里获取states中定义的全局变量
 * 这里接收的参数应该只作为条件，不要用这里的参数去改变states中的数据
 */
export default {
    userInfo: state => {
        return state.userInfo
    },
    webSocketIP: state => {
        return state.webSocketIP
    },
    token: state => {
        return state.token
    },
    stompClient: (state, getters) => {
        return state.stompClient
    }
}