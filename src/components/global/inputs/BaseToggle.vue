<template>
  <div>
    <input
      type="checkbox"
      class="toggle toggle-sm"
      :name="name"
      :class="`${ disabled? 'cursor-pointer': '' } ${inputClass}`"
      :checked="checked"
      :disabled="disabled"
      @change="update($event)"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue"

const props = defineProps<{
  checked: {
    type: boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  inputClass?: {
    type: String,
    default: ''
  },
  disabled?: {
    type: boolean,
    default: false
  }
  }>()

  const emits = defineEmits<{
    (event: 'update', value: boolean): void
  }>()
  const update = () => {
      checked.value = !checked.value
      emits( 'update', checked.value)
  }

  const checked = ref(false)

  onMounted(() => {
    checked.value = props.checked
  })

  watch(() => props.checked, () => {
    checked.value = props.checked
  }, {deep: true})
</script>
<style scoped>
.toggle {
  @apply cursor-pointer;
}
.toggle:disabled {
  @apply opacity-30 cursor-default;
}
</style>
