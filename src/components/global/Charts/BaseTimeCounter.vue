<template>
  <div class="flex justify-center">
    <span v-if="finalDate">
      <span v-if="final >= 0">
        {{ formatTime(final) }}
      </span>
      <span v-else >
        0:0:0:0
      </span>
    </span>
    <span v-else >
      <span v-if="counter > 0">
          {{ formatTime(counter) }}
      </span>
      <span v-else >
        0:0:0:0
      </span>
    </span>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue'

  const props = defineProps<{
    name: String,
    initialDate?: Date,
    finalDate?: Date
  }>()
  const counter = ref(0)
  const final = ref(0)
  const formatTime = (timeInSeconds: number): string => {
    const days = Math.floor(timeInSeconds / (60 * 60 * 24))
    const hours = Math.floor((timeInSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60)
    const seconds = timeInSeconds % 60
    return `${days}:${hours}:${minutes}:${seconds}`
  }

  const updateCounter = () => {
    setInterval(() => {
      counter.value++
    }, 1000)
  }

  watchEffect(() => {
    if (props.finalDate) {
      final.value = Math.floor((new Date(props.finalDate).getTime() - new Date(props.initialDate).getTime()) / 1000)
    } else {
      counter.value = Math.floor(( new Date().getTime() - new Date(props.initialDate).getTime()) / 1000)
      updateCounter()
    }
  })

onMounted(function () {
  if (props.finalDate) {
    final.value = Math.floor((new Date(props.finalDate).getTime() - new Date(props.initialDate).getTime()) / 1000)
  }
})
</script>

<style scoped>

</style>
