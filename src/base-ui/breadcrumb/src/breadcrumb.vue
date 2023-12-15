<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/">
            <template v-for="item in props.breadcrumbArr" :key="item.name">
                <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { IBreadcrumb } from '../index'

const props = defineProps({
    breadcrumbArr: {
        type: Array as PropType<IBreadcrumb[]>,
        defaulu: () => []
    }
})
</script>

<style scoped></style>
