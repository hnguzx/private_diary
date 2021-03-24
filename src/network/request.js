import Axios from 'axios'

Axios.defaults.withCredentials=true;

// config:配置参数，successCallback:成功的回调函数，failureCallback：失败的回调函数
export function ajaxRequest(config) {

    // 公共参数
    const axiosExample = Axios.create({
        // baseURL: '', // 调用mock数据，实际应用时注释掉，打开下面的baseURL
        // baseURL: '/api',
        baseURL: 'http://10.239.46.243/',
        // baseURL: 'http://127.0.0.1',
        timeout: 5000,
        withCredentials: true,
        headers: {
            'content-type': 'application/json'
        },
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
        console.log(res.data)
        if (res.data.code == '200') {
            return res.data
        } else {
            return res.data.code
            console.log('error:' + res.data.code + 'msg' + res.data.msg)
        }


    }, error => {
        return error;
    });

    return axiosExample(config)
}
