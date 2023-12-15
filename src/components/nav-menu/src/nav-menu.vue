<template>
    <div class="nav-menu">
        <el-menu
            class="el-menu-vertical"
            background-color="#0c2135"
            text-color="#b7bdc3"
            :collapse="props.collapse"
            active-text-color="#0a60bd"
            :default-active="defaultId"
        >
            <div class="logo">
                <img src="~@/assets/img/logo.svg" alt="logo" class="img" />
                <span class="title" v-show="!props.collapse">Vue+TS</span>
            </div>
            <template v-for="menu in menus" :key="menu.id">
                <template v-if="menu.type == 1">
                    <el-sub-menu :index="menu.id + ''">
                        <template #title>
                            <el-icon>
                                <component
                                    v-if="menu.icon"
                                    :is="filterFn(menu.icon)"
                                    class="my-icon"
                                />
                            </el-icon>
                            <span>{{ menu.name }}</span>
                        </template>
                        <template v-for="item in menu.children" :key="item.id">
                            <el-menu-item :index="item.id + ''" @click="handelMenu(item)">
                                <template #title>
                                    <el-icon>
                                        <component
                                            v-if="item.icon"
                                            :is="filterFn(item.icon)"
                                            class="my-icon"
                                        />
                                    </el-icon>
                                    <span>{{ item.name }}</span>
                                </template>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="menu.id + ''">
                        <template>
                            <el-icon>
                                <component
                                    v-if="menu.icon"
                                    :is="filterFn(menu.icon)"
                                    class="my-icon"
                                />
                            </el-icon>
                            <span>{{ menu.name }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
import { computed, defineProps, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentPath } from '@/utils/map-menu'
const store = useStore()
const props = defineProps({
    collapse: {
        type: Boolean,
        default: false
    }
})
const router = useRouter()
const route = useRoute()
const menus = computed(() => store.state.login.userMenus)
const filterFn = computed(() => {
    return function (val: string) {
        const str = 'el-icon-'
        return val.slice(str.length)
    }
})
const currentPath = route.path
const defaultId = ref(getCurrentPath(menus.value, currentPath) + '')

const handelMenu = (menu: any) => {
    router.push({
        path: menu.url ?? '/not-found'
    })
}
</script>
<style scoped lang="less">
.logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 15px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
        height: 100%;
        margin-right: 10px;
    }
    .title {
        font-size: 16px;
        font-weight: 700px;
        color: #fff;
    }
}
.my-icon {
    width: 15px;
    height: 15px;
    margin-right: 4px;
}
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: calc(100% - 48px);
}

/deep/.el-menu-vertical {
    border-right: none;
    --el-menu-hover-bg-color: #0a60bd !important;
}
</style>
