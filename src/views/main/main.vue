<template>
    <div class="main">
        <el-container class="main-container">
            <el-aside class="left-menu">
                <NavMenu :collapse="isCollapse"></NavMenu>
            </el-aside>
            <el-container class="page">
                <el-header class="page-header">
                    <NavHeader @foldChange="handleFoldChange"></NavHeader>
                </el-header>
                <el-main class="page-content">
                    <div class="page-info"><router-view></router-view></div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

import { ref } from 'vue'
const isCollapse = ref(false)
const handleFoldChange = (fold: boolean) => {
    isCollapse.value = fold
}
</script>

<style scoped lang="less">
.main {
    width: 100%;
    height: 100%;
}
.main-container,
.page {
    width: 100%;
    height: 100%;
}
.left-menu {
    background-color: #001529;
    width: unset;
}
.page-header {
    padding: 0;
    margin: 0;
    box-shadow: 0px 1px 5px #c0c0c0;

    height: 48px;
}
.el-header,
.el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
}
.page-content {
    height: calc(100% - 48px);
    background: #dcdcdc;
    .page-info {
        background: #fff;
    }
}
</style>
