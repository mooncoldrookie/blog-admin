<script>
export default {
  name: 'LayoutSidebar',
}
</script>

<script setup>
import SidebarItem from '@/layouts/components/layout-sidebar/SidebarItem'

defineProps({
  menuList: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="mt-4 ml-4">
    <sidebar-item :list="menuList" />
  </div>
</template>

<style scoped></style>
