<template>
    <div class="user">
        <PageSearch
            :searchFormConfig="searchFormConfig"
            @resetBtnClick="handleResetClick"
            @searchBtnClick="handleQueryClick"
        >
        </PageSearch>
        <PageContent
            :contentTableConfig="contentTableConfig"
            pageName="users"
            ref="contentRef"
            addName="新建用户"
            @addModal="handleAddData"
            @editModal="handleEditData"
        >
            <template #status="scope">
                <el-button :type="scope.row.enable ? 'success' : 'danger'">
                    {{ scope.row.enable ? '启用' : '禁用' }}
                </el-button>
            </template>
        </PageContent>
        <PageModal
            :defaultInfo="defaultInfo"
            :modalConfig="modalConfig"
            modalName="新建用户"
            ref="modalRef"
        ></PageModal>
    </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/usePageModal'

const [contentRef, handleResetClick, handleQueryClick] = usePageSearch()
const addUser = () => {
    const isHiddenPassword = modalConfig.formItems.find((item) => item.field == 'password')
    isHiddenPassword!.isHidden = false
}
const editUser = () => {
    const isHiddenPassword = modalConfig.formItems.find((item) => item.field == 'password')
    isHiddenPassword!.isHidden = true
}
const [modalRef, handleAddData, handleEditData, defaultInfo] = usePageModal(addUser, editUser)
</script>

<style scoped lang="less"></style>
