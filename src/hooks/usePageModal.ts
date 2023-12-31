import { ref, Ref } from 'vue'
import PageModal from '@/components/page-modal'
type addfn = () => void
type editfn = () => void
export const usePageModal = (
    addUser: addfn,
    editUser: editfn
): [Ref<InstanceType<typeof PageModal>>, (value: any) => void, (value: any) => void, Ref<any>] => {
    const defaultInfo = ref({})
    const modalRef = ref<InstanceType<typeof PageModal>>()
    const handleAddData = () => {
        defaultInfo.value = {}
        modalRef.value.dialogVisible = true
        addUser()
    }
    const handleEditData = (value: any) => {
        defaultInfo.value = { ...value }
        modalRef.value.dialogVisible = true
        editUser()
    }
    return [modalRef, handleAddData, handleEditData, defaultInfo]
}
