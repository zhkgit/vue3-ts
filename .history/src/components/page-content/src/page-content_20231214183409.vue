<template>
    <div class="page-content">
        <TsTable
            :listData="contentList"
            :listCount="contentListCount"
            v-bind="props.contentTableConfig"
            @selectionChange="handleSelectionChange"
            v-model:page="pageInfo"
        >
            <template #headerHandler>
                <el-button type="primary" size="small" v-if="isCreate" @click="handelAddInfo">
                    {{ props.addName }}
                </el-button>
                <el-button plain :icon="RefreshLeft" circle />
            </template>
            <template #footer></template>
            <template #createAt="scope">
                <strong>{{ formatTime(scope.row.createAt) }}</strong>
            </template>
            <template #updateAt="scope">
                <strong>{{ formatTime(scope.row.updateAt) }}</strong>
            </template>
            <template #handler="scope">
                <el-button link type="primary" v-if="isUpdate" @click="handelEditInfo(scope.row)">
                    编辑
                </el-button>
                <el-button link type="primary" v-if="isDelete" @click="handelDetailBtn(scope.row)">
                    删除
                </el-button>
            </template>
            <template
                v-for="item in otherPropsSlot"
                :key="item.prop"
                #[String(item.slotName)]="scope"
            >
                <template v-if="item.slotName">
                    <slot :name="item.slotName" :row="scope.row"></slot>
                </template>
            </template>
        </TsTable>
    </div>
</template>

<script lang="ts" setup>
import TsTable from '@/base-ui/table'

import { computed, ref, defineProps, defineEmits, PropType, defineExpose, watch } from 'vue'
import { useStore } from '@/store'
import { RefreshLeft } from '@element-plus/icons-vue'
import formatUtcString from '@/utils/format-date'
import type { ITable } from '@/views/main/system/user/types'
import { usePermission } from '@/hooks/usePermission'

const store = useStore()
const props = defineProps({
    contentTableConfig: {
        type: Object as PropType<ITable>,
        required: true
    },
    pageName: {
        type: String,
        required: true
    },
    addName: {
        type: String,
        default: '新建用户'
    }
})
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

const formatTime = computed(() => (value: string) => {
    const data = new Date(value)
    return formatUtcString(data, 'YYYY-MM-DD HH:mm:ss')
})
const emits = defineEmits(['addModal', 'editModal'])
const pageInfo = ref({ pageSize: 10, currentPage: 1 })
watch(pageInfo, () => {
    requeryList()
    store.commit('system/setCurrentData', pageInfo.value)
})
// const listName: string = props.pageName + 'List'
// const contentList = computed(() => store.state.system[listName])
const contentList = computed(() => store.getters['system/pageListData'](props.pageName))
const contentListCount = computed(() => store.getters[`system/pagelistCount`](props.pageName))
const requeryList = (query: any = {}) => {
    if (!isQuery) return
    store.dispatch('system/getPageList', {
        pageName: props.pageName,
        queryInfo: {
            offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
            size: pageInfo.value.pageSize,
            ...query
        }
    })
}
requeryList()
const selectDataList = ref<any[]>()
const handleSelectionChange = (selection: any[]) => {
    selectDataList.value = selection
}
const otherPropsSlot = props.contentTableConfig?.propList.filter((item) => {
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
})
const handelDetailBtn = (value: any) => {
    const isDeleteSelect = selectDataList.value?.find((item) => item.id === value.id)
    if (isDeleteSelect) {
        store.dispatch('system/detailData', {
            pageName: props.pageName,
            colList: selectDataList.value
        })
    } else {
        store.dispatch('system/detailData', { pageName: props.pageName, id: value.id })
    }
}

const handelAddInfo = () => {
    emits('addModal')
}
const handelEditInfo = (value: any) => {
    emits('editModal', value)
}
defineExpose({ requeryList })
</script>

<style scoped>
.page-content {
    padding: 20px;
    border-top: 10px solid #f5f5f5;
}
</style>
