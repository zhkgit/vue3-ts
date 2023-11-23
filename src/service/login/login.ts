import tsRequest from '../index'
import type { ILoginParam, IDataType, ILoginResult } from './types'

enum LoginURL {
    AccountLogin = '/login',
    UserInfo = '/users/',
    UserMenus = '/role/'
}

export function loginRequest(account: ILoginParam) {
    return tsRequest.post<IDataType<ILoginResult>>({
        url: LoginURL.AccountLogin,
        data: account
    })
}
export function getUserById(id: number) {
    return tsRequest.get<IDataType>({
        url: LoginURL.UserInfo + id,
        showLoading: false
    })
}

export function getUserMenus(id: number) {
    return tsRequest.get<IDataType>({
        url: LoginURL.UserMenus + id + '/menu',
        showLoading: false
    })
}
