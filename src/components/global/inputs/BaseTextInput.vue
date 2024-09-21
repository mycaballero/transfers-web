<template>
  <label v-if="label" for="type" class="text-md font-medium mb-1 px-1" :class="labelClass">{{ label }}</label>
  <input
      v-model="value"
      :name="name"
      :type="type"
      class="border-2 border-grey-500 rounded-lg py-2 px-2 text-lg focus:outline-primary h-12"
      :class="`${{ 'base-text-input-error': errorMessage }} ${inputClass}`"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
  />
  <span class="text-red-500 text-xs mt-1 pl-2">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  modelValue: String,
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  inputClass: {
    type: String,
    default: "",
  },
  labelClass: {
    type: String,
    default: "",
  },
});

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});
</script>
<style scoped>
.base-text-input-error {
  @apply border-[#fd0b0be7] !important;
}
.base-text-input-error:focus {
  @apply border-[#fd0b0be7] !important;
}
</style>
