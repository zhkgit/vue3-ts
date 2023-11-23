import type { Module } from 'vuex'
import router from '@/router'
import type { ILoginState } from './types'
import type { IRootStore } from '../types'
import { loginRequest, getUserById, getUserMenus } from '@/service/login/login'
import type { ILoginParam } from '@/service/login/types'
import localCatch from '@/utils/catch'
import { mapMenusToRoutes } from '@/utils/map-menu'

const login: Module<ILoginState, IRootStore> = {
    namespaced: true,
    state() {
        return {
            token: '',
            userInfo: {},
            userMenus: {}
        }
    },
    getters: {},
    mutations: {
        changeToken(state, token: string) {
            state.token = token
        },
        saveUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        saveUserMenus(state, userMenus) {
            state.userMenus = userMenus
            const routes = mapMenusToRoutes(userMenus)
            routes.forEach((item) => router.addRoute('main', item))
        }
    },
    actions: {
        async actionsLoginAction({ commit }, payload: ILoginParam) {
            const loginData = await loginRequest(payload)
            const { id, token } = loginData.data
            localCatch.setCatch('token', token)
            commit('changeToken', token)

            const userInfo = await getUserById(id)
            commit('saveUserInfo', userInfo.data)
            localCatch.setCatch('userInfo', userInfo.data)

            const userMenus = await getUserMenus(userInfo.data.role.id)
            commit('saveUserMenus', userMenus.data)
            localCatch.setCatch('userMenus', userMenus.data)

            router.push('/main')
        },
        loadLocalCache({ commit }) {
            const token = localCatch.getCatch('token')
            if (token) {
                commit('changeToken', token)
            }
            const userInfo = localCatch.getCatch('userInfo')
            if (userInfo) {
                commit('saveUserInfo', userInfo)
            }
            const userMenus = localCatch.getCatch('userMenus')
            if (userMenus) {
                commit('saveUserMenus', userMenus)
            }
        }
    }
}

export default login
