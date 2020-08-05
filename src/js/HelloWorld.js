import {ajaxRequest} from "../network/request";
/**
 *   @name:HelloWorld.js
 *   @auth:谷志雄
 *   @createTime:2020/8/6 0:32
 *   @updateTime:2020/8/6 0:32
 *   @desc:
 */
export function testQuest() {
    return ajaxRequest({
        url: 'request/index',
        method: 'get'
    })
}