<script>
export default {
  name: 'ButtonDropdownMenu',
}
</script>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { inject } from 'vue'

defineProps({
  item: Object,
})

const { onDelete, onSetTop, onSetStatus } = inject('events')
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full items-center justify-center rounded border px-3 py-[6px] hover:bg-gray-50 focus:outline-none"
      >
        <m-icon
          icon="angle-down"
          class="h-5 w-5 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
        <span class="ml-2">操作</span>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 z-[1] mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-50 shadow"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="onSetTop(item)"
              :class="[
                active ? 'bg-cyan-500 text-white' : 'text-black',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <m-icon
                :icon="item.top ? 'down-from-line' : 'up-to-line'"
                :active="active"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span class="ml-2">{{ item.top ? '取消置顶' : '置顶' }}</span>
            </button>
          </MenuItem>
        </div>
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="onSetStatus(item)"
              :class="[
                active ? 'bg-cyan-500 text-white' : 'text-black',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <m-icon
                :icon="item.status === 0 ? 'paper-plane-top' : 'do-not-enter'"
                :active="active"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span class="ml-2">
                {{ item.status === 0 ? '发布' : '隐藏' }}
              </span>
            </button>
          </MenuItem>
        </div>
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="onDelete(item)"
              :class="[
                active ? 'bg-cyan-500 text-white' : 'text-black',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm text-rose-500',
              ]"
            >
              <m-icon
                icon="trash-can"
                :active="active"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span class="ml-2">删除</span>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
