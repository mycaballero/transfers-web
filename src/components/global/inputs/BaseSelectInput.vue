<template>
  <label v-if="label" for="type" class="text-md font-medium mb-1 px-1" :class="labelClass">{{ label }}</label>
  <select
      v-model="value"
      :name="name"
      class="border-2 border-grey-500 rounded-lg py-2 px-2 focus:outline-primary h-12"
      :class="inputClass"
      @input="$emit('input', $event.target.value)">
    <option
      v-for="(option,i) in options"
      :key="i"
      :value="itemValue? option[itemValue] : option"
      v-text="itemText? option[itemText] : option"
      class="py-3"
      ></option>
    <option v-if="other" :value="'OTR'"
      v-text="$t('other')"></option>
  </select>
  <span class="text-[#fd0b0be7] text-xs mt-1">{{ errorMessage }}</span>
</template>

<script lang="ts" setup>
import {useField} from "vee-validate"

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: {},
  },
  itemText: {
    type: String,
    default: null
  },
  itemValue: {
    type: String,
    default: null
  },
  other: {
    type: Boolean,
    default: false
  },
  inputClass: {
    type: String,
    default: null
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
