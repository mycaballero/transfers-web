<template>
  <NotesModal :dialog="notesModal" :model_id="itemModal" @close="closeModal()" :key="itemModal"/>
  <OutboundModal :dialog="outboundModal" :model="itemOutboundModal" @saved="reloadTable" @close="closeModal()" :key="itemOutboundModal.id"/>
  <div class="flex flex-row gap-y-2">
    <div class="flex flex-col w-full max-w-sm px-1">
      <BaseTextInput
        label-class="text-sm text-gray-500"
        input-class="text-gray-500"
        name="name"
        :label=" `${$t('search_parameter')}`"
        v-model="searchValue.name"
      />
    </div>
    <div class="flex flex-col px-1 justify-end mb-2.5">
      <a class="hover:cursor-pointer bg-gray-300/50 hover:bg-gray-300 text-gray-300 hover:text-black rounded-full w-8 h-8 flex justify-center items-center transition-all"
         @click="clearSearch"
      >
        <Icon icon="ic:outline-cleaning-services" />
      </a>
    </div>
  </div>
  <div class="bg-white w-full flex flex-wrap justify-center mt-4 border border-black/15 rounded-xl p-2">
    <DataTable
        :headers="headers"
        :url="`${PICKING_URL}/`"
        table-class-name="border-none"
        header-class-name="text-grey-750 shadow-sm rounded"
        body-row-class-name="border-y font-medium text-grey-750"
        header-item-class-name="w-24 py-4 px-4 text-start"
        body-item-class-name="w-24 px-4 py-4"
        :search-value="searchValue"
        :sort-by="sortBy"
        ref="table"
        :page="page"
        @page="page = false"
        :key="tableKey"
    >
      <template #loading>
        <div class="w-full flex justify-center">
            <span class="loading loading-spinner loading-lg text-gray-500">
            </span>
        </div>
      </template>
      <template #item-saleOrder="item">
          <p class="text-center flex justify-center">
            {{item.saleOrder}}
            <span v-if="item.multiple" class=" cursor-pointer text-lg pl-1 rounded-full text-red-600">
              <div class="tooltip" :data-tip="`${t('other_transfers_in')} ${item.saleOrder}`">
                <Icon icon="ic:outline-account-tree" @click="changeSearch(item.saleOrder)"/>
              </div>
            </span>
          </p>
      </template>
      <template #item-event="item">
        <div class="text-center justify-center flex">
            <span v-if="item.event" class="flex items-center justify-center w-full h-9 cursor-default select-none text-xs text-white py-0.5 px-1 rounded-xl" :class="`${getEvent(item.event).color}`">
              {{getEvent(item.event).title}}
            </span>
        </div>
      </template>
      <template #item-notes="item">
        <base-counter :number="item.notes" bg-color="bg-secondary">
          <div class="text-center justify-center flex">
            <Icon class="hover cursor-pointer text-xl" icon="ic:baseline-edit-note" @click="openNotesModal(item.id)"/>
          </div>
        </base-counter>
      </template>
      <template #item-edit-outbound="item">
        <div v-if="item.outbound && (hasPermission(PERMISSIONS_CONSTANTS.EDITAR_TRANSFERENCIAS_SALIENTES.code))" class="text-center justify-center flex">
            <Icon class="hover cursor-pointer text-xl" icon="ic:baseline-settings" @click="openOutboundModal(item)"/>
        </div>
        <div v-else class="text-center text-gray-300 justify-center flex">
            <Icon class="hover text-xl" icon="ic:baseline-settings"/>
        </div>
      </template>
      <template #item-packaging_time="item">
        <div v-if="item.outbound?.shipping_date && item.event !== PICKING_EVENT_CONSTANTS.CANCELED.code" class="text-center justify-center flex">
          <BaseTimeCounter :name="'despachado'" :initial-date="item.outbound.packing_date < item.outbound.shipping_date  ? item.outbound.order_date : item.outbound.shipping_date" :final-date="item.outbound.packing_date"/>
        </div>
      </template>
      <template #item-delivery_time="item">
          <div v-if="item.outbound?.dispatch_date && item.event !== PICKING_EVENT_CONSTANTS.CANCELED.code" class="text-center justify-center flex">
              <BaseTimeCounter :name="'despachado'" :initial-date="item.outbound.dispatch_date" :final-date="item.outbound.delivered_date"/>
          </div>
      </template>
      <template #item-outbound_guide="item">
        <div class="text-center justify-center flex space-x-1">
          <span>{{item.outbound?.guide}}</span>
          <Icon v-if="(item.carrier == 'EXXE' || item.carrier == 'EXXE_CORRIENTE') && item.outbound?.guide" class="hover cursor-pointer text-xl" icon="ic:outline-preview" @click="openGuide(item.outbound?.guide)"/>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import BaseTextInput from '@/components/global/inputs/BaseTextInput.vue'
import BaseTimeCounter from "@/components/global/Charts/BaseTimeCounter.vue"
import DataTable from "@/components/global/DataTable.vue"
import {getEventByCode} from '@/constants/PickingEventConstants.js'
import {i18n as traslate} from '@/plugins/i18n'
import {Icon} from "@iconify/vue"
import NotesModal from "@/components/private/notes/components/NotesModal.vue"
import {PICKING_URL} from '@/constants/HeavyUrlConstants.js'
import {PICKING_EVENT_CONSTANTS} from '@/constants/PickingEventConstants.js'
import {ref} from "vue"
import OutboundModal from "@/components/private/outbound/components/OutboundModal.vue";
import {useAuthStore} from "@/stores/auth.store"
import {ROLES_CONSTANTS} from '@/constants/RolesConstants.js'
import {PERMISSIONS_CONSTANTS} from '@/constants/PermissionsConstants.js'
import BaseCounter from "@/components/global/widgets/BaseCounter.vue"

const getEvent = getEventByCode;
const authStore = useAuthStore()
const page = ref();
const t = traslate.global.t
const tableKey = ref(0);
const searchValue = ref({
  name: ''
})
const notesModal = ref(false)
const outboundModal = ref(false)
const itemModal = ref(0)
const itemOutboundModal = ref({})
const headers = [
  {text: `${t('transfer')}`, value: "name", alias: "name", width: 100, sortable: true},
    {text: `${t('order')}`, value: "saleOrder", width: 100},
    {text: `${t('client')}`, value: "invoice", alias: "invoice", width: 200},
    {text: `${t('origin')}`, value: "origin", alias: "origin", width: 100},
    {text: `${t('destination')}`, value: "destination", alias: "destination", width: 100},
    {text: `${t('packages')}`, value: "outbound.boxes", alias: "packages", width: 120},
    {text: `${t('weight')}`, value: "outbound.weight", alias: "weight", width: 120},
    {text: `${t('volume')}`, value: "outbound.volume", alias: "volume", width: 120},
    {text: `${t('guide')}`, value: "outbound_guide", alias: "outbound_guide", width: 120},
    {text: `${t('carrier')}`, value: "carrier", alias: "carrier", width: 80},
    {text: `${t('freight')}`, value: "freight", alias: "freight", width: 120},
    {text: `${t('packaging_time')}`, value: "packaging_time", alias: "packaging_time", width: 120},
    {text: `${t('delivery_time')}`, value: "delivery_time", alias: "delivery_time", width: 120},
    {text: `${t('event')}`, value: "event", alias: "event", width: 100, sortable: true},
    {text: `${t('notes')}`, value: "notes", alias: "notes", width: 80},
    {text: `${t('')}`, value: "edit-outbound", alias: "edit-outbound", width: 80},
]
const sortBy: string[] = ["name"]
const clearSearch = () => {
  searchValue.value = {
    name: '',
  }
  page.value = false
}
const openNotesModal = (item: number) => {
  itemModal.value = item
  notesModal.value = true
}
const openOutboundModal = (item: number) => {
  itemOutboundModal.value = item
  outboundModal.value = true
}
const closeModal = () => {
  notesModal.value = false
  itemModal.value = 0
  outboundModal.value = false
  itemOutboundModal.value = {
      id: 0,
      outbound: {
        id: 0,
        boxes: null,
        guide: null,
        packing_date: null,
        delivered_date: null,
        status: null
      }
  }
}
const changeSearch = (input: string) => {
  searchValue.value = {
    name: input
  }
  page.value = true
}
const openGuide = (guide: string) => {
  window.open('https://solex.blulogistics.net/solex/Home/GuiaRastreo?Numero='+guide, '_blank')
}
const reloadTable = () => {
  closeModal()
  tableKey.value += 1
}
const hasRole = (name: string) => {
    return authStore?.user?.roles[0].name === name
}
const hasPermission = (code: string) => {
    if (hasRole(ROLES_CONSTANTS.SUPER_ADMINISTRADOR.name)) {
        return true
    }
    return authStore?.user?.roles[0].permissions.find((permission: { name: string }) => permission.name === code)
}
</script>
