import {ajaxRequest} from "network/request";

export function login(params) {
    return ajaxRequest({
        url: '/user/user',
        method: 'post',
        data: params
    })
}