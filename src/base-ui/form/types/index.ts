type ITypes = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
    type: ITypes
    label: string
    rule?: any[]
    placeholder?: any
    // 针对select
    options?: any[]
    // 针对特殊的属性
    otherOptions?: any
}

export interface IForm {
    formItems: IFormItem[]
    labelWidth?: string
    colLayout?: any
    itemLayout?: any
}
