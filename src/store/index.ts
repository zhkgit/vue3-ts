import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootStore, IWidthStore } from './types'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard/dashboard'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootStore>({
    state() {
        return {
            name: 'coderwhy',
            entireDepartment: [],
            entireRole: [],
            entireMenu: []
        }
    },
    getters: {},
    mutations: {
        changeEntireDepartment(state, departmentList) {
            state.entireDepartment = departmentList
        },
        changeEntireRole(state, roleList) {
            state.entireRole = roleList
        },
        changeEntireMenu(state, menuList) {
            state.entireMenu = menuList
        }
    },
    actions: {
        async getInitialDataAction({ commit }) {
            const departmentResult = await getPageListData('/department/list', {
                offset: 0,
                size: 1000
            })
            const { list: departmentList } = departmentResult.data
            const roleResult = await getPageListData('/role/list', {
                offset: 0,
                size: 1000
            })
            const { list: roleList } = roleResult.data

            const menuResult = await getPageListData('menu/list', {})
            const { list: menuList } = menuResult.data

            // 2.保存数据
            commit('changeEntireDepartment', departmentList)
            commit('changeEntireRole', roleList)
            commit('changeEntireMenu', menuList)
        }
    },
    modules: {
        login,
        system,
        dashboard
    }
})
export function setupStore() {
    store.dispatch('login/loadLocalCache')
    // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IWidthStore> {
    return useVuexStore()
}
export default store
