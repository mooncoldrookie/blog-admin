<script>
export default {
  name: 'VisitsChart',
}
</script>

<script setup>
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { getVisitsChartData } from '@/api/dashboard'
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  LineChart,
  UniversalTransition,
  CanvasRenderer,
])

const days = ref(7)
const visitsChart = ref()
const chartInstance = shallowRef()

const options = {
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
  },
  dataset: {
    source: [],
  },
  series: [
    {
      type: 'line',
      label: {
        show: true,
      },
    },
  ],
}
function resizeChart() {
  chartInstance.value.resize()
}

async function fetchLogsData(days) {
  try {
    const result = await getVisitsChartData(days)
    if (result.success) {
      chartInstance.value.setOption({
        dataset: {
          source: result.data,
        },
      })
    }
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  chartInstance.value = echarts.init(visitsChart.value)
  chartInstance.value.setOption(options)
  fetchLogsData(days.value)
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  chartInstance.value.dispose()
  window.removeEventListener('resize', resizeChart)
})
</script>

<template>
  <div>
    <h5 class="text-center text-gray-800">近{{ days }}日博客访问量趋势</h5>
    <div ref="visitsChart" class="flex h-[400px] w-full justify-center"></div>
  </div>
</template>

<style scoped></style>
