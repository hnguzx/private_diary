export default {
    updateUserInfo(state, payload) {
        state.userInfo = payload.data
    },
    setStompClient(state, payload) {
        state.stompClient = payload.data
    }
}