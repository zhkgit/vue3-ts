import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'normalize.css'
import { registerApp } from '@/global'

import './assets/css/index.less'
import { setupStore } from './store'
import ElementPlus from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(registerApp)
app.use(store)
setupStore()
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
