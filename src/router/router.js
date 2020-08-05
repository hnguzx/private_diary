import Vue from 'vue'
import Router from 'vue-router'
/**
 *   @name:router.js
 *   @auth:谷志雄
 *   @createTime:2020/8/6 0:31
 *   @updateTime:2020/8/6 0:31
 *   @desc:
 */

Vue.use(Router);
/**
 *
 */
// 导入其它路由文件
import homeRouter from './homeRouter';

const Home = () => import('views/home/Home');
const Profile = () => import('views/profile/Profile');
const File = () => import('views/file/File');
const Set = () => import('views/set/Set');
const Main = () => import('components/content/main/Main');
// const Index = () => import('views/index');

const routes = [
    {
        path: '/',
        redirect: 'main'
    },
    // {
    //   path: '/index',
    //   component: Index
    // },
    {
        path: '/main',
        component: Main,
        children: [
            {
                path: '/',
                redirect: 'home'
            },
            {
                path: 'home',
                component: Home
            },
            {
                path: 'set',
                component: Set
            },
            {
                path: 'file',
                component: File
            },
            {
                path: 'profile',
                component: Profile
            }
        ]
    },
    ...homeRouter
];

const router = new Router({
    routes,
    mode: 'history'
});

export default router
