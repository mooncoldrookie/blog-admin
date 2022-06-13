<script>
export default {
  name: 'AllPosts',
}
</script>

<script setup>
import { useManagerPost } from '@/views/post/all/hooks'
import { provide, ref, watchEffect } from 'vue'
import { useModal } from '@/plugins/modal/hooks'
import PostListItem from '@/views/post/all/components/PostListItem'
import { useRouter } from 'vue-router'

const {
  pagination,
  postList,
  fetchPostList,
  deletePost,
  setPostTop,
  setPostStatus,
} = useManagerPost()
const modal = useModal()
const router = useRouter()

const onEdit = (item) => {
  router.push(`/post/edit/${item.id}`)
}
const onDelete = async (item) => {
  modal.show({
    title: '确定删除？',
    message: '此操作不可撤销',
    showCancel: true,
    onEnter: async () => {
      const { error, msg } = await deletePost(item.id)
      if (error) {
        return
      }
      await fetchPostList()
    },
  })
}
const onSetTop = async (item) => {
  try {
    const { error, msg } = await setPostTop({ id: item.id, top: !item.top })
    if (error) {
      return
    }
    await fetchPostList()
  } catch (e) {
    console.log(e)
  }
}
const onSetStatus = async (item) => {
  try {
    const { error, msg } = await setPostStatus({
      id: item.id,
      status: item.status === 0 ? 1 : 0,
    })
    if (error) {
      return
    }
    await fetchPostList()
  } catch (e) {
    console.log(e)
  }
}

const onPageChanged = () => {
  window.scrollTo(0, 0)
}

provide('events', {
  onEdit,
  onDelete,
  onSetTop,
  onSetStatus,
})

watchEffect(async () => {
  await fetchPostList()
})
</script>

<template>
  <div>
    <div class="text-gray-600">共 {{ pagination.total }} 条内容</div>
    <div class="post-list">
      <post-list-item
        v-for="item in postList"
        :key="item.id"
        :item="item"
        class="post-item-container border-b"
      />
    </div>
    <div class="flex h-20 items-center justify-center">
      <a-pagination
        v-model:current="pagination.page"
        v-model:pageSize="pagination.size"
        :total="pagination.total"
        hide-on-single-page
        @change="onPageChanged"
      />
    </div>
  </div>
</template>

<style scoped></style>
