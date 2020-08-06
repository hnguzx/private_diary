/**
 * @auth:谷志雄
 * @name:main.js
 * @createTime:2020/8/6 11:36
 * @updateTime:2020/8/6 11:36
 * @desc:
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
// import enLocale from "element-ui/lib/locale/lang/en";
// fade 淡入淡出/zoom 缩放
import 'element-ui/lib/theme-chalk/base.css'
// collapse 折叠展开
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import router from "./router";

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI, {zhLocale})
Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
