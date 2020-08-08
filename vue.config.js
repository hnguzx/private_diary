/*
 * @Author: guzx
 * @Date: 2020-03-16 13:07:20
 * @Description:  项目的基本配置
 * @Last Modified by:   guzx
 * @Last Modified time: 2020-03-16 13:07:20
 */

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'commonjs': '@/commonJs',
                'components': '@/components',
                'js': '@/js',
                'network': '@/network',
                'validator': '@/validator',
                'views': '@/views'
            }
        }
    },
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8081',
        https: false,   //是否使用https协议
        hotOnly: true, //是否开启热更新
    }
};
