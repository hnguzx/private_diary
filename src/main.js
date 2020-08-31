/**
 * @auth:谷志雄
 * @name:main.js
 * @createTime:2020/8/6 11:36
 * @updateTime:2020/8/6 11:36
 * @desc:
 */
import Vue from 'vue'
// 第三方引用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import router from "./router"
// import './mockJs/mockServer'
import VueTouch from 'vue-touch'
import vueStore from "./store"
import store from "./vuex"
import echarts from 'echarts'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI, {zhLocale})
Vue.use(VueTouch)
Vue.prototype.$echarts = echarts


new Vue({
    render: h => h(App),
    router,
    store,
    data: {
        privateState: {},
        sharedState: vueStore.state
    }
}).$mount('#app')
