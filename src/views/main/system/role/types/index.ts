export interface IPorpList {
    prop?: string
    label: string
    minWidth: string
    slotName?: string
}

export type ITableContent = IPorpList[]
export interface ITable {
    propList: ITableContent
    showIndexColumn: boolean
    showSelectColumn: boolean
    title: string
}
