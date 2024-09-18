import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/Menu.vue"),
            children: [
                {
                    path: "/login",
                    name: "login",
                    component: () => import("@/views/Login.vue"),
                },
                {
                    path: "/register",
                    name: "register",
                    component: () => import("@/views/Register.vue"),
                },
                {
                    path: "/list",
                    name: "list",
                    component: () => import("@/views/List.vue"),
                },
                {
                    path: "/content",
                    name: "content",
                    component: () => import("@/views/Content.vue"),
                },
                {
                    path: "/edit",
                    name: "edit",
                    component: () => import("@/views/Edit.vue"),
                },
                {
                    path: "/post",
                    name: "post",
                    component: () => import("@/views/Post.vue"),
                },
                {
                    path: "/report",
                    name: "report",
                    component: () => import("@/views/Report.vue"),
                },
                {
                    path: "/reportlist",
                    name: "reportlist",
                    component: () => import("@/views/ReportList.vue"),
                },
                {
                    path: "/adminlist",
                    name: "adminlist",
                    component: () => import("@/views/AdminList.vue"),
                },
            ]
        }
    ]
})

export default router
