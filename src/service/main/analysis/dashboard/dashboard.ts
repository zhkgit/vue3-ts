import tsRequest from '../../../index'
import type { IDataType } from '../../../types'

enum DashboardAPI {
    categoryGoodsCount = '/goods/category/count',
    categoryGoodsSale = '/goods/category/sale',
    categoryGoodsFavor = '/goods/category/favor',
    addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
    return tsRequest.get<IDataType>({
        url: DashboardAPI.categoryGoodsCount
    })
}

export function getCategoryGoodsSale() {
    return tsRequest.get<IDataType>({
        url: DashboardAPI.categoryGoodsSale
    })
}

export function getCategoryGoodsFavor() {
    return tsRequest.get<IDataType>({
        url: DashboardAPI.categoryGoodsFavor
    })
}

export function getAddresGoodsSale() {
    return tsRequest.get<IDataType>({
        url: DashboardAPI.addressGoodsSale
    })
}
