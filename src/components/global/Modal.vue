<script setup lang="ts">
  defineProps<{
    dialog: Boolean,
    classes?: String
  }>()
</script>

<template>
  <dialog class="modal" :open="dialog" data-theme="light">
    <div class="modal-box" :class="classes">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</button>
      <slot/>
    </div>
  </dialog>
</template>