<script>
export default {
  name: 'WritePost',
}
</script>

<script setup>
import { ref, watchEffect, computed, provide } from 'vue'
import MSwitch from '@/components/MSwitch'
import ImgUpload from '@/views/post/write/components/ImgUpload'
import ScrollToTop from '@/views/post/write/components/ScrollToTop'
import { useModal } from '@/plugins/modal/hooks'
import { useUpload, useWrite } from '@/views/post/write/hooks'
import PostEditor from '@/views/post/write/components/PostEditor'
import { useRoute, useRouter } from 'vue-router'
import { useGetAllCategory } from '@/views/category/all/hooks'
import { useGetAllTag } from '@/views/tag/all/hooks'

const props = defineProps({
  id: String,
})

const router = useRouter()
const route = useRoute()
// 判断是新增文章还是编辑文章
const isEdit = computed(() => route.name === 'PostEdit')
// 图片上传
const { coverImg, selectFile, addCoverImg, removeFile } = useUpload()
const { getPost, addNewPost, updatePost, getEditPost } = useWrite()

const editorRef = ref()

const post = ref()
// title
const title = ref('')
// text content
const content = ref('')
// html content
const contentHtml = ref('')
// top
const isTop = ref(false)
// status
const isPublish = ref(true)

const modal = useModal()

const { categoryList } = useGetAllCategory()
const { tagList } = useGetAllTag()
const selectedTagList = ref([])
const selectedCategory = ref({})
const selectedTagOptions = ref([])
const selectedCategoryOption = ref('')

watchEffect(async () => {
  if (isNaN(props.id)) return
  await fetchEditedPost(props.id)
})
watchEffect(() => {
  if (!isEdit.value) {
    selectedCategory.value = categoryList.value[0]
  }
})
watchEffect(() => {
  selectedTagOptions.value = selectedTagList.value.map((item) => item.name)
  if (selectedCategory.value) {
    selectedCategoryOption.value = selectedCategory.value.name
  }
})

async function fetchEditedPost(id) {
  if (!isEdit.value) return
  try {
    const { data, error, msg } = await getEditPost(id)
    if (error) {
      return
    }
    categoryList.value = data.categoryList
    tagList.value = data.tagList
    const post = data.post
    title.value = post.title
    contentHtml.value = post.contentHtml
    isTop.value = post.top
    isPublish.value = post.status === 1
    coverImg.value = post.cover
    selectedCategory.value = post.category
    selectedTagList.value = post.tags
  } catch (e) {
    console.log(e)
  }
}

const handleAddNewPost = async () => {
  try {
    const editor = editorRef.value.editor
    content.value = editor.getText()
    contentHtml.value = editor.getHtml()
    if (title.value.trim() === '') {
      modal.show({ title: '提示', message: '文章标题不能为空' })
      return
    }
    if (content.value.trim() === '' || contentHtml.value.trim() === '') {
      modal.show({ title: '提示', message: '文章内容不能为空' })
      return
    }
    const { error, msg } = await addNewPost({
      author: 'SunMoon',
      title: title.value,
      cover: coverImg.value,
      status: isPublish.value ? 1 : 0,
      top: isTop.value,
      contentHtml: contentHtml.value,
      content: content.value,
      tags: selectedTagOptions.value,
      category: selectedCategoryOption.value,
    })
    if (error) {
      return
    }
    await router.push('/post/all')
    clear()
  } catch (e) {
    console.log('error', e)
  }
}

const handleUpdatePost = async () => {
  try {
    const editor = editorRef.value.editor
    content.value = editor.getText()
    contentHtml.value = editor.getHtml()
    if (title.value.trim() === '') {
      modal.show({ title: '提示', message: '文章标题不能为空' })
      return
    }
    if (content.value.trim() === '' || contentHtml.value.trim() === '') {
      modal.show({ title: '提示', message: '文章内容不能为空' })
      return
    }
    const { error, msg } = await updatePost(props.id, {
      author: 'SunMoon',
      title: title.value,
      cover: coverImg.value,
      status: isPublish.value ? 1 : 0,
      top: isTop.value,
      contentHtml: contentHtml.value,
      content: content.value,
      tags: selectedTagOptions.value,
      category: selectedCategoryOption.value,
    })
    if (error) {
      return
    }
    await router.push('/post/all')
    clear()
  } catch (e) {
    console.log('error', e)
  }
}

function clear() {
  title.value = ''
  coverImg.value = ''
  isPublish.value = true
  isTop.value = false
  contentHtml.value = ''
  content.value = ''
  selectedTagList.value = []
  selectedCategory.value = {}
  selectedTagOptions.value = []
  selectedCategoryOption.value = ''
}

provide('editor', {
  contentHtml,
  title,
})
</script>

<template>
  <div class="bg-white pb-48">
    <div id="editor">
      <post-editor ref="editorRef" />
    </div>
    <!--文章设置-->
    <div class="mt-4">
      <div class="text-lg font-bold">发布设置</div>

      <div class="settings-item">
        <div class="w-20">选择分类</div>
        <a-select
          v-if="selectedCategory"
          v-model:value="selectedCategoryOption"
          :options="categoryList.map((item) => ({ value: item.name }))"
          class="w-48"
        />
      </div>
      <div class="settings-item">
        <div class="w-20">添加标签</div>
        <a-select
          v-model:value="selectedTagOptions"
          mode="multiple"
          :options="
            tagList.map((item) => ({
              value: item.name,
            }))
          "
          class="w-48"
        />
      </div>
      <div class="settings-item">
        <div class="w-20">置顶</div>
        <m-switch v-model="isTop" />
      </div>
      <div class="settings-item">
        <div class="w-20">添加封面</div>
        <img-upload
          @add-file="addCoverImg"
          :img-src="coverImg"
          @remove-file="removeFile"
        />
      </div>
      <div class="settings-item">
        <div class="w-20">发布或暂存</div>
        <label class="flex items-center">
          <m-switch v-model="isPublish" />
          <span class="ml-4">{{ isPublish ? '发布' : '暂存' }}</span>
        </label>
      </div>
    </div>
    <!--吸底操作栏-->
    <div
      class="fixed bottom-0 left-0 right-0 z-20 ml-56 flex h-12 items-center justify-between border-t-[1px] bg-white py-2 px-8 text-sm"
    >
      <div>
        <scroll-to-top />
      </div>
      <div>
        <button
          v-if="isEdit"
          @click="handleUpdatePost"
          class="rounded bg-blue-500 py-2 px-6 text-white"
        >
          更新
        </button>
        <button
          v-else
          @click="handleAddNewPost"
          class="rounded bg-blue-500 py-2 px-6 text-white"
        >
          {{ isPublish ? '发布' : '保存' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-content {
  min-height: calc(100vh - 200px);
}
</style>
