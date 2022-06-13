<script>
export default {
  name: 'LayoutNav',
}
</script>

<script setup>
defineProps({
  navItems: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="flex gap-4 text-gray-400">
    <router-link
      v-for="nav in navItems"
      :to="nav.path"
      :key="nav.name"
      v-slot="{ isActive }"
    >
      <span
        :class="[isActive && 'rounded bg-cyan-700 text-white']"
        class="px-4 py-2"
      >
        {{ nav.meta.title }}
      </span>
    </router-link>
  </div>
</template>

<style scoped></style>
