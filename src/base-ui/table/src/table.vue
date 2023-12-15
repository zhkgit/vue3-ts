<template>
    <div class="ts-table">
        <div class="header">
            <slot name="header">
                <div class="title">{{ props.title }}</div>
                <div class="handler">
                    <slot name="headerHandler"></slot>
                </div>
            </slot>
            <slot name="headerFooter"></slot>
        </div>
        <el-table
            class="table"
            :data="props.listData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-bind="props.childrenProps"
        >
            <el-table-column
                v-if="props.showSelectColumn"
                type="selection"
                width="60"
                align="center"
            ></el-table-column>
            <el-table-column
                v-if="props.showIndexColumn"
                type="index"
                width="80"
                align="center"
                label="序号"
            ></el-table-column>
            <template v-for="item in props.propList" :key="item.prop">
                <el-table-column v-bind="item" align="center" show-overflow-tooltip>
                    <template #default="slotProps">
                        <slot :name="item.slotName" :row="slotProps.row">
                            {{ item.prop && slotProps.row[item.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="footer">
            <slot name="footer" v-if="props.showFooter">
                <el-pagination
                    :page-sizes="[10, 20, 30, 40]"
                    :current-page="props.page.currentPage"
                    :page-size="props.page.pageSize"
                    small="small"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="props.listCount"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from 'vue'
import type { ITableContent } from '@/views/main/system/user/types'
const props = defineProps({
    listData: {
        type: Array,
        required: true
    },
    listCount: {
        type: Number,
        default: 0
    },
    propList: {
        type: Array as PropType<ITableContent>,
        required: true
    },
    showIndexColumn: {
        type: Boolean,
        default: false
    },
    showSelectColumn: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    page: {
        type: Object,
        default: () => ({ pageSize: 10, currentPage: 1 })
    },
    childrenProps: {
        type: Object,
        deafult: () => ({ rowkey: 'id' })
    },
    showFooter: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['selectionChange', 'update:page'])

const handleSelectionChange = (value: any) => {
    emit('selectionChange', value)
}
const handleSizeChange = (value: number) => {
    emit('update:page', { ...props.page, pageSize: value })
}
const handleCurrentChange = (value: number) => {
    emit('update:page', { ...props.page, currentPage: value })
}
</script>

<style scoped lang="less">
.ts-table {
    display: block;
    height: 100%;
}
.table {
    flex: 1;
}
.header {
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.footer {
    display: flex;
    flex-direction: row-reverse;
}
</style>
