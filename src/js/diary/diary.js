import {ajaxRequest} from "network/request";

export function getDiaryDetail(params) {
    return ajaxRequest({
        url: '/diary/getDiaryById',
        method: 'post',
        data: params
    })
}

export function getDiaryList(params) {
    return ajaxRequest({
        url: '/diary/' + params.userId + '/' + params.diarySearch,
        method: 'get',
        data: params
    })
}

export function saveDiary(params) {
    return ajaxRequest({
        url: '/diary/insertDiary',
        method: 'post',
        data: params,
        contentType: false,
        processData: false
    })
}