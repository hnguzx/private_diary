const Home = () => import('views/home/Home')

const Weather = () => import('views/home/Weather')
const Mood = () => import('views/home/Mood')
const Event = () => import('views/home/Event')
const Diary = () => import('views/home/Diary')

let routes = [
    {
        path: 'home',
        component: Home,
        children: [
            {
                path: '/',
                redirect: 'weather'
            },
            {
                path: 'weather',
                name: 'weather',
                component: Weather
            },
            {
                path: '/mood',
                name:'/mood',
                component: Mood,
            },
            {
                path: 'event',
                component: Event,
            },
            {
                path: '/content',
                component: Diary
            }
        ]
    },


]

export default routes;