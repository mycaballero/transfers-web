<template>
  <div>
    <base-button
      v-if="!editing && !text"
      text=""
      class="text-lg bg-gray-300"
      @click="editing = true">
      <Icon icon="ph:pencil"/>
    </base-button>
    <input v-else-if="editing && !finalText"
      @blur="saveEdit"
      v-model="text"
      class="border-2 border-grey-500 rounded-lg py-1 px-1 text-md focus:outline-primary h-8"
    />
    <p v-else @click="editing = false">{{ finalText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {Icon} from "@iconify/vue";
import BaseButton from "@/components/global/buttons/BaseButton.vue";

const emit = defineEmits<{
  (event: 'save', text: String): string,
}>()
const editing = ref(false);
const text = ref(null);
const finalText = ref(null);


const saveEdit = () => {
  finalText.value = text.value
  emit('save', finalText.value)
}
</script>

<style scoped>

</style>
