// socket功能
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import store from "../vuex";

export function connectionSocket(connectionEndPoint, sendServeEndPoint) {
    let socket = new SockJS('http://' + store.getters.webSocketIP + connectionEndPoint);//连接SockJS的endpoint名称为"bullet"
    console.log('socket连接地址：' + 'http://' + store.getters.webSocketIP + connectionEndPoint);
    // 获取STOMP子协议的客户端对象
    let stompClient = Stomp.over(socket);
    // 定义客户端的认证信息,按需求配置
    let headers = {
        Authorization: store.getters.token
    };

    // 拦截输出的一大堆垃圾信息
    stompClient.debug = function (str) {
        $("#debug").append(str + "\n");
    };
    // 向服务器发起websocket连接
    stompClient.connect(headers, () => {
        stompClient.subscribe(sendServeEndPoint, (response) => { // 订阅服务端提供的某个topic
                if (response.body) {
                    const repObj = JSON.parse(response.body);
                }
            });
    }, (err) => {
        // 连接发生错误时的处理函数
        console.log('失败')
    });
}