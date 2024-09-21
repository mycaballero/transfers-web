<template>
  <button
      class=" hover:shadow-lg hove:text-primary font-semibold text-white rounded-lg px-2 transition-all h-7"
      :class="`${disabled?'opacity-20':'oapcity-100'} ${classButton} `"
      :disabled="disabled"
      @click="emit('click')">{{text}}<slot></slot>
  </button>
</template>
<script setup lang="ts">
defineProps<{
  disabled?: {
    type: boolean,
    default: false,
  },
  text: String,
  classButton?: String,
}>()
const emit = defineEmits<{
  (event: 'click'): void,
}>()
</script>
