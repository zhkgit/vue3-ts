import { App } from 'vue'
import formatUtcString from '@/utils/format-date'
export default function registerProperties(app: App) {
    app.config.globalProperties.$filters = {
        formatTime(value: string) {
            const data = new Date(value)
            return formatUtcString(data, 'YYYY-MM-DD HH:mm:ss')
        }
    }
}
