<template>
  <dialog class="modal" :open="dialog" data-theme="light">
    <div class="modal-box border-solid border-2 border-black p-6" :class="classes">
      <div class="flex justify-between w-full">
        <h3 class="text-xl text-primary font-bold mt-1">{{ title }}</h3>
        <button class="btn btn-sm btn-circle" @click="$emit('close')">
          <Icon icon="typcn:times" height="25px"/>
        </button>
      </div>
      <div class="flex pt-6 px-2">
        <slot name="content" />
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
import {Icon} from "@iconify/vue";

defineProps<{
  dialog: Boolean,
  classes?: String,
  title: String
}>()
</script>
