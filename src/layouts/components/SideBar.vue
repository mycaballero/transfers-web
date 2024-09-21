<template>
  <section :class="isOpen? 'w-80' : 'w-16'"
           class=" flex flex-col justify-between bg-white h-screen pt-6 transition-all">
    <div :class="isOpen ? 'px-4' : 'px-2'">
      <div class="px-2 h-10 mb-5">
        <button class="block" @click="changeSection('/')">
          <img
              :class="isOpen? 'scale-100' : 'scale-0'"
              class="hover:drop-shadow-[0_1px_4px_rgba(255,255,255,0.50)] block absolute h-8 transition-all"
              :src="'https://www.heavymogul.com/web/image/website/1/logo/HeavyMogul?unique=93e39c9'"
              alt="logo Heavy"
          />
          <img
              :class="isOpen? 'scale-0' : 'scale-100'"
              class="hover:drop-shadow-[0_1px_4px_rgba(255,255,255,0.50)] block absolute h-8 transition-all"
              :src="'./src/assets/images/logos/logo-heavy-mini.png'"
              alt="logo Active One"
          />
        </button>
      </div>
      <nav class="overflow-y-auto max-h-80" :class="isOpen ? 'pl-3' : ''">
        <ul>
          <li v-for="item in list" :key="item.name"
              :class="`${isOpen? 'px-3' : 'justify-center px-2'} ${item.route === currentRoutePath? 'bg-secondary/90 ':''}`"
              class="h-10 group w-full hover:bg-secondary/90 rounded-lg mb-2 flex align-middle">
            <button class="w-full" @click="changeSection(item.route)">
              <span class="text-lg font-medium group-hover:text-white transition-all">
                <span v-if="isOpen" class="flex align-middel group-hover:text-white" :class="`${item.route === currentRoutePath? 'text-white ':'text-black '}`" >
                  <Icon :icon="item.icon" class="mr-2" height="25px"/> {{ $t(`routes.${item.name}`) }}
                </span>
                <span v-else class="group-hover:text-white" :class="`${item.route === currentRoutePath? 'text-white ':'text-black '}`"> <Icon class="mx-auto" :icon="item.icon" height="25px"/> </span>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex flex-wrap">
      <div :class="isOpen? 'justify-end mr-2' : 'justify-center'" class="flex w-full mb-2">
        <button class="btn px-2.5 text-white" @click="isOpen = !isOpen">
                    <span>
                      <Icon :icon="isOpen? 'ic:baseline-menu-open' : 'ic:baseline-menu'" height="25px"/>
                    </span>
        </button>
      </div>
      <div class="flex flex-nowrap items-stretch w-full bg-gray-600">
        <div :class="isOpen? 'w-3/12 pr-1' : 'w-full'" class="flex justify-end items-center">
          <button class="avatar h-16 p-1" @click="changeSection('/profile')">
            <img class="rounded-full hover:drop-shadow-[0_1px_4px_rgba(255,255,255,0.50)] transition-all"
                 referrerpolicy="no-referrer"
                 src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                 :alt="user.name"
            />
          </button>
        </div>
        <div :class="isOpen? 'w-7/12' : 'hidden'" class="flex items-center transition-all">
          <div class="text-white">
            <p class="font-medium cursor-default" v-text="userName"></p>
            <router-link :to="{name: 'profile'}" class="hover:underline transition-all text-xs">{{
                $t('view_profile')
              }}
            </router-link>
          </div>
        </div>
        <div :class="isOpen? 'w-2/12' : 'hidden'" class="flex justify-center pt-2">
          <div class="tooltip" data-tip="Cerrar sesión">
            <button class="h-6" @click="logout()">
              <Icon icon="ic:baseline-log-out" class="hover:text-white transition-all"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {computed, inject, onMounted, ref} from 'vue'
import {Icon} from '@iconify/vue'
import {LOGOUT_URL} from '@/constants/HeavyUrlConstants.js'
import {useAuthStore} from "@/stores/auth.store"
import {useRouter} from "vue-router"
import {PERMISSIONS_CONSTANTS} from '@/constants/PermissionsConstants'
import {ROLES_CONSTANTS} from '@/constants/RolesConstants.js'

const router = useRouter()
const authStore = useAuthStore()
const useFetch = inject('useFetchDefault') as (url: string) => Promise<{ response: { value: { ok: boolean } } }>
const list = ref<Object[]>([])

const userName = computed(() => {
  return authStore.user?.name.length > 22 ? authStore.user?.name.slice(0, 22) : authStore.user?.name;
})

const currentRoutePath = computed(() => router.currentRoute.value.path)

const logout = async () => {
  try {
    const {response} = await useFetch(LOGOUT_URL)
    if (response.value.ok) {
      authStore.logout()
      await router.push({name: 'login'})
    }
  } catch (error) {
    console.error(error)
  }
}

const changeSection = async (route: string) => {
  await router.push({path: route})
}

const isOpen = ref(true)
const user = ref({
  name: authStore.user?.name,
  img: authStore.user?.photo,
})

onMounted(async () => {
  list.value = [
    {
      name: 'home',
      icon: 'ic:round-home',
      route: '/'
    }
  ]
  if (hasPermission(PERMISSIONS_CONSTANTS.VER_LOGISTICA.code)) {
    list.value.push({
      name: 'logistic',
      icon: 'ic:outline-receipt-long',
      route: '/logistic'
    })
  }
})

const hasRole = (name: string) => {
  return authStore?.user?.roles[0].name === name
}

const hasPermission = (code: string) => {
  if (hasRole(ROLES_CONSTANTS.SUPER_ADMINISTRADOR.name)) {
    return true
  }
  return authStore?.user?.roles[0].permissions.find((permission: { name: string }) => permission.name === code)
}
</script>
