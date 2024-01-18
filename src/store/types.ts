import type { ILoginState } from './login/types'
import type { ISystemState } from './main/system/types'
import type { IDashboardState } from './main/analysis/dashboard/types'
export interface IRootStore {
    name: string
    entireDepartment: any[]
    entireRole: any[]
    entireMenu: any[]
}

export interface INewStore {
    login: ILoginState
    system: ISystemState
    dashboard: IDashboardState
}

export type IWidthStore = IRootStore & INewStore
