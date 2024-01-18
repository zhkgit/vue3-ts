<template>
    <div class="base-echart">
        <div class="" ref="echartRef" :style="{ width: width, height: height }"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, withDefaults, defineProps } from 'vue'
import { EChartsOption } from 'echarts'
import { useEcharts } from '../hooks/useEcharts'
const props = withDefaults(
    defineProps<{
        width?: string
        height?: string
        option: EChartsOption
    }>(),
    {
        width: '100%',
        height: '300px'
    }
)
const echartRef = ref<HTMLDivElement>()
onMounted(() => {
    const { setOption } = useEcharts(echartRef.value!)
    watchEffect(() => {
        setOption(props.option)
    })
})
</script>

<style scoped></style>
