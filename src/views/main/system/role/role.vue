<template>
    <div class="role">
        <PageContent :contentTableConfig="contentTableConfig" pageName="role"></PageContent>
    </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
