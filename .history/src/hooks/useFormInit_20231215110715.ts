import { ref } from 'vue'
import { IFormItem } from '@/base-ui/form'

const useFormInit = (formItem: IFormItem[]) => {
    console.log('useFormInit')
    const mapFormKey: any = {}
    for (const item of formItem) {
        mapFormKey[item.field] = ''
    }
    console.log(mapFormKey)
    return mapFormKey
}
export default useFormInit
