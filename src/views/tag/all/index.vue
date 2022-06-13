<script>
export default {
  name: 'AllTags',
}
</script>

<script setup>
import ManagerViewLayout from '@/components/views/manager-view-layout'

import { provide, ref, watchEffect } from 'vue'
import { useModal } from '@/plugins/modal/hooks'
import { useTag } from '@/views/tag/all/hooks'

const {
  loading,
  pagination,
  getPageTag,
  addTag,
  updateTag,
  deleteTag,
  batchDeleteTag,
} = useTag()
const modal = useModal()

const list = ref([])

const fetchData = async () => {
  try {
    const { data, error, msg } = await getPageTag({
      offset: (pagination.page - 1) * pagination.size,
      limit: pagination.size,
    })
    if (error) {
      return
    }
    list.value = data.list
    pagination.page = data.page
    pagination.total = data.total
  } catch (e) {
    console.log(e)
  }
}

/**
 * 翻页改变pagination的页码信息后 副作用会自动执行
 */
watchEffect(async () => {
  await fetchData()
})

provide('data', list)
provide('pagination', pagination)
provide('loading', loading)

// input
const inputValue = ref('')
const isUpdate = ref(false)

const selectedData = ref([])
const isSelectAll = ref(false)

const setSelected = (e, item) => {
  const index = selectedData.value.findIndex((i) => i.id === item.id)
  if (index >= 0) {
    selectedData.value.splice(index, 1)
  } else {
    selectedData.value.push(item)
  }
  isSelectAll.value = list.value.every((item) =>
    selectedData.value.includes(item)
  )
}

const toggleSelectAll = () => {
  isSelectAll.value = !isSelectAll.value
  if (isSelectAll.value) {
    selectedData.value = list.value.map((item) => item)
  } else {
    selectedData.value = []
  }
}

const isBatch = ref(false)
const toggleBatch = () => {
  isBatch.value = !isBatch.value
  if (!isBatch.value) {
    isSelectAll.value = false
    selectedData.value = []
  }
}
// 批量删除
const batchDelete = () => {
  modal.show({
    title: '确定删除全部选中？',
    message: '此操作不可恢复',
    showCancel: true,
    onEnter: async () => {
      try {
        const ids = selectedData.value.map((item) => item.id)
        const { error, msg } = await batchDeleteTag({ ids })
        if (error) {
          return
        }
        toggleBatch()
        await fetchData()
      } catch (e) {
        console.log(e)
      }
    },
  })
}

const onDelete = (item) => {
  modal.show({
    title: '确定删除？',
    message: '此操作不可恢复',
    showCancel: true,
    onEnter: async () => {
      try {
        const { error, msg } = await deleteTag(item.id)
        if (error) {
          return
        }
        await fetchData()
      } catch (e) {
        console.log(e)
      }
    },
  })
}

// 用来传递当前要更新的项
const currentUpdateItem = ref(null)
const onUpdate = (item) => {
  if (isBatch.value) toggleBatch()
  isUpdate.value = true
  currentUpdateItem.value = item
  inputValue.value = item.name
}

const onAddOrUpdate = async () => {
  // 更新操作
  if (isUpdate.value) {
    if (!inputValue.value.trim()) return
    try {
      const { error, msg } = await updateTag(currentUpdateItem.value.id, {
        name: inputValue.value,
      })
      if (error) {
        return
      }
      await fetchData()
      onCancelUpdate()
    } catch (e) {
      console.log(e)
    }
  } else {
    // 添加操作
    if (!inputValue.value.trim()) return
    try {
      const { error, msg } = await addTag({ name: inputValue.value })
      if (error) {
        return
      }
      await fetchData()
    } catch (e) {
      console.log(e)
    }

    inputValue.value = ''
  }
}
const onCancelUpdate = () => {
  isUpdate.value = false
  inputValue.value = ''
}

provide('batch', { isBatch, toggleBatch, batchDelete })
provide('selected', { selectedData, setSelected })
provide('selectAll', { isSelectAll, toggleSelectAll })
provide('buttonOperation', { onDelete, onUpdate })
provide('input', { inputValue, isUpdate, onAddOrUpdate, onCancelUpdate })
</script>

<template>
  <div>
    <manager-view-layout></manager-view-layout>
  </div>
</template>

<style scoped></style>
