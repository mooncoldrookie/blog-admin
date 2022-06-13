<script>
import LayoutLogo from '@/layouts/components/LayoutLogo'
export default {
  name: 'AdminLayout',
  components: { LayoutLogo },
}
</script>

<script setup>
import LayoutProfile from '@/layouts/components/LayoutProfile'
import LayoutSidebar from '@/layouts/components/layout-sidebar'
import { routes } from '@/router/routes'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import LayoutNav from '@/layouts/components/LayoutNav'

const route = useRoute()
const menuList = ref([])

const navItems = routes.filter((item) => item.children)

watchEffect(() => {
  if (route.matched[0].path === '/') {
    menuList.value = routes.filter((item) => item.name === 'Main')
  } else if (route.matched[0].path === '/account') {
    menuList.value = routes.filter((item) => item.name === 'Account')
  }
})
</script>

<template>
  <div class="admin-layout min-h-full">
    <!--nav start-->
    <nav class="sticky top-0 z-50 bg-cyan-800">
      <div class="app-container px-4">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center justify-between">
            <layout-logo />
            <layout-nav :nav-items="navItems" class="ml-16" />
          </div>
          <layout-profile />
        </div>
      </div>
    </nav>
    <!--nav end-->
    <!--main start-->
    <div class="app-container relative">
      <aside
        class="fixed inset-0 top-16 z-20 min-h-screen w-56 overflow-y-auto border-r-2"
      >
        <layout-sidebar :menu-list="menuList" />
      </aside>

      <main class="ml-56 p-6 2xl:p-8">
        <!--vue-router4 bug 嵌套路由不可以用keep-alive-->
        <router-view />
      </main>
    </div>
    <!--main end-->
  </div>
</template>

<style scoped></style>
