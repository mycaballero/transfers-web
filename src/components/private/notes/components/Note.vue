<template>
  <div class="mb-1">
    <div class="flex justify-between mb-2">
      <span class="text-xs">{{formattedDate}}</span>
      <div class="flex">
        <a v-if="!editable" class="text-gray-500 text-sm cursor-pointer mr-2">
          <Icon icon="ph:pencil-bold" @click="edit()"/>
        </a>
        <a v-else class="text-green-500 text-sm cursor-pointer mr-2">
          <Icon icon="ic:outline-check" @click="handlerSubmit()"/>
        </a>
        <a v-if="!editable" class="text-gray-500 text-sm cursor-pointer">
          <Icon icon="ph:trash-bold" @click="$emit('delete',id)"/>
        </a>
        <a v-else class="text-red-500 text-sm cursor-pointer mr-2">
            <Icon icon="ic:baseline-close" @click="cancel"/>
        </a>
      </div>
    </div>
    <div v-if="!editable" class="border-gray-200 border rounded-lg bg-white p-2">
      <p class="text-primary">{{noteModel?.text}}</p>
    </div>
    <form v-else>
      <div class="rounded-lg bg-white">
        <BaseTextArea
          name="text"
          v-model="noteModel.text"
          input-class="w-full text-primary p-2 border rounded-lg"
          label-class="hidden"
          counter="300"
        />
      </div>
    </form>
    <span class="text-xs font-semibold">{{noteModel?.user}}</span>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue"
import {Icon} from "@iconify/vue"
import BaseTextArea from "@/components/global/inputs/BaseTextArea.vue"
import {NOTES_URL} from '@/constants/HeavyUrlConstants.js'
import {useFetch} from "@vueuse/core"
import BaseTextInput from "@/components/global/inputs/BaseTextInput.vue";

const props = defineProps<{
  modal?: Boolean,
  model?: Object,
  id?: BigInteger
  pickingId?: BigInteger
}>()
const noteModel = ref({
  picking_id: null,
  text: null,
  date: null,
  id: null,
  user: null
})
const formattedDate = ref(null)
const canceledtext = ref(null)
const dateFormat = () => {
    return noteModel?.value.date
      ? Intl.DateTimeFormat('es', {dateStyle: 'long'}).format(new Date(noteModel.value.date))
      : null

}
const loading = ref(false)
const editable = ref(false)
const useFetch = inject('useFetchDefault')
const edit = () => {
  editable.value = true
}
const cancel = () => {
  noteModel.value.text = canceledtext.value
  editable.value = false
}
const handlerSubmit = () => {
    if (noteModel.value.text?.length <= 300) {
        saveNotes()
    }
}
const saveNotes = async () => {
  loading.value = true
  try {
    const {response} = await useFetch(`${NOTES_URL}/${props.id ?? ''}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteModel.value)
    }).json()
    if (response.value.ok) {
      editable.value = false
    }
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

const getModel = () => {
  noteModel.value = {
    id: props.model?.id?? null,
    text: props.model?.text?? null,
    date: props.model?.date?? null,
    picking_id: props.pickingId?? null,
    user: props.model?.user?? null,
  }
  canceledtext.value = props.model.text?? null
}
onMounted(function () {
  getModel()
  formattedDate.value = dateFormat()
})
</script>
<style scoped>

</style>
