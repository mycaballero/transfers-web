<script setup lang="ts">

import {useAuthStore} from '@/stores/auth.store'
import {computed, inject} from 'vue'
import {LOGOUT_URL} from '@/constants/HeavyUrlConstants.js'
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const useFetch = inject('useFetchDefault')
const router = useRouter()

const userName = computed(() => {
  return authStore.user?.name
})

const logout = async () => {
  try {
    const {response} = await useFetch(LOGOUT_URL)
    if(response.value.ok){
      authStore.logout()
      await router.push({name: 'login'})
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <router-link class="btn btn-ghost normal-case text-xl" :to="{name: 'home'}">
        <img :src="'https://www.heavymogul.com/web/image/website/1/logo/HeavyMogul?unique=93e39c9'" alt="Logo"  :width="130">
      </router-link>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full bg-white">
            <img :src="require('@/assets/images/profile/profile.svg')" />
          </div>
        </label>
        <ul v-if="authStore.isAuthenticated" tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li v-text="userName"></li>
          <li>
            <router-link :to="{name: 'profile'}" class="justify-between">
              Profile
              <span class="badge">New</span>
            </router-link>
          </li>
          <li @click="logout"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
