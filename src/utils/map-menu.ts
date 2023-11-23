import { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []
    // 默认加载所有路由
    const allRouters: RouteRecordRaw[] = []
    const routerFiles = require.context('../router/main', true, /\.ts/)
    routerFiles.keys().forEach((item) => {
        // eslint-disable-next-line
        const router = require(`../router/main${item.slice(1)}`)
        allRouters.push(router.default)
    })
    const _recurseGetRoute = (menus: any[]) => {
        for (const item of menus) {
            if (item.type === 2) {
                const route = allRouters.find((path) => path.path == item.url)
                if (route) routes.push(route)
            } else {
                _recurseGetRoute(item.children)
            }
        }
    }
    _recurseGetRoute(userMenus)

    return routes
}
