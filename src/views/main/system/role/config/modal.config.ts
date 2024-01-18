import { IForm } from '@/base-ui/form'
export const modalConfig: IForm = {
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '角色名',
            placeholder: '请输入角色名'
        },
        {
            field: 'intro',
            type: 'input',
            label: '角色介绍',
            placeholder: '请输入角色介绍'
        }
    ],
    itemLayout: {},
    labelWidth: '100px',
    colLayout: {
        sm: 24
    }
}
