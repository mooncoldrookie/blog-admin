<script>
/**
 * 用于标签和分类页面布局的通用组件
 */
export default {
  name: 'ManagerViewLayout',
}
</script>

<script setup>
import ItemAdd from '@/components/views/manager-view-layout/ItemAdd'
import ItemList from '@/components/views/manager-view-layout/ItemList'
import { inject } from 'vue'
import MButton from '@/components/MButton'

const data = inject('data')

const { isBatch, toggleBatch, batchDelete } = inject('batch')
const { inputValue, isUpdate, onAddOrUpdate, onCancelUpdate } = inject('input')
</script>

<template>
  <div>
    <div class="fixed sticky top-16 z-20 flex items-center gap-6 bg-white py-4">
      <!--添加项目-->
      <item-add
        v-model="inputValue"
        :is-update="isUpdate"
        @on-click="onAddOrUpdate"
      />
      <m-button v-if="isUpdate" @click="onCancelUpdate" class="w-20">
        取消编辑
      </m-button>
      <m-button :disabled="data.length === 0" @click="toggleBatch" class="w-20">
        {{ isBatch ? '取 消' : '批量操作' }}
      </m-button>
      <m-button bg="r" v-if="isBatch" @click="batchDelete">批量删除</m-button>
    </div>
    <div class="p-4">
      <item-list />
    </div>
  </div>
</template>

<style scoped></style>
