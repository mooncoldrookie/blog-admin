<script>
export default {
  name: 'PostListItem',
}
</script>

<script setup>
import MIcon from '@/components/MIcon'
import ButtonDropdownMenu from '@/views/post/all/components/ButtonDropdownMenu'
import { computed, inject, ref } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  item: Object,
})

const { onEdit } = inject('events')

const updatedTime = computed(() => {
  const date = dayjs(props.item.updatedAt)
  const currentYear = dayjs().year()
  const yearOfDate = date.year()
  if (yearOfDate === currentYear) {
    return date.format('MM-DD HH:mm')
  } else {
    return date.format('YYY-MM-DD HH:mm')
  }
})

const publishDate =
  props.item.publishDate &&
  dayjs(props.item.publishDate).format('YYYY-MM-DD HH:mm')

const publishDateRef = ref()
function onEnter(e) {
  if (publishDateRef.value) {
    publishDateRef.value.style.display = 'block'
  }
}
function onLeave(e) {
  if (publishDateRef.value) {
    publishDateRef.value.style.display = 'none'
  }
}
</script>

<template>
  <div class="post-item-container border-b">
    <div class="post-item-wrapper mx-2 py-4">
      <div class="flex items-center justify-between">
        <div class="flex w-[700px] items-center">
          <div class="rounded bg-blue-100 p-1 text-sm text-blue-800">
            {{ item.category.name }}
          </div>
          <div class="ml-3 text-lg font-medium line-clamp-1">
            {{ item.title }}
          </div>
        </div>
        <div
          @mouseenter="onEnter($event)"
          @mouseleave="onLeave($event)"
          class="timestamp relative text-gray-500"
        >
          <div
            ref="publishDateRef"
            v-if="item.publishDate"
            class="publishDate absolute left-[-36px] top-[-32px] w-48 rounded bg-black p-[2px] text-center text-sm text-white opacity-75 transition transition-all duration-1000 line-clamp-1"
          >
            发布于 {{ publishDate }}
          </div>
          <div class="updatedTime line-clamp-1">编辑于 {{ updatedTime }}</div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between">
        <!--left tips-->
        <div class="flex w-[700px] items-center gap-4 font-mono text-gray-500">
          <div class="flex items-center">
            <div class="line-clamp-1">{{ item.views }}</div>
            <div class="ml-1">阅读</div>
          </div>
          <div v-if="item.top" class="rounded-full bg-red-100 p-1 text-red-800">
            <m-icon icon="up-to-line" />
          </div>
          <div
            v-if="item.status === 0"
            class="rounded-full bg-gray-100 p-1 text-gray-800"
          >
            <m-icon icon="eye-slash" />
          </div>
        </div>
        <!--right controls-->
        <div class="flex items-center gap-6 text-gray-500">
          <button
            @click="onEdit(item)"
            class="flex items-center rounded border px-3 py-[6px] hover:bg-gray-50"
          >
            <m-icon icon="pen" />
            <span class="ml-2">编辑</span>
          </button>
          <button-dropdown-menu :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.publishDate {
  display: none;
}
</style>
