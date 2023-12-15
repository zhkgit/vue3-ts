export interface IPorpList {
    prop?: string
    label: string
    minWidth: string
    slotName?: string
}
interface IChildren {
    rowKey: string
    treeProp: object
}

export type ITableContent = IPorpList[]

export interface ITable {
    propList: ITableContent
    showIndexColumn: boolean
    showSelectColumn: boolean
    title: string
    childrenProps?: IChildren
}
