<template>
   <BaseModal :dialog="dialog" :title="$t('edit')" classes="max-w-full md:w-[700px] h-screen md:h-auto items-start"
  @close="$emit('close')">
    <template #content>
      <div class="bg-white md:rounded-xl w-full">
        <div>
          <form class="mb-4" @submit.prevent="handlerSubmit">
            <div class="rounded-lg bg-white">
              <div class="flex justify-around gap-x-3 mb-4">
                <div class="flex flex-wrap w-6/12">
                  <span class="w-full text-sm text-gray-500 font-semibold">{{$t('guide')}}</span>
                  <BaseTextInput
                          label-class="text-sm text-gray-500"
                          input-class="text-gray-500 w-full"
                          name="guide"
                          label=""
                          v-model="newModel.guia"
                  />
                </div>
                <div class="flex flex-wrap w-6/12">
                  <span class="w-full text-sm text-gray-500 font-semibold">{{$t('packages')}}</span>
                  <BaseTextInput
                          label-class="text-sm text-gray-500"
                          input-class="text-gray-500 w-full"
                          name="packages"
                          type="number"
                          label=""
                          v-model="newModel.cajas"
                  />
                </div>
              </div>
              <div class="flex justify-around gap-x-3 mb-4">
                <div class="flex flex-wrap w-6/12">
                    <span class="w-full text-sm text-gray-500 font-semibold">{{$t('packaging_date')}}</span>
                    <BaseTextInput
                          label-class="text-sm text-gray-500"
                          input-class="text-gray-500 w-full"
                          name="packaging_date"
                          type="datetime-local"
                          label=""
                          v-model="newModel.fecha_empaque"
                  />
                  </div>
                  <div class="flex flex-wrap w-6/12">
                    <span class="w-full text-sm text-gray-500 font-semibold">{{$t('delivered_date')}}</span>
                    <BaseTextInput
                          label-class="text-sm text-gray-500"
                          input-class="text-gray-500 w-full"
                          name="delivered_date"
                          type="datetime-local"
                          label=""
                          v-model="newModel.delivered_date"
                  />
                </div>
              </div>
              <div class="flex justify-around gap-x-3">
                <div class="w-6/12">
                    <BaseSelectInput
                        v-if="newModel.sts_orden !== PICKING_EVENT_CONSTANTS.DELIVERED.code && newModel.sts_orden !== PICKING_EVENT_CONSTANTS.CANCELED.code"
                        :label="`${$t('event')}`"
                        label-class="text-sm text-gray-500 py-3"
                        input-class="text-gray-500 w-8/12"
                        v-model="newModel.sts_orden"
                        :options="statusOptions"
                        item-text="title"
                        item-value="code"
                        name="event"
                    />
                </div>
                <div class="w-6/12 flex justify-center items-end">
                  <BaseButton :text="`${$t('save')}`" :disabled="disabled" class-button="bg-secondary/70 hover:bg-secondary h-8"/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </template>
   </BaseModal>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue"
import BaseModal from "@/components/global/modals/BaseModal.vue"
import {PICKING_EVENT_CONSTANTS, getEventByCode} from '@/constants/PickingEventConstants.js'
import {OUTBOUND_URL} from '@/constants/HeavyUrlConstants.js'
import BaseButton from "@/components/global/buttons/BaseButton.vue"
import {useAuthStore} from "@/stores/auth.store"
import BaseTextInput from "@/components/global/inputs/BaseTextInput.vue"
import BaseSelectInput from "@/components/global/inputs/BaseSelectInput.vue"


const props = defineProps<{
  modal?: Boolean,
  model: Object
}>()

const emit = defineEmits<{
  (event: 'close'):void,
  (event: 'saved'):void,
}>()
const authStore = useAuthStore()
const useFetch = inject('useFetchDefault')
const disabled = ref(false)
const prevStatus = ref(null)
const packingTimeSeconds = ref('00')
const deliveredTimeSeconds = ref('00')
const statusOptions = ref([
    PICKING_EVENT_CONSTANTS.DELIVERED,
    PICKING_EVENT_CONSTANTS.CANCELED,
])
const loading = ref(false)

const newModel = ref({
  id: props.model.outbound?.id,
  picking_id: props.model.id,
  cajas: null,
  guia: null,
  fecha_empaque: null,
  delivered_date: null,
  sts_orden: null,
  user_id: authStore.user.id
})


const handlerSubmit = () => {
  saveData()
}
const saveData = async () => {
  loading.value = true
  let payload = newModel.value
  if (payload.sts_orden === prevStatus.value) {
    const { sts_orden, ...rest } = payload
    payload = rest
  }
  payload.delivered_date = formatDateTimeToStandard(payload?.delivered_date, deliveredTimeSeconds.value)
  payload.fecha_empaque = formatDateTimeToStandard(payload?.fecha_empaque, packingTimeSeconds.value)
  payload.cajas = payload.cajas ? payload.cajas.toString() : null
  try {
    const {response} = await useFetch(`${OUTBOUND_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).json()
    if (response.value.ok) {
       emit('saved')
    }
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}
const getModel = () => {
  let packingDate = null
  let deliveredDate = null
  prevStatus.value = props.model.outbound?.status
  if (props.model.outbound?.packing_date) {
    let date = formatDateTimeToLocal(props.model.outbound?.packing_date)
    packingDate = date.formattedDateTime
    packingTimeSeconds.value = date.secondPart ?? '00'
  }
  if (props.model.outbound?.delivered_date) {
    let date = formatDateTimeToLocal(props.model.outbound?.delivered_date)
    deliveredDate = date.formattedDateTime
    deliveredTimeSeconds.value = date.secondPart ?? '00'
  }
  newModel.value = {
    id: props.model.outbound?.id,
    picking_id: props.model.id,
    cajas: props.model.outbound?.boxes,
    guia: props.model.outbound?.guide,
    fecha_empaque: packingDate !== null ? packingDate : null,
    delivered_date: deliveredDate !== null ? deliveredDate : null,
    sts_orden: statusOptions.value.includes(getEventByCode(props.model.outbound?.status))? props.model.outbound?.status : null,
    user_id: authStore.user.id
  }
}
onMounted( () => {
  getModel()
})

const formatDateTimeToLocal = (inputDateTime: string|null) => {
  if (inputDateTime) {
    const [datePart, timePart] = inputDateTime.split(" ")
    const [hourPart, minutePart, secondPart] = timePart.split(":")
    const formattedDateTime = `${datePart}T${hourPart}:${minutePart}`
    return {formattedDateTime, secondPart}
  }
  return {}
}

const formatDateTimeToStandard = (inputDateTime: string|null, seconds: string) => {
  if (inputDateTime) {
    const [datePart, timePart] = inputDateTime.split("T")
    const [hourPart, minutePart] = timePart.split(":")
    return `${datePart} ${hourPart}:${minutePart}:${seconds}`
  }
  return null
}
</script>

<style scoped>

</style>
