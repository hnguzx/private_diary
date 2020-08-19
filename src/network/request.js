import Axios from 'axios'

// config:配置参数，successCallback:成功的回调函数，failureCallback：失败的回调函数
export function ajaxRequest(config) {

    // 公共参数
    const axiosExample = Axios.create({
        baseURL: 'http://10.239.74.192', // 调用mock数据，实际应用时注释掉，打开下面的baseURL
        // baseURL: 'http://180.76.58.205/',
        // baseURL: 'http://192.168.199.217/', // 本地测试
        timeout: 5000,
        // headers: {'content-type': 'application/x-www-form-urlencoded'},
        responseType: 'json'
    });
    // request拦截
    axiosExample.interceptors.request.use(config => {
        if (config.method.toLowerCase() != 'get') {
            console.log(config.data)
        }
        return config
    }, error => {
        console.log(error)
    });

    // response拦截
    axiosExample.interceptors.response.use(res => {
        console.log(res.data.data)
        // if (res.data.data.code == '200'){
            return res.data.data
        // }
    }, error => {
        return error;
    });

    return axiosExample(config)
}
