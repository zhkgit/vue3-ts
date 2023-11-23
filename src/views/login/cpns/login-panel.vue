<template>
    <div class="login-panel">
        <h1 class="title">后台管理系统</h1>
        <el-tabs type="border-card" stretch v-model="currentTab">
            <el-tab-pane name="account">
                <template #label>
                    <span class="denglu">
                        <el-icon><UserFilled /></el-icon>
                        <span>用户登录</span>
                    </span>
                </template>
                <LoginAccount ref="accountRef"></LoginAccount>
            </el-tab-pane>

            <el-tab-pane label="注册" name="phone">
                <template #label>
                    <span class="denglu">
                        <el-icon><Iphone /></el-icon>
                        <span>手机登录</span>
                    </span>
                </template>
                <LoginPhone name="zhk" ref="phoneRef"></LoginPhone>
            </el-tab-pane>
        </el-tabs>
        <div class="control-account">
            <el-checkbox v-model="isControl" label="记住密码"></el-checkbox>
            <el-text class="mx-1" type="primary">忘记密码</el-text>
        </div>
        <el-button type="primary" class="login-btn" size="large" @click="loginBtn">登录</el-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import LoginPhone from './login-phone.vue'
import LoginAccount from './login-account.vue'

const isControl = ref(true)
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()
const currentTab = ref('account')

const loginBtn = () => {
    if (currentTab.value == 'account') {
        accountRef.value?.accountLogin(isControl.value)
    } else {
        console.log('dddd')
    }
}
</script>

<style scoped lang="less">
.login-panel {
    width: 320px;
    .title {
        text-align: center;
    }
    .denglu {
        .el-icon,
        span {
            vertical-align: middle;
        }
        span {
            margin-left: 4px;
        }
    }
    .control-account {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .login-btn {
        width: 100%;
        margin-top: 10px;
    }
}
</style>
