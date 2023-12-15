import { ref, Ref } from 'vue'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

export const usePageModal = (): [
    () => void,
    Ref<InstanceType<typeof PageModal>>,
    (value: any) => void,
    Ref<any>
] => {
    const defaultInfo = ref({})
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
