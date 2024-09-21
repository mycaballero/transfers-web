<template>
  <div class="grid place-items-center h-screen h-screen">
    <div class="text-center">
      <h2 class="text-9xl font-bold bg-gradient-to-r from-blue-350 to-cyan-350 bg-clip-text text-transparent animate-gradient">404</h2>
      <p class="mb-10">{{ $t('cant_you_find_it') }}</p>
      <BaseButton @click="router.push({name: 'home'})" :text="$t('try_again')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/global/buttons/BaseButton.vue"
import router from "@/routes/router"
</script>

<style scoped>
  .animate-gradient {
    animation: gradientMove 3s linear infinite;
  }

  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }


</style>
