<script>
export default {
  name: 'PostEditor',
}
</script>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { Toolbar, Editor } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { inject } from 'vue'

defineEmits(['getHtml', 'getText'])
// 编辑器实例，用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = { excludeKeys: 'fullScreen' }
const editorConfig = { placeholder: '输入内容...' }
const mode = ref('default')

const { contentHtml, title } = inject('editor')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

defineExpose({
  editor: editorRef,
})

const titleInput = ref(null)
const onTitleInput = (e) => {
  if (!titleInput.value) return
  titleInput.value.style.height = '64px'
  titleInput.value.style.height = titleInput.value.scrollHeight + 1 + 'px'
}
</script>

<template>
  <Toolbar
    :editor="editorRef"
    :defaultConfig="toolbarConfig"
    :mode="mode"
    class="fixed sticky top-16 z-40"
  />
  <textarea
    v-model="title"
    ref="titleInput"
    @input="onTitleInput"
    class="mt-4 h-[64px] w-full resize-none border-0 border-b-[1px] border-b-gray-300 text-2xl font-bold focus:ring-0"
    placeholder="输入标题(最多100个字)"
    maxlength="100"
  />

  <Editor
    v-model="contentHtml"
    :defaultConfig="editorConfig"
    :mode="mode"
    style="height: 600px"
    @onCreated="handleCreated"
    class="editor-content border-b-[1px]"
  />
</template>

<style scoped></style>
