import Mock from 'mockjs'

const Random = Mock.Random

const apiResponse = function (code, msg, obj) {
    return {
        data: {
            code,
            msg,
            obj
        }
    }
}

Mock.mock(RegExp('/user/getVerifyCode/' + '.*'), 'get', apiResponse(200, 'success', {
    verifyCode: Random.integer(100000, 999999)
}))

Mock.mock(RegExp('/user/insertUser'), 'post', apiResponse(200, 'success', {
    userId: Random.increment(),
    userName: Random.cname(),
    userBirthday: Random.date('yyyy-MM-dd'),
    userSex: Random.pick(['男', '女']),
    userPassword: Random.string(8, 20),
    // userState: Random.pick(['已激活', '已注销', '未激活']),
    userPhone: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    userEmail: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
}))

Mock.mock(RegExp('/user/user'), 'post', apiResponse(200, 'success', {
    userId: Random.increment(),
    userName: Random.cname(),
    userBirthday: Random.date('yyyy-MM-dd'),
    userSex: Random.pick(['男', '女']),
    userPassword: Random.string(8, 20),
    // userState: Random.pick(['已激活', '已注销', '未激活']),
    userPhone: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    userEmail: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
}))

Mock.mock(RegExp('/user/updateUser'), 'post', apiResponse(200, 'success', {
    userId: Random.increment(),
    userName: Random.cname(),
    userPhone: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    userEmail: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
}))

Mock.mock(RegExp('/diary/uploadImg'), 'post', apiResponse(200, 'success', null))

Mock.mock(RegExp('/diary/insertDiary'), 'post', apiResponse(200, 'success', null))

Mock.mock(RegExp('/diary/getDiaryById'), 'post', apiResponse(200, 'success', {
    diaryId: Random.increment(),
    userName: Random.cname(),
    userBirthday: Random.date('yyyy-MM-dd'),
    userSex: Random.pick(['男', '女']),
    userPassword: Random.string(8, 20),
    // userState: Random.pick(['已激活', '已注销', '未激活']),
    userPhone: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    userEmail: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
}))

