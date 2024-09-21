<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div class="flex max-h-screen bg-slate-100">
    <SideBar class="flex-none"/>
    <div class="grow max-h-full overflow-hidden overflow-y-auto">
      <router-view/>
    </div>
  </div>
</template>
