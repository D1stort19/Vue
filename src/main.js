import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import userData from '@/api/global_variable.js'


const app = createApp(App)

app.use(router)
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

router.beforeEach((to, from, next) => {
    console.log("to:", to)
    console.log("from:", from)
    if (to.name == "login") {
        if (userData.user_id != null) {
            ElMessage.error('已登录.')
            next(false)
        }
        else {
            next()
        }
    }
    if (to.name == "post") {
        if (userData.user_id == null) {
            ElMessage.error('未登录.')
            next(false)
        }
        else {
            next()
        }
    }
    if (to.name == "reportlist") {
        if (userData.user_id == null) {
            ElMessage.error('未登录.')
            next(false)
        }
        else {
            next()
        }
    }
    next()
})

app.mount('#app')
