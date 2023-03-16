import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/home', redirect: '/', },
    { path: '/index', redirect: '/', },
    {
        path: '/',
        component: () => import('../views/index.vue'),
        meta: {
            title: '主页'
        },
        redirect: '/main',
        children: [
            {
                path: 'main',
                component: () => import('../views/main/content.vue'),
                meta: {
                    title: '主要内容',
                    path: 'main'
                },
                redirect: '/main/blog',
                children: [
                    {
                        path: 'blog',
                        component: () => import('../views/blog/index.vue'),
                        meta: {
                            title: '博客',
                            path: 'blog',
                            index: 0,
                        },
                    },
                    {
                        path: 'message',
                        component: () => import('../views/message/index.vue'),
                        meta: {
                            title: '留言',
                            path: 'message',
                            index: 1,
                        },
                    },
                    {
                        path: 'photo',
                        component: () => import('../views/photo/index.vue'),
                        meta: {
                            title: '照片墙',
                            path: 'photo',
                            index: 2,
                        },
                    },
                    {
                        path: 'link',
                        component: () => import('../views/link/index.vue'),
                        meta: {
                            title: '友情链接',
                            path: 'link',
                            index: 3,
                        },
                    },
                    {
                        path: 'about',
                        component: () => import('../views/about/index.vue'),
                        meta: {
                            title: '关于本站点',
                            path: 'about',
                            index: 4,
                        },
                    }
                ]
            }
        ]
    },

]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
});


router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to, from) => {

});


export default router;






