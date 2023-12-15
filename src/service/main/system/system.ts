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
