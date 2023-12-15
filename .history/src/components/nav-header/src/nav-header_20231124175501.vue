<template>
    <div class="nav-header">
        <el-icon class="icons" @click="handleFoldClick">
            <component :is="isFold ? 'Expand' : 'Fold'"></component>
        </el-icon>
        <div class="content">
            <TsBreadcrumb :breadcrumbArr="breadcrumbArr" />
            <From />

            <UserInfo />
        </div>
    </div>
</template>

<script lang="ts" setup>
import UserInfo from './user-info.vue'
import From from '@/base-ui/form'
import TsBreadcrumb from '@/base-ui/breadcrumb'
import { ref, defineEmits, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { getBreadcrumb } from '@/utils/map-menu'

const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
    isFold.value = !isFold.value
    emit('foldChange', isFold.value)
}
const route = useRoute()
const store = useStore()

const breadcrumbArr = computed(() => {
    const currentPath = route.path
    const userMenus = store.state.login.userMenus
    return getBreadcrumb(userMenus, currentPath)
})
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
