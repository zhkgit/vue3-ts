<template>
    <div class="user-info">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar
                    size="small"
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
                <span>{{ name }}</span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="userOutBtn">
                        <el-icon><CircleClose /></el-icon>
                        退出登录
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-icon><User /></el-icon>
                        用户信息
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-icon><Tools /></el-icon>
                        系统管理
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import LocalCatch from '@/utils/catch'
const store = useStore()
const router = useRouter()
const name = computed(() => store.state.login.userInfo.name)
const userOutBtn = () => {
    LocalCatch.deleteCatch('token')
    router.replace('/login')
}
</script>

<style scoped lang="less">
.el-dropdown-link {
    display: flex;
    align-items: center;

    span {
        margin-left: 10px;
    }
}
</style>
