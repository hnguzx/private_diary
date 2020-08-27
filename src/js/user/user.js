import {ajaxRequest} from "network/request";


export function getVerifyCode(params) {
    return ajaxRequest({
        url: '/user/verifyCode/' + params.emailOrPhone,
        method: 'get'
    })
}

export function register(params) {
    return ajaxRequest({
        url: '/user/insertUser/' + params.verifyCode,
        method: 'post',
        data: params.user
    })
}

export function updatePassword(params) {
    return ajaxRequest({
        url: '/user/resetPassword/' + params.verifyCode,
        method: 'patch',
        data: params.user
    })
}

export function login(params) {
    return ajaxRequest({
        url: '/user/login',
        method: 'post',
        data: params
    })
}
