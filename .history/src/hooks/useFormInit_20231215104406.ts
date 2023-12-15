import { ref } from 'vue'
import { IFormItem } from '@/base-ui/form'

const useFormInit = (formItem: IFormItem[]) => {
    const mapFormKey: any = {}
    for (const item of formItem) {
        mapFormKey[item.field] = ''
    }
    const formData = ref(mapFormKey)
    return formData
}
export default useFormInit
