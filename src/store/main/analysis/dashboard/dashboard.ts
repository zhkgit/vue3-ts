import { Module } from 'vuex'
import type { IDashboardState } from './types'
import type { IRootStore } from '../../../types'
import {
    getCategoryGoodsCount,
    getCategoryGoodsSale,
    getCategoryGoodsFavor,
    getAddresGoodsSale
} from '@/service/main/analysis/dashboard/dashboard'

const dashboard: Module<IDashboardState, IRootStore> = {
    namespaced: true,
    state() {
        return {
            categoryGoodsCount: [],
            categoryGoodsSale: [],
            categoryGoodsFavor: [],
            addressGoodsSale: []
        }
    },
    mutations: {
        changeCategoryGoodsCount(state, categoryGoodsCount) {
            state.categoryGoodsCount = categoryGoodsCount
        },
        changeCategoryGoodsSale(state, categoryGoodsSale) {
            state.categoryGoodsSale = categoryGoodsSale
        },
        changeCategoryGoodsFavor(state, categoryGoodsFavor) {
            state.categoryGoodsFavor = categoryGoodsFavor
        },
        changeAddressGoodsSale(state, addressGoodsSale) {
            state.addressGoodsSale = addressGoodsSale
        }
    },
    actions: {
        async getDashboardDataAction({ commit }) {
            const [categoryGoodsCount, categoryGoodsSale, categoryGoodsFavor, addressGoodsSale] =
                await Promise.all([
                    getCategoryGoodsCount(),
                    getCategoryGoodsSale(),
                    getCategoryGoodsFavor(),
                    getAddresGoodsSale()
                ])
            commit('changeCategoryGoodsCount', categoryGoodsCount.data)
            commit('changeCategoryGoodsSale', categoryGoodsSale.data)
            commit('changeCategoryGoodsFavor', categoryGoodsFavor.data)
            commit('changeAddressGoodsSale', addressGoodsSale.data)
        }
    }
}

export default dashboard
