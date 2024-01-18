import { ref, Ref } from 'vue'
import PageModal from '@/components/page-modal'
type addfn = () => void
type editfn = (item?: any) => void
export const usePageModal = (
    page: string,
    addUser?: addfn,
    editUser?: editfn
): [
    Ref<InstanceType<typeof PageModal>>,
    (value: any) => void,
    (value: any) => void,
    Ref<any>,
    Ref<any>
] => {
    const handleName: any = {
        users: '用户',
        role: '角色'
    }
    const defaultInfo = ref({})
    const modalName = ref()
    const modalRef = ref<InstanceType<typeof PageModal>>()
    const handleAddData = () => {
        defaultInfo.value = {}
        modalName.value = `新建${handleName[page]}`
        modalRef.value.dialogVisible = true
        if (addUser) addUser()
    }
    const handleEditData = (value: any) => {
        defaultInfo.value = { ...value }
        // console.log(allMenu.find((item) => item.name === name))
        modalName.value = `编辑${handleName[page]}`
        modalRef.value.dialogVisible = true
        if (editUser) editUser(value)
    }
    return [modalRef, handleAddData, handleEditData, defaultInfo, modalName]
}
