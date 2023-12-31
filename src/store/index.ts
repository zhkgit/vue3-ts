import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootStore, IWidthStore } from './types'
import login from './login/login'
import system from './main/system/system'

const store = createStore<IRootStore>({
    state() {
        return {
            name: 'coderwhy'
        }
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        login,
        system
    }
})
export function setupStore() {
    store.dispatch('login/loadLocalCache')
}

export function useStore(): Store<IWidthStore> {
    return useVuexStore()
}
export default store
