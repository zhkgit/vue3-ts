import { ref } from 'vue'
import { IFormItem } from '@/base-ui/form'

const useFormInit = (formItem: IFormItem[]) => {
    const mapFormKey: any = {}
    for (const item of formItem) {
        mapFormKey[item.field] = ''
    }
    return mapFormKey
}
export default useFormInit
