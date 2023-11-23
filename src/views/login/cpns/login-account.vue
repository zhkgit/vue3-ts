<template>
    <div class="login-account">
        <el-form
            :model="ruleForm"
            label-width="auto"
            :rules="accountRules"
            status-icon
            label-position="left"
            ref="formRef"
        >
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name" type="text" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" show-password type="password" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { useStore } from 'vuex'
import type { ElForm } from 'element-plus'
import { accountRules } from '../config/config'
import localCatch from '@/utils/catch'
import crypto from '@/utils/crypto'

const store = useStore()

const ruleForm = reactive({
    name: localCatch.getCatch('name') ?? '',
    password: localCatch.getCatch('password') ? crypto.decrypt(localCatch.getCatch('password')) : ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
const accountLogin = (isCatche: boolean) => {
    formRef.value?.validate((valid) => {
        if (valid) {
            if (isCatche) {
                localCatch.setCatch('name', ruleForm.name)
                localCatch.setCatch('password', crypto.encrypt(ruleForm.password))
            } else {
                localCatch.deleteCatch('name')
                localCatch.deleteCatch('password')
            }
            store.dispatch('login/actionsLoginAction', { ...ruleForm })
        }
    })
}

defineExpose({ accountLogin })
</script>

<style scoped></style>
