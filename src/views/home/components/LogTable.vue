<script>
export default {
  name: 'LogTable',
}
</script>

<script setup>
import { useLog } from '@/views/home/hooks'
import { getOS, getBrowser } from '@/utils'
import dayjs from 'dayjs'

const { pagination, loginLogs } = useLog()
</script>

<template>
  <div>
    <div
      class="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 transition hover:bg-gray-200"
    >
      <span>最近管理平台登录记录</span>
    </div>
    <div class="bg-gray-50 px-4 pt-4 pb-2 text-sm text-gray-500">
      <div class="min-h-[240px]">
        <table class="log-table">
          <thead>
            <tr>
              <th scope="col">日期</th>
              <th scope="col">用户名</th>
              <th scope="col">权限</th>
              <th scope="col">操作系统</th>
              <th scope="col">浏览器</th>
              <th scope="col">ip地址</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in loginLogs" :key="item.id">
              <td>
                {{ dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
              </td>
              <td>
                {{ item.username }}
              </td>
              <td>
                {{
                  item.role === 'admin'
                    ? '管理员'
                    : item.role === 'user'
                    ? '普通用户'
                    : '游客'
                }}
              </td>
              <td>
                {{ getOS(item.ua) }}
              </td>
              <td>
                {{ getBrowser(item.ua) }}
              </td>
              <td>
                {{ item.ip }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center">
        <a-pagination
          size="small"
          simple
          v-model:current="pagination.page"
          v-model:pageSize="pagination.size"
          :total="pagination.total"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.log-table {
  width: 100%;
  table-layout: fixed;
  margin: 0 auto;
  thead th {
    width: 14%;
  }
  thead th:first-child {
    width: 28%;
  }

  th,
  td {
    padding: 8px 20px;
    text-align: center;
  }
}
</style>
