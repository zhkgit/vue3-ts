<template>
    <div class="pie-echarts">
        <ts-base-echart :option="option"></ts-base-echart>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue'
import TsBaseEchart from '@/base-ui/echart'
import { IDataType } from '../types'
import { EChartsOption } from 'echarts'
const props = withDefaults(
    defineProps<{
        pieData: IDataType[]
    }>(),
    {}
)
const option = computed<EChartsOption>(() => {
    return {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                top: '30',
                data: props.pieData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
})
</script>

<style scoped></style>
