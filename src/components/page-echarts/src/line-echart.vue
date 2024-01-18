<template>
    <div class="line-echart">
        <ts-base-echart :option="option"></ts-base-echart>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

import TsBaseEchart from '@/base-ui/echart'
import { EChartsOption } from 'echarts'
const props = defineProps<{
    xLabels: string[]
    values: any[]
}>()

const option = computed<EChartsOption>(() => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {},
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: props.xLabels,
                axisLabel: {
                    interval: 0,
                    formatter: function (value) {
                        var str = ''
                        var num = 4 //每行显示字数
                        var valLength = value.length //该项x轴字数
                        var rowNum = Math.ceil(valLength / num) // 行数

                        if (rowNum > 1) {
                            for (var i = 0; i < rowNum; i++) {
                                var temp = ''
                                var start = i * num
                                var end = start + num

                                temp = value.substring(start, end) + '\n'
                                str += temp
                            }
                            return str
                        } else {
                            return value
                        }
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '分别销量',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: props.values
            }
        ]
    }
})
</script>

<style scoped></style>
