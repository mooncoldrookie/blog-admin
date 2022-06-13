<script>
export default {
  name: 'SidebarItem',
}
</script>

<script setup>
import MIcon from '@/components/MIcon'

defineProps({
  list: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="text-gray-600">
    <template v-for="item in list">
      <div v-if="item.children" :key="item.name">
        <div class="flex items-center gap-2 py-4 text-sm text-gray-500">
          <m-icon :icon="item.meta.icon" class="ml-4" />
          <div>{{ item.meta.title }}</div>
        </div>
        <sidebar-item :list="item.children" />
      </div>
      <router-link
        v-else-if="!item.meta.hidden"
        :to="item.path"
        :key="item.name"
        v-slot="{ isExactActive }"
      >
        <div class="pl-6 text-sm transition duration-200">
          <div
            :class="{ 'border-l-black text-black ': isExactActive }"
            class="border-l-2 py-2"
          >
            <div class="pl-6">
              <div v-if="item.meta.icon" class="flex items-center gap-2">
                <m-icon :icon="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
              </div>
              <div v-else>{{ item.meta.title }}</div>
            </div>
          </div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<style scoped></style>
