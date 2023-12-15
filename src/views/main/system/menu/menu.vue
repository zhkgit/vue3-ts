<template>
    <div class="menu">
        <PageContent :contentTableConfig="contentTableConfig" pageName="menu">
            <template #footer>{{ null }}</template>
        </PageContent>
    </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
