<script setup lang="ts">
import {Chart as ChartJS, ArcElement, Tooltip} from 'chart.js'
import {Doughnut} from 'vue-chartjs'
import {computed} from "vue"

ChartJS.register(ArcElement, Tooltip)

const props = defineProps({
  data: {
    required: true,
    type: Array
  },
  title: {
    require: true,
    type: String
  }
})

const computedData = computed(() => {
  let labels = props.data.map(item => item.name)
  let color = labels.map(() => getRandomGrayScaleColor())
  let data = props.data.map(item => item.number)
  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: color,
        data: data
      },
    ]
  }
})

function getRandomGrayScaleColor() {
  const grayValue = Math.floor(Math.random() * 128);
  const cyanValue = Math.floor(Math.random() * 128) + 128;
  const grayHex = grayValue.toString(16).padStart(2, '0');
  const cyanHex = cyanValue.toString(16).padStart(2, '0');
  const color = `#${grayHex}${cyanHex}${cyanHex}`;
  return color.toUpperCase()
}

const options = {
  responsive: true,
  maintainAspectRatio: true,
}

</script>

<template>
  <div class="flex flex-wrap bg-white p-3 rounded-lg shadow-lg">
    <h4 class="w-full mb-3 text-sm font-bold text-gray-600 text-center">{{ title }}</h4>
    <div class="w-full grid mb-2 max-h-48 justify-center">
      <Doughnut width="150" :data="computedData" :options="options"/>
    </div>
    <ul class="w-full flex flex-wrap justify-around px-1">
      <li v-for="(item, i) in computedData.labels" class="flex">
        <div class="w-3 h-3 flex items-center">
          <span :style="`background-color: ${computedData.datasets[0].backgroundColor[i]}`"
                class="block w-2 h-2 rounded-full"></span>
        </div>
        <p class="text-[0.6rem] w-full">{{ item }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
