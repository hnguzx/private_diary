const Chat = () => import('views/chat/Chat')


let routes = [
    {
        path: 'chat',
        component: Chat,
        children: []
    }


]

export default routes;