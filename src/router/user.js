const ForgetPassword = () => import('views/user/ForgetPassword')
const Register = () => import('views/user/Register')
const PersonCenter = () => import('views/user/PersonCenter')
const DiaryDetail = () => import('views/history/DiaryDetail')

let routes = [
    {
        path: '/user',
        name: '/user',
        component: PersonCenter,
    },
    {
        path: '/register',
        name: '/register',
        component: Register
    },
    {
        path: '/forgetPassword',
        name: '/forgetPassword',
        component: ForgetPassword
    },
    {
        path: '/diaryDetail',
        name: '/diaryDetail',
        component: DiaryDetail,
    }
]

export default routes;