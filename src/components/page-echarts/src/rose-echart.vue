<template>
    <div class="rose-echart">
        <ts-base-echart :option="option"></ts-base-echart>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import TsBaseEchart from '@/base-ui/echart'
import { IDataType } from '../types'
const props = defineProps<{
    roseData: IDataType[]
}>()
const option = computed(() => {
    return {
        legend: {
            top: 'bottom'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                bottom: '30',
                name: 'Nightingale Chart',
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: props.roseData
            }
        ]
    }
})
</script>

<style scoped></style>
