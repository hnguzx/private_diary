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
    webSocketIP:'localhost',
    token:{},
    stompClient:{}
};

export default state