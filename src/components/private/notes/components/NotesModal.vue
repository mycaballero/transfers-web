<template>
   <BaseModal :dialog="dialog" :title="$t('comments')" classes="max-w-full md:w-[700px] h-screen md:h-auto items-start"
  @close="$emit('close')">
    <template #content>
      <div class="bg-white md:rounded-xl w-full">
        <div v-if="!creating" class="flex justify-center align-middle">
          <base-button text="" class="text-2xl bg-gray-300" @click="creating = true">
            <Icon icon="ic:baseline-add"/>
          </base-button>
        </div>
        <div v-else>
          <form class="mb-4" @submit.prevent="handlerSubmit">
            <div class="rounded-lg bg-white">
              <BaseTextArea
                :label="$t('note')"
                name="text"
                v-model="newModel.text"
                input-class="w-full text-primary p-2 border rounded-lg"
                label-class="hidden"
                counter="300"
              />
            </div>
              <div class="flex justify-around align-middle">
                  <base-button text="" class="text-xl bg-green-500" type="submit">
                      <Icon icon="ic:baseline-check"/>
                  </base-button>
                  <base-button text="" class="text-xl bg-red-500" @click="cancelCreate">
                      <Icon icon="ic:baseline-close"/>
                  </base-button>
              </div>
          </form>
        </div>
        <div v-for="(note, index) in notes" :key="note.id"
        :class="index == notes.length-1?'': 'border-b my-2'"
             class="px-2"
        >
          <Note :id="note.id" :picking-id="model_id" :model="note" @delete="deleteNotes($event,index)"/>
        </div>
      </div>
    </template>
   </BaseModal>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue"
import BaseModal from "@/components/global/modals/BaseModal.vue"
import {NOTES_URL} from '@/constants/HeavyUrlConstants.js'
import Note from "@/components/private/notes/components/Note.vue"
import BaseButton from "@/components/global/buttons/BaseButton.vue"
import {Icon} from "@iconify/vue"
import BaseTextArea from "@/components/global/inputs/BaseTextArea.vue"
import {useAuthStore} from "@/stores/auth.store"

const props = defineProps<{
  modal?: Boolean,
  model_id: Number
}>()

const emit = defineEmits<{
  (event: 'close'):void,
}>()
const authStore = useAuthStore()
const useFetch = inject('useFetchDefault')
const disabled = ref(false)
const notes = ref([])
const loading = ref(false)
const creating = ref(false)

const newModel = ref({
  text: null,
  picking_id: props.model_id,
})

const cancelCreate = () => {
    newModel.value.text = null
    creating.value = false
}
const getNotes = async () => {
  loading.value = true
  let params = new URLSearchParams({ pickingId: props.model_id }).toString()
  try {
    const {data, response} = await useFetch(`${NOTES_URL}?${params}`).json()
    if (response.value.ok) {
      notes.value = data.value
    }
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

const handlerSubmit = () => {
  if (newModel.value.text?.length <= 300) {
    saveNotes()
  }
}
const saveNotes = async () => {
  loading.value = true
  try {
    const {data,response} = await useFetch(`${NOTES_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newModel.value)
    }).json()
    if (response.value.ok) {
      notes.value.unshift({
        id: data.value.id,
        text: data.value.text,
        date: data.value.created_at,
        user: authStore.user.name
      })
      cancelCreate()
    }
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

const deleteNotes = async (id, index) => {
  loading.value = true
  try {
    const {response} = await useFetch(`${NOTES_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).json()
    if (response.value.ok) {
      notes.value.splice(index, 1)
    }
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

onMounted( async () => {
  await getNotes()
})
</script>

<style scoped>

</style>
