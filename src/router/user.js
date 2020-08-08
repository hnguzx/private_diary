const ForgetPassword = () => import('views/user/ForgetPassword')
const Register = () => import('views/user/Register')
const PersonCenter = () => import('views/user/PersonCenter')

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
    }
]

export default routes;