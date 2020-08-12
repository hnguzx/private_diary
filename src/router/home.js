const Home = () => import('views/home/Home')

let routes = [
    {
        path: 'home',
        component: Home,
        children: [
            // {
            //     path: '/',
            //     redirect: 'welcome'
            // },
        ]
    },


]

export default routes;