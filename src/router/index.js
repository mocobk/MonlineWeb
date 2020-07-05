import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const devRouters = [
    {
        path: '/icon',
        name: 'icon',
        component: () => import('@/views/icons')
    },
    {
        path: '/bang',
        name: 'big-bang',
        component: () => import('@/views/big-bang')
    },
]

const routes = [
    {
        path: '/',
        name: 'convert2request',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/convert-to-request')
    },
];

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: process.env.NODE_ENV === 'development' ? [...devRouters, ...routes] : routes
});

export default router
