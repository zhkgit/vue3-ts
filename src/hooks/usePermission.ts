import { useStore } from '@/store'
export function usePermission(pageName: string, handleName: string) {
    const permisstion = `system:${pageName}:${handleName}`
    const store = useStore()
    const permissionList = store.state.login.permissionList
    return !!permissionList.find((item) => item === permisstion)
}
