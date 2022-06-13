<script>
export default {
  name: 'MModal',
}
</script>
<script setup>
import { getCurrentInstance, onBeforeMount, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import MButton from '@/components/MButton'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  showMask: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['on-enter', 'on-close', 'update:modelValue'])
const instance = getCurrentInstance()
onBeforeMount(() => {
  instance._hub = {
    'on-close': () => {},
    'on-enter': () => {},
  }
})

const handleEnter = () => {
  emit('on-enter')
  instance._hub['on-enter']()
}
const handleClose = () => {
  emit('on-close')
  emit('update:modelValue', false)
  instance._hub['on-close']()
}

const pureClose = () => {
  instance._hub['on-close']()
}
</script>

<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="pureClose" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100 "
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
        v-if="showMask"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 translate-y-[-5rem]"
            enter-to="opacity-100  translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-[-5rem]"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl border-4 border-cyan-600 bg-white p-6 text-left align-middle transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2 py-4">
                <p class="text-sm text-gray-500">
                  {{ message }}
                </p>
              </div>

              <div class="mt-4 flex items-center justify-center gap-12">
                <m-button
                  v-if="showCancel"
                  @click="handleClose"
                  bg="w"
                  size="l"
                >
                  取 消
                </m-button>
                <m-button @click="handleEnter" size="l">确 认</m-button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
