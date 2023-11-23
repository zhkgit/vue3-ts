import type { ILoginState } from './login/types'
export interface IRootStore {
    name: string
}

export interface INewStore {
    login: ILoginState
}

export type IWidthStore = IRootStore & INewStore
