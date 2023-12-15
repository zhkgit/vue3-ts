import { ref, Ref } from 'vue'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { IFormItem } from '@/base-ui/form'
// import { modalConfig } from '@/views/main/system/user/config/modal.config'

export function usePageSearch(): [
    // 定义一个引用对象，类型为PageContent的实例类型
    Ref<InstanceType<typeof PageContent>>,
    // 定义一个无参数的函数，用于重置查询结果
    () => void,
    // 定义一个带参数的函数，参数类型为IFormItem，用于根据查询条件重新查询结果
    (queryInfo: IFormItem) => void
] {
    // 创建contentRef引用对象，类型为PageContent的实例类型
    const contentRef = ref<InstanceType<typeof PageContent>>()
    // 定义handleResetClick函数，用于重置查询结果
    const handleResetClick = () => {
        // 调用contentRef对象的requeryList方法，重置查询结果
        contentRef.value?.requeryList()
    }
    // 定义handleQueryClick函数，用于根据查询条件重新查询结果
    const handleQueryClick = (queryInfo: IFormItem) => {
        // 调用contentRef对象的requeryList方法，根据查询条件重新查询结果
        contentRef.value?.requeryList(queryInfo)
    }
    // 返回包含contentRef、handleResetClick和handleQueryClick的数组
    return [contentRef, handleResetClick, handleQueryClick]
}
