<template>
    <div class="dashboard">
        <el-row :gutter="10">
            <el-col :span="7">
                <ts-card title="分类商品数量(饼图)">
                    <pie-echart :pieData="categoryGoodsCount"></pie-echart>
                </ts-card>
            </el-col>
            <el-col :span="10">
                <ts-card title="不同城市商品销量">
                    <map-echart :mapData="addressGoodsSale"></map-echart>
                </ts-card>
            </el-col>
            <el-col :span="7">
                <ts-card title="分类商品数量(玫瑰图)">
                    <rose-echart :roseData="categoryGoodsCount"></rose-echart>
                </ts-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" class="second-row">
            <el-col :span="12">
                <ts-card title="分类商品的销量">
                    <line-echart v-bind="categoryGoodsSale"></line-echart>
                </ts-card>
            </el-col>
            <el-col :span="12">
                <ts-card title="分类商品的收藏">
                    <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
                </ts-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import TsCard from '@/base-ui/card'
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from '@/components/page-echarts'
import { useStore } from '@/store'
const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')
const categoryGoodsCount = computed(() => {
    return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { value: item.goodsCount, name: item.name as string }
    })
})

const categoryGoodsSale = computed(() => {
    const xLabels: string[] = []
    const values: any[] = []
    const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
    for (const item of categoryGoodsSale) {
        item.name == '床上用品' ? xLabels.push('北京市最好的床上用品大全') : xLabels.push(item.name)
        item.goodsCount ? values.push(item.goodsCount) : values.push(6466)
    }
    return { xLabels, values }
})

const categoryGoodsFavor = computed(() => {
    const xLabels: string[] = []
    const values: any[] = []
    const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
    for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        item.goodsFavor ? values.push(item.goodsFavor) : values.push(999)
    }
    return { xLabels, values }
})

const addressGoodsSale = computed(() => {
    return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { value: item.count, name: item.address as string }
    })
})
</script>

<style scoped lang="less">
.dashboard {
    width: 100%;
}
.second-row {
    margin-top: 15px;
}
</style>
