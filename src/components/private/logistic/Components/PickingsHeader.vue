<template>
  <div class="w-full flex justify-between items-center mb-6">
    <div>
      <h3 class="text-secondary-90 font-bold text-xl capitalize">{{ $t('transfers') }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { i18n as traslate } from '@/plugins/i18n'

const t = traslate.global.t
</script>
