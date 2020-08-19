/*
 * @Author: guzx
 * @Date: 2020-03-16 13:07:20
 * @Description:  项目的基本配置
 * @Last Modified by:   guzx
 * @Last Modified time: 2020-03-16 13:07:20
 */
// const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
    publicPath: './',
    lintOnSave: false,
    /*chainWebpack: config => {
        // 开启图片压缩
        config.module.rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({bypassOnDebug: true})
        // 开启js,html,css压缩
        config.plugin('compressionPlugin')
            .use(new CompressionPlugin({
                test: /\.js$|\.html$|.\css/, // 匹配文件名
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: true // 不删除源文件
            }))
    },*/
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
        },
        externals:{
            'AMap': 'AMap' // 高德地图配置
        }
    },
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '80',
        https: false,   //是否使用https协议
        hotOnly: true, //是否开启热更新
    }
};
