import { ref, Ref } from 'vue'
import PageModal from '@/components/page-modal'
type addfn: () => void
type editfn: () => void
export const usePageModal = (addFn:): [
    Ref<InstanceType<typeof PageModal>>,
    (value: any) => void,
    (value: any) => void,
    Ref<any>
] => {
    const defaultInfo = ref({})
    const modalRef = ref<InstanceType<typeof PageModal>>()
    const handleAddData = () => {
        defaultInfo.value = {}
        modalRef.value.dialogVisible = true
    }
    const handleEditData = (value: any) => {
        console.log(value)
        defaultInfo.value = { ...value }
        modalRef.value.dialogVisible = true
    }
    return [modalRef, handleAddData, handleEditData, defaultInfo]
}
