import { RouteRecordRaw } from 'vue-router'
import type { IBreadcrumb } from '@/base-ui/breadcrumb'
let firstMenu: any = null
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
                if (!firstMenu) {
                    firstMenu = route
                }
                if (route) routes.push(route)
            } else {
                _recurseGetRoute(item.children)
            }
        }
    }
    _recurseGetRoute(userMenus)

    return routes
}

export function getBreadcrumb(userMenus: any[], currentPath: string) {
    const breadcrumb: IBreadcrumb[] = []
    getCurrentPath(userMenus, currentPath, breadcrumb)
    return breadcrumb
}

export function getCurrentPath(
    userMenus: any[],
    currentPath: string,
    breadcrumb?: IBreadcrumb[]
): any {
    for (const menu of userMenus) {
        if (menu.type == '1') {
            const findMenu = getCurrentPath(menu.children ?? [], currentPath)
            if (findMenu) {
                breadcrumb?.push({ name: menu.name })
                breadcrumb?.push({ name: findMenu.name })
                return findMenu.id
            }
        } else if (menu.type == '2' && menu.url == currentPath) {
            return menu
        }
    }
}

export function mapMenuToPermissions(userMenus: any[]) {
    const permissions: string[] = []
    const _recurseGetPermission = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 1 || menu.type === 2) {
                _recurseGetPermission(menu.children ?? [])
            } else if (menu.type === 3) {
                permissions.push(menu.permission)
            }
        }
    }
    _recurseGetPermission(userMenus)
    return permissions
}

export { firstMenu }
