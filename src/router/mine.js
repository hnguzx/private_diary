const Mine = () => import('views/mine/Mine')

const Set = () => import('views/mine/Set')

let routes = [
    {
        path: 'mine',
        component: Mine,
        children: [
            {
                path: '/',
                redirect: 'set'
            },
            {
                path: 'set',
                name: 'set',
                component: Set
            },
        ]
    }

]

export default routes;