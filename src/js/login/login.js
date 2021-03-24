import {ajaxRequest} from "network/request";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import md5 from 'js-md5'

var stompClient = {};
var param = {};

/**
 * 开启socket连接
 */
export function openConnect(username, password) {
    let socket = new SockJS('http://10.239.46.243/webSocketServer');
    stompClient = Stomp.over(socket);
    param = {
        username: username,
        password: md5(password)
    }
    stompClient.connect(param, function (frame) {
        stompClient.subscribe('/webSocketRequest/connect', data => {
            console.log('Connected Success')
        }, err => {
            console.log('Connected Fail：' + err)
        })

        stompClient.subscribe('/user/queue/customer', data => {
            console.log("接收到的消息：" + data.body)
            handleMsg(JSON.parse(data.body))
        }, err => {
            console.log('Connected Fail：' + err)
        })
    })
}

/**
 * 断开连接
 */
export function disConnect() {
    if (stompClient != null) {
        stompClient.disconnect(() => {
            console.log("DisConnected Success");
        });
    }
}

/**
 * 发送消息
 */
export function sendMsg() {
    let that = this;
    this.receiver = parseInt(this.receiver);
    let message = {
        msgSender: this.$store.getters.userInfo.userId,
        msgReceiver: this.receiver,
        msgContent: this.msg
    };
    that.stompClient.send("/webSocketRequest/sendUser", {}, JSON.stringify(message))
}

/**
 * 接收消息
 */
export function receivedMsg() {
    let that = this;
    that.stompClient.subscribe('/user/queue/customer', data => {
        console.log("接收到的消息：" + data.body)
    }, err => {
        console.log('Connected Fail：' + err)
    })
}

/**
 * 处理聊天记录
 */
export function handleMsg(message) {
    this.messageList.push(message)
}

