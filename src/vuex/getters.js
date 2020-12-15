export default {
    userInfo: state => {
        return state.userInfo
    },
    webSocketIP: state => {
        return state.webSocketIP
    },
    chatEndPoint: state => {
        return state.chatEndPoint
    },
    userEndPoint: state => {
        return state.userEndPoint
    },
    token: state => {
        return state.token
    },
    stompClient: state => {
        return state.stompClient
    }
}