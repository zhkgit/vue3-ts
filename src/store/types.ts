import type { ILoginState } from './login/types'
import type { ISystemState } from './main/system/types'
export interface IRootStore {
    name: string
}

export interface INewStore {
    login: ILoginState
    system: ISystemState
}

export type IWidthStore = IRootStore & INewStore
