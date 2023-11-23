import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import { ElButton } from 'element-plus'
const elArr = [ElButton]

export default function (app: App): void {
    elArr.forEach((el) => {
        app.component(el.name, el)
    })
}
