import {ajaxRequest} from "network/request";


export function getVerifyCode(params) {
    return ajaxRequest({
        url: '/user/getVerifyCode/' + params.emailOrPhone,
        method: 'get'
    })
}

export function register(params) {
    return ajaxRequest({
        url: '/user/insertUser',
        method: 'post',
        data: params
    })
}

export function updatePassword(params) {
    return ajaxRequest({
        url: '/user/updateUser',
        method: 'post',
        data: params
    })
}