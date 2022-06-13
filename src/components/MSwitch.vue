<script>
export default {
  name: 'MSwitch',
}
</script>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span></span>
    <i class="indicator"></i>
  </label>
</template>

<style lang="scss" scoped>
label {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
input {
  appearance: none;
  display: none;
}

span {
  position: relative;
  display: block;
  width: 60px;
  height: 32px;
  background: #fff;
  transition: 0.5s;
  border-radius: 32px;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.2),
    inset -1px -1px 2px rgba(0, 0, 0, 0.2);
}

.indicator {
  position: absolute;
  left: 0;
  top: 0;
  height: 32px;
  width: 32px;
  background: #5fa7da;
  border-radius: 50%;
  transition: 0.3s;
  transform: scale(0.9);
}

input:checked ~ .indicator {
  left: 28px;
  background: #fff;
}
input:checked ~ span {
  background: #0094a7;
}
</style>
