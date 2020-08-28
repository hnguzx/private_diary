import {ajaxRequest} from "network/request";

export function getDiaryDetail(params) {
    return ajaxRequest({
        url: '/diary/getDiaryById',
        method: 'post',
        data: params
    })
}

export function getDiaryList(params) {
    if (params.diarySearch == '' || params.diarySearch == undefined){
        return ajaxRequest({
            url: '/diary/' + params.userId + '/' + params.start + '/' + params.size,
            method: 'get'
        })
    }
    return ajaxRequest({
        url: '/diary/' + params.userId + '/' + params.start + '/' + params.size + '/' + params.diarySearch,
        method: 'get'
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