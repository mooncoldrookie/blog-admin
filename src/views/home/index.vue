<script>
export default {
  name: 'DashboardView',
}
</script>

<script setup>
import numeral from 'numeral'

import { ref, watchEffect } from 'vue'
import { getBlogStatistics } from '@/api/dashboard'
import LogTable from '@/views/home/components/LogTable'
import VisitsChart from '@/views/home/components/VisitsChart'

const postsCount = ref(0)
const websiteVisits = ref(0)
const postsViews = ref(0)

function formatNumber(number) {
  return numeral(number).format('0.[00]a')
}

async function fetchBlogStatisticsData() {
  try {
    const result = await getBlogStatistics()
    const { data } = result
    postsCount.value = data.postsCount
    websiteVisits.value = data.websiteVisits
    postsViews.value = data.postsViews
  } catch (e) {
    console.log(e)
  }
}

watchEffect(() => {
  fetchBlogStatisticsData()
})
</script>

<template>
  <div>
    <div class="flex justify-around">
      <div class="numbers-wrapper">
        <div class="number-box">{{ postsCount }}</div>
        <div>文章总数</div>
      </div>
      <div class="numbers-wrapper">
        <div class="number-box">{{ formatNumber(websiteVisits) }}</div>
        <div>网站总访问量</div>
      </div>
      <div class="numbers-wrapper">
        <div class="number-box">{{ formatNumber(postsViews) }}</div>
        <div>文章总阅读量</div>
      </div>
    </div>
    <div class="mt-8">
      <visits-chart />
    </div>
    <div>
      <log-table />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@tailwind components;
@layer components {
  .numbers-wrapper {
    @apply min-w-0 flex-1 py-4 text-center;
  }
  .number-box {
    @apply mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap font-mono text-5xl;
  }
}
</style>
