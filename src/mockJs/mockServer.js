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

Mock.mock('/user/getVerifyCode', 'post', apiResponse(200, 'success', {
    verifyCode: Random.integer(100000, 999999)
}))