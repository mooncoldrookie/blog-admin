<script>
export default {
  name: 'ButtonGroup',
}
</script>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

defineEmits(['on-delete', 'on-update'])
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full items-center justify-center rounded bg-gray-100 px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none"
      >
        操作
        <m-icon
          icon="angle-down"
          class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
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
              @click="$emit('on-update')"
              :class="[
                active ? 'bg-cyan-500 text-white' : 'text-black',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <m-icon
                icon="pen"
                :active="active"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span class="ml-2">编辑</span>
            </button>
          </MenuItem>
        </div>
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="$emit('on-delete')"
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
