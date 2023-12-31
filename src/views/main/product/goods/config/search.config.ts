import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
    labelWidth: '120px',
    itemLayout: {
        padding: '0 40px'
    },
    colLayout: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24
    },
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '商品名称',
            placeholder: '请输入商品名称'
        },
        {
            field: 'status',
            type: 'select',
            label: '用户状态',
            placeholder: '请选择用户状态',
            options: [
                { title: '启用', value: 1 },
                { title: '禁用', value: 0 }
            ]
        },
        {
            field: 'createAt',
            type: 'datepicker',
            label: '创建时间',
            otherOptions: {
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
                type: 'daterange'
            }
        }
    ]
}
