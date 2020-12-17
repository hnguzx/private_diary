/**
 * 通过mutations改变states中的变量值，同步的函数
 * commit时，上传数据统一为data
 * 需要在对象上添加新属性是，可以使用Vue.set(Obj,'newProp','val'),或者使用新对象替换老对象state.obj = {...state.obj,newProp:val}
 */
export default {
    updateUserInfo(state, payload) {
        state.userInfo = payload.data
    },
    setStompClient(state, payload) {
        state.stompClient = payload.data
    },
    token(state, payload) {
        console.log('载荷为：');
        console.log(payload);
        state.token = payload.data
    },
    asyncAction: state => {
        console.log('同步调用方法！')
    },
    syncAction: state => {
        console.log('异步调用方法！')
    }
}