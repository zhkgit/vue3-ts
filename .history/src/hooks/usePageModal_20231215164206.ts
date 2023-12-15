import { ref } from 'vue'
import { IFormItem } from '@/base-ui/form'
import { ref, Ref } from 'vue'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { IFormItem } from '@/base-ui/form'

const usePageModal = (
    formItem: IFormItem[]
):  => {
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
export default usePageModal
