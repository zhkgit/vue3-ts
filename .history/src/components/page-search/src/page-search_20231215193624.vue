<template>
    <div class="page-search">
        <TsForm
            v-bind="props.searchFormConfig"
            :formItems="props.searchFormConfig.formItems"
            v-model="formData"
        >
            <template v-slot:header>
                <h2>用户中心</h2>
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <el-button type="primary" @click="queryBtn">
                        <el-icon><Search /></el-icon>
                        检索
                    </el-button>
                    <el-button @click="refreshBtn">
                        <el-icon><Refresh /></el-icon>
                        重置
                    </el-button>
                </div>
            </template>
        </TsForm>
    </div>
</template>

<script lang="ts" setup>
import TsForm from '@/base-ui/form'
import { ref, defineProps, PropType, defineEmits } from 'vue'
import { useStore } from '@/store'
import { IForm } from '@/base-ui/form'
const props = defineProps({
    searchFormConfig: {
        type: Object as PropType<IForm>,
        required: true
    }
})
const store = useStore()
const emit = defineEmits(['resetBtnClick', 'searchBtnClick'])

const mapFormKey: any = {}
const formItems = props.searchFormConfig.formItems ?? []
for (let item of formItems) {
    mapFormKey[item.field] = ''
}
const formData = ref(mapFormKey)

const refreshBtn = () => {
    for (const key in mapFormKey) {
        formData.value[key] = mapFormKey[key]
    }
    emit('resetBtnClick')
}
const queryBtn = () => {
    emit('searchBtnClick', formData.value)
    store.commit('system/setSearchFormData', formData.value)
}
</script>

<style scoped>
h2 {
    text-align: center;
    padding-top: 15px;
    margin-top: 0;
}
.footer {
    text-align: right;
    padding: 0 20px 10px 20px;
}
</style>
