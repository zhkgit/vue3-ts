<template>
    <div class="page-modal">
        <el-dialog
            v-model="dialogVisible"
            :title="props.modalName"
            width="30%"
            center
            destroy-on-close
        >
            <TsForm v-bind="props.modalConfig" v-model="formData"></TsForm>
            <slot></slot>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible">取消</el-button>
                    <el-button type="primary" @click="dialogVisibl"> 确定 </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, defineExpose, watch } from 'vue'
import { useStore } from '@/store'
import TsForm from '@/base-ui/form'
import { IForm } from '@/base-ui/form'

const props = defineProps({
    modalConfig: {
        type: Object as PropType<IForm>,
        required: true
    },
    modalName: {
        type: String,
        default: '新建用户'
    },
    defaultInfo: {
        type: Object,
        default: () => ({})
    },
    pageName: {
        type: String,
        default: ''
    },
    otherInfo: {
        type: Object,
        default: () => ({})
    }
})
const store = useStore()
const mapFormKey: any = {}
const formItems = props.modalConfig?.formItems ?? []
for (const item of formItems) {
    mapFormKey[item.field] = ''
}

const formData = ref<any>(mapFormKey)
const dialogVisible = ref(false)

watch(
    () => props.defaultInfo,
    (newValue) => {
        for (const item of formItems) {
            formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
    },
    { deep: true }
)

const dialogVisibl = () => {
    if (Object.keys(props.defaultInfo).length > 0) {
        store.dispatch('system/editPageDataAction', {
            pageName: props.pageName,
            editData: { ...formData.value, ...props.otherInfo },
            id: props.defaultInfo.id
        })
    } else {
        store.dispatch('system/createPageDataAction', {
            pageName: props.pageName,
            newData: { ...formData.value, ...props.otherInfo }
        })
    }
    dialogVisible.value = false
}

defineExpose({
    dialogVisible,
    formData
})
</script>

<style scoped></style>
