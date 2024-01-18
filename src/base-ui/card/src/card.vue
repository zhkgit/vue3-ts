<template>
    <div class="card">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>{{ title }}</span>
                </div>
            </template>
            <slot></slot>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
withDefaults(
    defineProps<{
        title: string
    }>(),
    {
        title: 'Default title'
    }
)
</script>

<style scoped></style>
