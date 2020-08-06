import Vue from 'vue'
import Router from 'vue-router'

/**
 *   @name:index.js *   @auth:谷志雄
 *   @createTime:2020/8/6 0:31
 *   @updateTime:2020/8/6 0:31
 *   @desc:
 */

Vue.use(Router);
/**
 *
 */
// 导入其它路由文件
// import homeRouter from './homeRouter';

const Index = () => import('views/Index');

const routes = [
    {
        path: '/',
        component: Index
    }
];

const router = new Router({
    routes,
    mode: 'history'
});

export default router
