<template>
  <div class="" :class="props.chartClass">
    <div
        class="bg-black max-w-[10rem] mx-auto rounded-lg shadow-lg transition-all h-20 grid justify-center items-center">
      <transition name="fade">
        <span class="text-center text-3xl font-bold text-secondary select-none cursor-normal"
              :class="numberClass">{{ currentNumber }}</span>
      </transition>
      <p class="font-semibold text-xs sm:text-sm md:text-normal text-center text-white" :class="nameClass">
        {{ props.name }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">

import {number, string} from 'yup'
import {onMounted, ref} from 'vue'

const props = defineProps({
  name: {
    type: string,
    required: false,
    default: ''
  },
  number: {
    type: number,
    required: true
  },
  chartClass: {
    type: string,
    default: ''
  },
  numberClass: {
    type: string,
    default: ''
  },
  nameClass: {
    type: string,
    default: ''
  }
})
const currentNumber = ref(0)
const upNumber = () => {
  setInterval(() => {
    if (currentNumber.value < props.number) {
      currentNumber.value += 1
    }
  }, 30)
}

onMounted(() => {
  upNumber()
})
</script>
