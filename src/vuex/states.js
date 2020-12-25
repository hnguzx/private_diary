/**
 * 相当于定义的全局变量
 * 最好全部初始化好
 */
const state = sessionStorage.getItem('state')?JSON.parse(sessionStorage.getItem('state')) : {
    userInfo: {
        userId: '',
        userName: '',
        userBirthday: '',
        userSex: '',
        userPhone: '',
        userEmail: '',
        userHead: ''
    },
    friends:[],
    // webSocketIP:'127.0.0.1',
    webSocketIP:'180.76.58.205',
    token:{
        name:'bbb'
    },
    stompClient:{}
};

export default state