<script setup lang="ts">

import {LOGIN_URL} from "@/constants/HeavyUrlConstants"
import {inject, ref} from 'vue'
import router from "@/router/router"
import {useAuthStore} from "@/stores/auth.store"

const authStore = useAuthStore()
const message = ref(null)
const useFetch = inject('useFetchDefault')
const model = ref({
  email: null,
  password: null
})
const disabled = ref(false)
const login = async () => {
  disabled.value = true
  try {
    const {response,data} = await useFetch(LOGIN_URL,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model.value)
    }).json()
    console.log(response.value)
    if (response.value.ok) {
      authStore.setToken(data.value.token)
      authStore.setUser(data.value.user)
      await router.push({name: 'home'})
    } else {
      message.value = 'Correo o contraseña incorrecto!'
    }
  }catch (error) {
    console.error(error)
  }
  disabled.value = false
}

</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full sm:w-6/12 relative min-h-screen flex flex-col sm:justify-center items-center">
      <div class="relative max-w-full sm:max-w-sm w-full">
        <div v-if="!disabled" class="relative w-full rounded-3xl  px-6 py-4 shadow-md bg-white/30">
          <label for="" class="block mt-3 text-lg text-gray-700 text-center font-semibold">
            Login
          </label>
          <div class="mt-10">
            <div class="mt-7">
              <input v-model="model.email" type="email" placeholder="Correo electronico" class="mt-1 px-3 block w-full border-none
              bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
            </div>
            <div class="mt-7">
              <input v-model="model.password" type="password" placeholder="Contraseña" class="mt-1 px-3 block w-full border-none bg-gray-100 h-11
              rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
            </div>
            <div v-if="message" class="p-2 my-5 shadow-xl bg-white rounded-box text-red-600 transition-all">
              <span class="transition-all">{{message}}</span>
            </div>
            <div class="mt-7">
              <button @click="login" class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner
              focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>