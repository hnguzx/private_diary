import Vue from 'vue'
import Router from 'vue-router'

/**
 *   @name:index.js *   @auth:谷志雄
 *   @createTime:2020/8/6 0:31
 *   @updateTime:2020/8/6 0:31
 *   @desc:
 */

Vue.use(Router);

// 导入其它路由文件
import userRouter from './user'
import homeRouter from './home'

const Login = () => import('views/Login');


const routes = [
    {
        path: '/',
        name: '/',
        component: Login
    },
    ...userRouter,
    ...homeRouter
];

const router = new Router({
    routes,
    mode: 'history'
});

export default router
