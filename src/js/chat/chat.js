export function addFriend(params) {
    return ajaxRequest({
        url: '/friend/add',
        method: 'post',
        data: params
    })
}