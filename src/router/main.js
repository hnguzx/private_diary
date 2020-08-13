import homeRouter from "./home";
import historyRouter from './history'
import mineRouter from './mine'
import squareRouter from './square'

const Main = () => import('views/main/Main')

let routes = [
    {
        path: '/main',
        component: Main,
        children: [
            {
                path: '/',
                redirect: 'home'
            },
            ...homeRouter,
            ...historyRouter,
            ...mineRouter,
            ...squareRouter
        ]
    }
]

export default routes;