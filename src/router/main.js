import homeRouter from "./home";
import historyRouter from './history'
import mineRouter from './mine'
import square from './square'
const Weather = () => import('views/home/Weather')

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
            ...square
        ]
    },
    {
        path: '/weather',
        component: Weather,
    }
]

export default routes;