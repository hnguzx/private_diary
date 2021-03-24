import {ajaxRequest} from "network/request";
import qs from "qs";


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
        headers:{
            'Content-type': 'application/x-www-form-urlencoded'
        },
        url: '/login',
        method: 'post',
        data: qs.stringify(params)
    })
}

export function logout(params) {
    return ajaxRequest({
        headers:{
            'Content-type': 'application/x-www-form-urlencoded'
        },
        url: '/logout',
        method: 'post',
        data:qs.stringify(params)
    })
}
