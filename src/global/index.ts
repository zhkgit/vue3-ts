import { App } from 'vue'
// import registerElement from './register-element'
import registerProperties from './register-properties'

export function registerApp(app: App) {
    app.use(registerProperties)
}
