<template>
  <div class=" p-2 flex justify-center">
    <div class="relative">
      <span v-if="number" class="w-2.5 h-2.5 absolute flex items-center justify-center
        text-white rounded-full text-[7px] text-center bottom-3 left-2"
        :class="bgColor.includes('bg-')? bgColor: ''"
        :style="bgColor.includes('#')? `background-color: ${ bgColor }`: ''"
      >
        {{ number }}
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  number: Number,
  bgColor: {
    type: String,
    required: true,
    default: '#c1c1c1c'
  },
})

</script>
