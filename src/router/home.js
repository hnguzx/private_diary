const Home = () => import('views/home/Home')

let routes = [
    {
        path: '/home',
        name: '/home',
        component: Home,
    }
]

export default routes;