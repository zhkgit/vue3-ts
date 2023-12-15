<template>
    <div class="page-modal">
        <el-dialog v-model="dialogVisible" :title="props.modalName" width="30%" center>
            <span>
                <TsForm v-bind="props.modalConfig" v-model="formData"></TsForm>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, defineExpose, watch } from 'vue'
import TsForm from '@/base-ui/form'
import { IForm } from '@/base-ui/form'
import { usePageModal } from '@/hooks/usePageModal'
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
    }
})
const mapFormKey: any = {}
const formItems = props.modalConfig?.formItems ?? []
for (const item of formItems) {
    mapFormKey[item.field] = ''
}

const formData = ref(mapFormKey)
console.log(props.defaultInfo)
watch(
    props.defaultInfo,
    (newValue) => {
        console.log('dddd', newValue)
        formData.value = newValue
    },
    { deep: true }
)

const dialogVisible = ref(false)
defineExpose({
    dialogVisible,
    formData,
    useFormInit
})
</script>

<style scoped></style>
