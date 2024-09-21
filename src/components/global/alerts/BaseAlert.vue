<template>
  <NotificationGroup group="base">
    <div
      class="fixed flex items-end justify-end pointer-events-none inset-y-16 right-0 z-50"
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div v-for="notification in notifications" :key="notification.id">
            <div
              class="w-full max-w-[15rem] overflow-hidden bg-primary rounded-l-3xl ring-1 ring-black ring-opacity-5 ml-auto"
            >
              <div class="p-3 flex items-center justify-end">
                <div class="flex flex-col items-start">
                  <p
                    class="font-dinpro font-medium text-secondary text-base"
                  >
                    {{ notification.title }}
                  </p>
                  <p
                    class="font-dinpro font-normal text-white text-xs"
                  >
                    {{ notification.text }}
                  </p>
                </div>

                <span
                  class="pl-5 text-2xl"
                  :class="{
                    'icon-approved': notification.type === 'success',
                    'text-secondary': notification.type === 'success',
                    'icon-close': notification.type === 'error',
                    'text-red-600': notification.type === 'error',
                  }"
                ></span>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>

<script setup lang="ts">
import { Notification, NotificationGroup } from "./notiwind/notiwind";
</script>
