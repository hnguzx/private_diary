const Main = () => import('views/main/Main')
const Home = () => import('views/home/Home')
const Square = () => import('views/square/Square')
const History = () => import('views/history/History')
const Mine = () => import('views/mine/Mine')

let routes = [
    {
        path: '/main',
        name: '/main',
        component: Main,
        children: [
            {
                path: '/',
                name: '/',
                redirect: 'home'
            },
            {
                path: 'home',
                name: 'home',
                component: Home
            },
            {
                path: 'square',
                name: 'square',
                component: Square
            },
            {
                path: 'history',
                name: 'history',
                component: History
            },
            {
                path: 'mine',
                name: 'mine',
                component: Mine
            }
        ]
    }
]

export default routes;