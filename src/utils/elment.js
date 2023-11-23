import { createApp } from 'vue'
import App from './App.vue'
import { ElButton } from 'element-plus'

const elArr = [ElButton]

const app = createApp(App)

elArr.forEach((el) => {
    app.component(el.name, el)
})
