<template>
  <div class="bg-white px-5 py-2 rounded-lg shadow-lg" :class="props.chartClass">
    <h5 class="my-2 text-gray-600 text-sm font-bold">{{title}}</h5>
    <div class="grid grid-cols-12 gap-2">
      <ul class="col-span-2">
        <li class="h-8 my-1" v-for="bar in currentData">
          <h6 class="inline-block place-content-center text-[0.6rem] w-full text-end">{{bar.name}}</h6>
        </li>
      </ul>
      <ul class="col-span-10 border-l border-b border-gray-400 mb-2">
        <li :class="i === currentData.length-1? 'mb-3 mt-1' :'my-1'" v-for="(bar, i) in currentData">
          <div class="bg-gray-200 w-full h-8">
            <div
              :class="`flex items-center bg-cyan-350/50 hover:bg-cyan-350 hover:shadow h-full transition-all tooltip tooltip-text-white text-white`"
              :style="`width: ${bar.number}%;`"
              :data-tip="`${bar.number}%`"
            ><span class="ml-1 text-xs text-primary/75 font-bold">{{data[i][number]}}</span></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">

import {array, string} from 'yup'
import {computed, onMounted, ref} from 'vue'

const props = defineProps({
    data: {
      type: array,
      required: true
    },
    name: {
      type: string,
      required: true
    },
    number: {
      type: string,
      required: true
    },
    chartClass:{
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
    },
    title:{
      type:string,
      default: ''
    }
  })
  const currentData = ref(props.data)
  const total = ref(props.data.reduce((accumulator, current) => {
    return accumulator + current[props.number]
  }, 0))
  const upNumber = () => {
    const interval = setInterval(()=>{
      currentData.value = currentData.value.map((item,i) => {
        let finaly = (props.data[i][props.number] / total.value) * 100
        let plus = item.number+1
        return {
          name: item.name,
          number: item.number < finaly? plus : item.number
        }
      })
      if (currentData.value.every((item,i) => {
        let finaly = (props.data[i][props.number] / total.value) * 100
        return item.number >= finaly
      })) {
        clearInterval(interval)
      }
    },10)
  }

onMounted(() => {
  currentData.value = currentData.value.map(item => {
    return {
      name: item[props.name],
      number: 0
    }
  })
  upNumber()
})
</script>

<style>
  .tooltip-text-white {
    --tooltip-text-color: #FFFFFF;
  }
</style>
