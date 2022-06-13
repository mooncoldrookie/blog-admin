<script>
export default {
  name: 'RouterViewHolder',
}
</script>

<script setup></script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :exclude="['PostEdit']">
      <component :is="Component" :key="route.name" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
