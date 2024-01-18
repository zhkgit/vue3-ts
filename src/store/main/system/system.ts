import type { Module } from 'vuex'

import type { ISystemState } from './types'
import type { IRootStore } from '../../types'

import {
    getPageListData,
    detailPageData,
    createPageData,
    editPageData
} from '@/service/main/system/system'

const system: Module<ISystemState, IRootStore> = {
    namespaced: true,
    state() {
        return {
            pageSearch: {},
            pageCurrent: {},
            usersList: [],
            usersCount: 0,
            roleList: [],
            roleCount: 0,
            goodsList: [],
            goodsCount: 0,
            menuList: [],
            menuCount: 0
        }
    },
    getters: {
        pageListData(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}List`]
            }
        },
        pagelistCount(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}Count`]
            }
        }
    },
    mutations: {
        setSearchFormData(state, search) {
            state.pageSearch = search
        },
        setCurrentData(state, current) {
            state.pageCurrent = current
        },
        setUsersList(state, list) {
            state.usersList = list
        },
        setUsersCount(state, count) {
            state.usersCount = count
        },
        setRoleList(state, list) {
            state.roleList = list
        },
        setRoleCount(state, count) {
            state.roleCount = count
        },
        setGoodsList(state, list) {
            state.goodsList = list
        },
        setGoodsCount(state, count) {
            state.goodsCount = count
        },
        setMenuList(state, list) {
            state.menuList = list
        },
        setMenuCount(state, count) {
            state.menuCount = count
        }
    },
    actions: {
        async getPageList({ commit }, payload: any) {
            const pageName = payload.pageName
            const pageUrl = `/${payload.pageName}/list`
            // switch (payload.pageName) {
            //     case 'user':
            //         pageUrl = '/users/list'
            //         capName = 'User'
            //         break
            //     case 'role':
            //         pageUrl = '/role/list'
            //         capName = 'Role'
            //         break
            // }
            const capPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1)
            const pageData = await getPageListData(pageUrl, payload.queryInfo)
            const { totalCount, list } = pageData.data
            commit(`set${capPageName}List`, list)
            commit(`set${capPageName}Count`, totalCount)
        },
        async detailData({ dispatch, state }, payload: any) {
            const { pageName, id, colList } = payload
            const { currentPage = 1, pageSize = 10 } = state.pageCurrent
            if (colList) {
                for (const item of colList) {
                    const pageUrl = `/${pageName}/${item.id}`
                    await detailPageData(pageUrl)
                }
            } else if (id) {
                const pageUrl = `/${pageName}/${id}`
                await detailPageData(pageUrl)
            }

            dispatch('getPageList', {
                pageName,
                queryInfo: {
                    ...state.pageSearch,
                    offset: (currentPage - 1) * pageSize,
                    size: pageSize
                }
            })
        },
        async createPageDataAction({ dispatch, state }, payload) {
            const { pageName, newData } = payload
            const pageUrl = `/${pageName}`
            const { currentPage = 1, pageSize = 10 } = state.pageCurrent
            await createPageData(pageUrl, newData)
            dispatch('getPageList', {
                pageName,
                queryInfo: {
                    ...state.pageSearch,
                    offset: (currentPage - 1) * pageSize,
                    size: pageSize
                }
            })
        },
        async editPageDataAction({ dispatch, state }, payload) {
            const { pageName, id, editData } = payload
            const pageUrl = `/${pageName}/${id}`
            const { currentPage = 1, pageSize = 10 } = state.pageCurrent
            await editPageData(pageUrl, editData)
            dispatch('getPageList', {
                pageName,
                queryInfo: {
                    ...state.pageSearch,
                    offset: (currentPage - 1) * pageSize,
                    size: pageSize
                }
            })
        }
    }
}

export default system
