import Axios from 'axios'

// config:配置参数，successCallback:成功的回调函数，failureCallback：失败的回调函数
export function ajaxRequest(config) {

    // 公共参数
    const axiosExample = Axios.create({
        // baseURL: '', // 调用mock数据，实际应用时注释掉，打开下面的baseURL
        baseURL: 'http://180.76.58.205/',
        timeout: 5000,
        // headers: {'content-type': 'application/x-www-form-urlencoded'},
        // responseType: 'json'
    });
    // request拦截
    axiosExample.interceptors.request.use(config => {
        // config.data = config
        return config
    }, error => {
        console.log(error)
    });

    // response拦截
    axiosExample.interceptors.response.use(res => {
        // return res
        return res
    }, error => {
        return error;
    });

    return axiosExample(config)
}
