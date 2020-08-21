import {ajaxRequest} from "network/request";

export function getDiaryDetail(params) {
    return ajaxRequest({
        url: '/diary/getDiaryById',
        method: 'post',
        data: params
    })
}