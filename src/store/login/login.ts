import type { Module } from 'vuex'
import router from '@/router'
import type { ILoginState } from './types'
import type { IRootStore } from '../types'
import { loginRequest, getUserById, getUserMenus } from '@/service/login/login'
import type { ILoginParam } from '@/service/login/types'
import localCatch from '@/utils/catch'
import { mapMenusToRoutes } from '@/utils/map-menu'
import { mapMenuToPermissions } from '@/utils/map-menu'

const login: Module<ILoginState, IRootStore> = {
    namespaced: true,
    state() {
        return {
            token: '',
            userInfo: {},
            userMenus: {},
            permissionList: []
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
            state.permissionList = mapMenuToPermissions(userMenus)
        }
    },
    actions: {
        async actionsLoginAction({ commit, dispatch }, payload: ILoginParam) {
            const loginData = await loginRequest(payload)
            const { id, token } = loginData.data
            localCatch.setCatch('token', token)
            commit('changeToken', token)

            // 确保那都token时调用
            dispatch('getInitialDataAction', null, { root: true })

            const userInfo = await getUserById(id)
            commit('saveUserInfo', userInfo.data)
            localCatch.setCatch('userInfo', userInfo.data)

            const userMenus = await getUserMenus(userInfo.data.role.id)
            commit('saveUserMenus', userMenus.data)
            localCatch.setCatch('userMenus', userMenus.data)

            router.push('/main')
        },
        loadLocalCache({ commit, dispatch }) {
            const token = localCatch.getCatch('token')
            if (token) {
                commit('changeToken', token)
                dispatch('getInitialDataAction', null, { root: true })
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
