<script>
export default {
  name: 'ItemList',
}
</script>

<script setup>
import MIcon from '@/components/MIcon'
import MInput from '@/components/MInput'
import { inject } from 'vue'
import ButtonGroup from '@/components/views/manager-view-layout/ButtonGroup'

const data = inject('data')
const { isBatch } = inject('batch')
const { isSelectAll, toggleSelectAll } = inject('selectAll')
const { selectedData, setSelected } = inject('selected')
const { onDelete, onUpdate } = inject('buttonOperation')
const pagination = inject('pagination')

const onChangePage = () => {
  window.scrollTo(0, 0)
}
</script>

<template>
  <div v-if="data.length === 0" class="h-96 text-gray-400">
    <div class="mt-48 flex items-center justify-center gap-2 text-3xl">
      <m-icon icon="empty-set"></m-icon>
      <span class="text-xl">空空如也</span>
    </div>
  </div>
  <div v-else>
    <div class="text-sm">共 {{ pagination.total }} 条数据</div>
    <div class="h-8 pl-2 pt-4 pt-2">
      <label v-if="isBatch" class="inline-flex items-center gap-4">
        <input
          type="checkbox"
          :checked="isSelectAll"
          @change="toggleSelectAll"
        />
        <span class="select-none">全选</span>
      </label>
    </div>
    <div class="pb-10">
      <div
        v-for="item in data"
        :key="item.id"
        class="mb-4 flex min-h-[64px] items-center gap-3 border-b border-b-gray-100 p-1 transition"
      >
        <div class="flex h-6 w-6 items-center justify-center">
          <m-input
            v-if="isBatch"
            type="checkbox"
            :checked="selectedData.map((i) => i.id).includes(item.id)"
            @change="setSelected($event, item)"
          />
        </div>
        <div class="w-1/2 break-all line-clamp-1 hover:line-clamp-none">
          {{ item.name }}
        </div>
        <div class="flex w-1/3 items-center justify-center gap-4">
          <button-group
            @on-delete="onDelete(item)"
            @on-update="onUpdate(item)"
          />
        </div>
      </div>
    </div>
    <div class="flex h-20 items-center justify-center">
      <a-pagination
        v-model:current="pagination.page"
        v-model:pageSize="pagination.size"
        :total="pagination.total"
        hide-on-single-page
        @change="onChangePage"
      />
    </div>
  </div>
</template>

<style scoped></style>
