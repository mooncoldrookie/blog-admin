<script>
export default {
  name: 'LayoutProfile',
}
</script>

<script setup>
import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import MIcon from '@/components/MIcon'

const router = useRouter()
const user = useUserStore()

const menu = [
  { name: '我的信息', icon: 'id-card', fn: () => router.push('/account/info') },
  { name: '退出登录', icon: 'right-from-bracket', fn: () => user.logout() },
]
</script>

<template>
  <Menu as="div" class="relative">
    <div>
      <MenuButton class="flex max-w-xs items-end gap-2 text-sm">
        <div class="text-white">{{ user.username }}</div>
        <img
          class="h-10 w-10 rounded-full border-[1px] border-solid border-white"
          :src="user.head"
          alt="头像"
        />
      </MenuButton>
    </div>
    <div>
      <MenuItems
        v-motion-fade
        class="absolute right-0 mt-3 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem v-for="item in menu" :key="item.name" v-slot="{ active }">
          <span
            :class="[
              active ? 'bg-gray-100' : '',
              'flex cursor-pointer items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700',
            ]"
            @click="item.fn"
          >
            <m-icon :icon="item.icon" />
            <span>{{ item.name }}</span>
          </span>
        </MenuItem>
      </MenuItems>
    </div>
  </Menu>
</template>

<style scoped></style>
