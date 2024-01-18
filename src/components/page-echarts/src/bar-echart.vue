<template>
    <div class="bar-echart">
        <ts-base-echart :option="option"></ts-base-echart>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import TsBaseEchart from '@/base-ui/echart'
import * as echarts from 'echarts'
const props = defineProps<{
    xLabels: string[]
    values: any[]
}>()
const option = computed<echarts.EChartsOption>(() => {
    return {
        title: {
            text: '特性示例：渐变色 阴影 点击缩放',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
            data: props.xLabels,
            axisLabel: {
                interval: 0,
                inside: true,
                color: '#fff'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999'
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: props.values
            }
        ]
    }
})
</script>

<style scoped></style>
