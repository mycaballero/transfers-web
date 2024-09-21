<template>
  <section class="w-full h-full bg-slate-100" data-theme="light">
    <div class="p-8">
      <PickingsHeader/>
      <PickingsTable/>
    </div>
  </section>
</template>
<script setup lang="ts">
import PickingsTable from "@/components/private/logistic/Components/PickingsTable.vue"
import PickingsHeader from "@/components/private/logistic/Components/PickingsHeader.vue";
</script>


