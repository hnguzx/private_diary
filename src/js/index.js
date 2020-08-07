import {ajaxRequest} from "../network/request";


export function getVerifyCode(params) {
    return ajaxRequest({
        url: '/user/getVerifyCode',
        method: 'post',
        data: params
    })
}

export function register() {

}