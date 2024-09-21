<script setup lang="ts">
import {useField} from 'vee-validate';
import {bool} from "yup";

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
  counter: {
    type: Number,
    default: 0
  }
});

const {value, errorMessage} = useField(() => props.name, undefined, {
  syncVModel: true,
})
</script>

<template>
  <label for="type" class="text-md font-medium mb-1 px-1" :class="labelClass">{{ label }}</label>
  <textarea
    v-model="value"
    :name="name"
    :class="`${{ 'base-text-input-error': errorMessage }} ${inputClass}`"
    @input="$emit('input', $event.target.value)"
    :disabled="disabled"
  ></textarea>
  <div class="flex justify-between mt-1 px-2">
    <span class="text-red-500 text-xs">{{ errorMessage }}</span>
    <span v-if="counter > 0" :class="value?.length > counter? 'text-xs text-red-500':'text-xs'">{{value?.length||0}}/{{counter}}</span>
  </div>
</template>
<style scoped>
.base-text-input-error {
  @apply border-[#fd0b0be7] !important;
}

.base-text-input-error:focus {
  @apply border-[#fd0b0be7] !important;
}
</style>

