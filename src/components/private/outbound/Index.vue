<template>
  <section class="w-full h-full bg-slate-100" data-theme="light">
    <div class="p-8">
      <OutboundHeader/>
      <OutboundForm/>
    </div>
  </section>
</template>
<script setup lang="ts">

import OutboundForm from "@/components/private/outbound/components/OutboundForm.vue";
import OutboundHeader from "@/components/private/outbound/components/OutboundHeader.vue";
</script>
<style scoped>

</style>
