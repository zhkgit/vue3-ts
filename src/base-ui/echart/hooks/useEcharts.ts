import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'
echarts.registerMap('china', chinaMapData)

export function useEcharts(el: HTMLElement) {
    const echartInstance = echarts.init(el)
    const updateSize = () => {
        echartInstance.resize()
    }
    window.addEventListener('resize', () => {
        echartInstance.resize()
    })
    const setOption = (option: echarts.EChartsOption) => {
        echartInstance.setOption(option)
    }
    return {
        echartInstance,
        setOption,
        updateSize
    }
}
