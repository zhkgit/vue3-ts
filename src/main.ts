import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'normalize.css'

import './assets/css/index.less'
import { setupStore } from './store'

const app = createApp(App)
setupStore()
app.use(router)
app.use(store)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
