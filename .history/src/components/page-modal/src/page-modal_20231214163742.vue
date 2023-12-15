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
import { ref, defineProps, PropType, defineExpose } from 'vue'
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
    }
})
const mapFormKey: any = {}
const formItem = props.modalConfig.formItems ?? []
for (let item of formItem) {
    mapFormKey[item.field] = ''
}
const formData = ref(mapFormKey)

const dialogVisible = ref(false)
defineExpose({
    dialogVisible
})
</script>

<style scoped></style>
