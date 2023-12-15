import { ref } from 'vue'
import { IFormItem } from '@/base-ui/form'

const usePageModal = (
    formItem: IFormItem[]
): [() => void, Ref<InstanceType<typeof PageModal>>, (value: any) => void, Ref<any>] => {
    const modalRef = ref<InstanceType<typeof PageModal>>()
    const handleAddData = () => {
        modalRef.value.dialogVisible = true
    }
    const handleEditData = (value: any) => {
        defaultInfo.value = { ...value }
        modalRef.value.dialogVisible = true
    }
    return [modalRef, handleEditData, defaultInfo]
}
export default usePageModal
