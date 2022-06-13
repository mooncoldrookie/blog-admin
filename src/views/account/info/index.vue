<script>
export default {
  name: 'AccountInfo',
}
</script>

<script setup>
import AvatarEditor from '@/views/account/info/components/AvatarEditor'
import { useUserStore } from '@/stores/user'
import UsernameEditor from '@/views/account/info/components/UsernameEditor'
import EmailEditor from '@/views/account/info/components/EmailEditor'
const user = useUserStore()
</script>

<template>
  <div class="flex flex-col">
    <avatar-editor />
    <username-editor />
    <email-editor />
    <div class="field-content border-b py-8 transition">
      <h4 class="absolute leading-9">我的权限</h4>
      <div class="flex w-[600px] items-center gap-4 pl-36 text-base leading-9">
        <span>{{ user.roleName }}</span>
      </div>
    </div>
  </div>
</template>
