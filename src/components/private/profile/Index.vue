<template>
  <section class="flex justify-center w-full h-full pt-10">
    <div class="max-w-[1000px] h-5/6 px-4 -translate-y-10">
      <div class="flex justify-center translate-y-12">
        <img class="rounded-full h-24"
             src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
             alt="Foto"
        />
      </div>
      <div class="flex flex-col bg-white rounded-lg shadow-xl">
        <div class="w-full text-center pt-20">
          <div class="flex flex-wrap justify-center">
            <h3 class="text-black font-semibold">{{ authStore.user?.name }}</h3>
          </div>
        </div>
        <div class="divider px-8"></div>
        <div class="flex flex-wrap justify-center px-8 py-3">
          <div v-for="item in leaders" :key="item.title" class="flex w-72 mb-4">
            <div class="flex h-12">
              <icon class="bg-black p-1.5 rounded" :icon="item.icon" color="white" height="47px"/>
            </div>
            <div class="text-black pl-2.5">
              <p class="font-bold">{{ item.title }}</p>
              <p class="">{{ item.content }}</p>
            </div>
          </div>
          <div class="flex w-72 mb-4"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {Icon} from '@iconify/vue'
import {reactive} from 'vue'
import {useAuthStore} from '@/stores/auth.store.ts'

const authStore = useAuthStore()
const leaders = reactive([
  {
    title: 'Cargo',
    content: '',
    icon: 'ic:outline-calendar-month'
  },
])

</script>
