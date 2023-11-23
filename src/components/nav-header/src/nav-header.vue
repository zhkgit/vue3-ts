<template>
    <div class="nav-header">
        <el-icon class="icons" @click="handleFoldClick">
            <component :is="isFold ? 'Expand' : 'Fold'"></component>
        </el-icon>
        <div class="content">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>面包屑</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">用户信息</a></el-breadcrumb-item>
            </el-breadcrumb>
            <UserInfo />
        </div>
    </div>
</template>

<script lang="ts" setup>
import UserInfo from './user-info.vue'
import { ref, defineEmits } from 'vue'
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
    isFold.value = !isFold.value
    emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
    height: 48px;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
}
.icons {
    font-size: 25px;
}
.content {
    flex: 1;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
}
</style>
