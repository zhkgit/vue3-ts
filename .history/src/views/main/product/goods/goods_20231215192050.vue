<template>
    <div class="goods">
        <PageSearch
            :searchFormConfig="searchFormConfig"
            @resetBtnClick="handleResetClick"
            @searchBtnClick="handleQueryClick"
            v-if="searchFormConfig.formItems"
        ></PageSearch>
        <PageContent :contentTableConfig="contentTableConfig" pageName="goods" ref="contentRef">
            <template #status="scope">
                <el-button :type="scope.row.status ? 'success' : 'danger'">{{
                    scope.row.status ? '启用' : '禁用'
                }}</el-button>
            </template>
            <template #image="scope">
                <el-image
                    style="width: 60px; height: 60px"
                    :src="scope.row.imgUrl"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="[scope.row.imgUrl]"
                    :initial-index="4"
                    fit="cover"
                />
            </template>
        </PageContent>
    </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { usePageSearch } from '@/hooks/usePageSearch'

const [contentRef, handleResetClick, handleQueryClick] = usePageSearch()
</script>

<style scoped></style>
