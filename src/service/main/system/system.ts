import tsRequest from '../../index'
import type { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
    return tsRequest.post<IDataType>({
        url,
        data: queryInfo
    })
}

export function detailPageData(url: string) {
    return tsRequest.post<IDataType>({
        url
    })
}

export function createPageData(url: string, newData: any) {
    return tsRequest.post<IDataType>({
        url,
        data: newData
    })
}

export function editPageData(url: string, newData: any) {
    return tsRequest.patch<IDataType>({
        url,
        data: newData
    })
}

export function getRole(url: string, newData: any) {
    return tsRequest.post<IDataType>({
        url,
        data: newData
    })
}
