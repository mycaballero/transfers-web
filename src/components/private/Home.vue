<template>
  <section class="p-4">
    <div class="w-full flex flex-wrap justify-center">
      <Icon class="text-secondary text-[3.2rem]" icon="ic:outline-inventory"/>
    </div>
    <div class="w-full">
      <h1 class="text-xl text-black text-center">
        <span class="font-bold">{{ i18n.global.t('your_inventory_software') }}</span>
      </h1>
    </div>
  </section>
</template>
<script setup lang="ts">
import {createI18n} from "vue-i18n"
import {onMounted} from "vue"
import {Icon} from "@iconify/vue"

const i18n = createI18n({
  locale: 'es',
  messages: {
    es: {
      your_inventory_software: 'Tu software de inventario',


    },
    en: {
      your_inventory_software: 'Your inventory software',

    },
  }
})

onMounted(async () => {
})
</script>
