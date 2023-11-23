<template>
    <div class="login-phone">
        <el-form label-position="left">
            <el-form-item :label="props.name">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps(['name'])
</script>

<style scoped></style>
