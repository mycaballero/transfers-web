<template>
  <div class="bg-white px-5 py-2 rounded-lg shadow-lg text-primary">
    <h5 class="my-4 text-gray-600 font-bold text-sm">{{ title }}</h5>
    <ul>
      <li
          v-for="(item, index) in items"
          :key="`item-${index+1}`"
          class="flex my-1"
      >
        <p class="flex gap-2 w-2/6 md:w-2/6">
          <span class="text-xs font-bold text-secondary mt-2">{{ index + 1 }}°</span>
          <span class="text-xs text-gray-600 font-bold mt-2">{{ item[name] }}</span>
        </p>
        <div v-if="percentages" class="bg-gray-200 w-full h-8 flex">
          <div v-for="(percentage, i) in percentages[index].percentages"
               class="flex text-sm items-center char-shadow h-full transition-all tooltip tooltip-text-white text-white"
               :data-tip="` ${percentages[index].numbers[i]}/${percentages[index].total}`"
               :style="`width: ${percentage}%; background-color: ${percentages[index].colors[i]} ;`"
          >
            <span v-if="percentage > 0" class="ml-1 text-xs text-gray-600 font-bold text">
                {{ `${Number.isInteger(percentage) ? percentage : percentage.toFixed(1)}% ${percentages[index].titles[i]}` }}
            </span>
          </div>
        </div>
        <i v-if="item[icon]"
           :class="`${item[icon]} text-base text-gray-600 text-center mx-1.5`"
        />
      </li>
    </ul>
    <slot name="category"></slot>
  </div>
</template>

<script setup lang="ts">
import {array, object, string} from 'yup'

defineProps({
  icon: {
    type: string,
    required: false,
    default: null
  },
  items: {
    type: array,
    required: true
  },
  name: {
    type: string,
    required: false,
    default: null
  },
  percentages: {
    type: object,
    required: false,
  },
  title: {
    type: string,
    required: false,
    default: null
  },
})
</script>

<style scoped>
.char-shadow:hover {
  -webkit-box-shadow: 0px 0px 2px 1.5px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 2px 1.5px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 2px 1.5px rgba(0, 0, 0, 0.3);
  z-index: 10;
}
</style>
