<template>
    <div class="role">
        <PageSearch
            :searchFormConfig="searchFormConfig"
            @resetBtnClick="handleResetClick"
            @searchBtnClick="handleQueryClick"
            pageName="role"
            addName="角色中心"
        >
        </PageSearch>
        <PageContent
            ref="contentRef"
            @addModal="handleAddData"
            @editModal="handleEditData"
            :contentTableConfig="contentTableConfig"
            pageName="role"
            addName="添加角色"
        ></PageContent>
        <PageModal
            ref="modalRef"
            :modalConfig="modalConfig"
            pageName="role"
            :defaultInfo="defaultInfo"
            :modalName="modalName"
            :otherInfo="otherInfo"
        >
            <template #default>
                <el-tree
                    ref="elTreeRef"
                    :data="data"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                    @check="handelCheck"
                />
            </template>
        </PageModal>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { computed, ref, nextTick } from 'vue'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import PageSearch from '@/components/page-search'
import { ElTree } from 'element-plus'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { menuMapLeafKeys } from '@/utils/map-menu'

const store = useStore()
const data = computed(() => store.state.entireMenu)
const defaultProps = {
    children: 'children',
    label: 'name'
}
const otherInfo = ref({})
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallBack = (item: any) => {
    const leafKeys: number[] = menuMapLeafKeys(item.menuList)
    nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
    })
}
const [contentRef, handleResetClick, handleQueryClick] = usePageSearch()
const [modalRef, handleAddData, handleEditData, defaultInfo, modalName] = usePageModal(
    'role',
    undefined,
    editCallBack
)
const handelCheck = (data: any, checkedNodes: any) => {
    const checkedKeys = checkedNodes.checkedKeys
    const halfCheckedKeys = checkedNodes.halfCheckedKeys
    console.log(checkedKeys, halfCheckedKeys)
    const checked = [...checkedKeys, ...halfCheckedKeys]
    otherInfo.value = { checked }
}
</script>

<style scoped></style>
