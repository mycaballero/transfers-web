<template>
  <BaseModal :dialog="confirmDialog" @close="confirmDialog = false" :title="i18n.global.t('confirm_data')">
    <template #content class="p-2">
      <div class="mb-5">
        <p class="font-semibold text-gray-400 text-sm">{{i18n.global.t('shipping_details')}}:</p>
        <ul>
          <li class=" text-gray-400 text-sm">
            {{ $t('picking') }}: {{ newModel.picking.name }}
          </li>
          <li class=" text-gray-400 text-sm">
            {{ $t('partner_shipping') }}: {{ newModel.partnerShipping.display_name }}
          </li>
          <li class=" text-gray-400 text-sm">
            {{ $t('address') }}: {{ newModel.partnerShipping.address }}
          </li>
          <li class=" text-gray-400 text-sm">
            {{ $t('city') }}: {{ newModel.partnerShipping.city_collect.name }}
          </li>
          <li class=" text-gray-400 text-sm">
            {{ $t('warehouse') }}: {{ newModel.picking.location.name }}
          </li>
          <li class=" text-gray-400 text-sm">
            {{ $t('carrier') }}: {{ newModel.picking.sale_order.x_studio_transportadora }}
          </li>
          <li class=" text-gray-400 text-sm">
            {{ $t('freight') }}: {{ newModel.picking.sale_order.x_studio_flete }}
          </li>
          <li class=" text-gray-400 text-sm">
            {{ i18n.global.t('packed') }}: {{ newModel.picking.sale_order.x_studio_empacar? i18n.global.t('yes') : i18n.global.t('not') }}
          </li>
        </ul>
        <p class="font-semibold text-gray-400 text-sm">{{$t('moves')}}:</p>
        <ul class="mb-3">
          <li class=" text-gray-400 text-sm" v-for="move in newModel.moves">
            {{ move.product.default_code }} - {{$t('quantity')}}: {{ move.product_uom_qty }}
          </li>
        </ul>
        <div class="flex flex-wrap w-full">
          <span class="w-full text-sm text-gray-500 font-semibold mb-5">{{i18n.global.t('sure_to_send')}}</span>
          <div class="w-full flex justify-around">
              <BaseButton
                :text="`${$t('cancel')}`"
                @click="confirmDialog = false"
                :disabled="loading"
                class-button="h-8 bg-gray-400 hover:bg-gray-500"
              />
              <BaseButton
                :text="`${i18n.global.t('sure')}`"
                :disabled="loading"
                class-button="h-8 bg-secondary/70 hover:bg-secondary"
                @click="sendOutbound()"
              />
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
  <BaseModal
    :dialog="resultDialog"
    @close="resultDialog = false"
    :title="i18n.global.t(`result.${!resultErrors.error?'correct':'fail'}`)"
  >
    <template #content class="p-2">
      <div v-if="!resultErrors.error" class="mb-5 w-full">
        <div class="flex justify-center w-full">
          <Icon
            class="text-green-300 hover:text-green-500"
            icon="ic:baseline-check-circle-outline"
            width="300px"
            height="100px"
          />
        </div>
        <p class="w-full font-semibold text-center">{{resultErrors.transactionCode}} {{i18n.global.t('result.created')}}</p>
      </div>
      <div v-else class="mb-5 w-full">
        <div class="flex flex-wrap justify-center w-full">
            <Icon
              class="text-red-300 hover:text-red-500"
              icon="ic:baseline-warning-amber"
              width="300px"
              height="100px"
            />
        </div>
        <p class="w-full font-semibold text-center">{{i18n.global.t('result.message')}}: {{resultErrors.message}}</p>
      </div>
    </template>
  </BaseModal>
  <div>
    <div class="mb-4">
      <div class="flex justify-around gap-x-3 mb-4">
        <div class="flex flex-wrap w-6/12">
          <span class="w-full text-sm text-gray-500 font-semibold">{{$t('picking')}}</span>
          <BaseSelectTraitInput
            :disabled="loading"
            label-class="text-sm text-gray-500"
            input-class="text-gray-500 w-full"
            name="picking"
            label=""
            :url="PICKING_LIST_URL"
            item-value="id"
            item-text="name"
            v-model="newModel.picking.name"
            @input="updateModelByPicking($event)"
          />
        </div>
        <div class="flex flex-wrap w-6/12">
          <span class="w-full text-sm text-gray-500 font-semibold">{{$t('partner_shipping')}}</span>
          <BaseSelectTraitInput
              :disabled="loading"
              label-class="text-sm text-gray-500"
              input-class="text-gray-500 w-full"
              name="partner"
              label=""
              :url="PARTNER_URL"
              item-value="id"
              item-text="display_name"
              v-model="newModel.partnerShipping.display_name"
              @input="updateModelByPartner($event)"
          />
        </div>
      </div>
      <div class="flex justify-around gap-x-3 mb-4">
        <div class="flex flex-wrap w-6/12">
          <span class="w-full text-sm text-gray-500 font-semibold">{{$t('freight')}} <span class="text-xs">({{i18n.global.t('read_only')}})</span></span>
          <BaseTextInput
            :disabled="true"
            label=""
            label-class="text-sm text-gray-500"
            input-class="text-gray-500 w-full"
            v-model="newModel.picking.sale_order.x_studio_flete"
            :options="FREIGHT_CONSTANTS"
            item-text="title"
            item-value="freight"
            name="event"
          />
        </div>
        <div class="flex flex-wrap w-6/12">
          <span class="w-full text-sm text-gray-500 font-semibold">{{$t('carrier')}} <span class="text-xs">({{i18n.global.t('read_only')}})</span></span>
          <BaseTextInput
            :disabled="true"
            label=""
            label-class="text-sm text-gray-500"
            input-class="text-gray-500 w-full"
            v-model="newModel.picking.sale_order.x_studio_transportadora"
            name="event"
          />
        </div>
      </div>
      <div class="flex justify-around gap-x-3 mb-4">
        <div class="flex flex-wrap w-6/12">
          <span class="w-full text-sm text-gray-500 font-semibold">{{$t('city')}}</span>
          <BaseSelectTraitInput
            :disabled="loading"
            label-class="text-sm text-gray-500"
            input-class="text-gray-500 w-full"
            name="city"
            label=""
            :url="CITIES_URL"
            item-value="id"
            item-text="name"
            v-model="newModel.partnerShipping.city_collect.name"
            @input="updateModelByCity($event)"
          />
        </div>
        <div class="flex flex-wrap w-6/12">
          <span class="w-full text-sm text-gray-500 font-semibold">{{$t('address')}}</span>
          <BaseTextInput
            label-class="text-sm text-gray-500"
            input-class="text-gray-500 w-full"
            name="packages"
            :disabled="loading"
            label=""
            v-model="newModel.partnerShipping.address"
          />
        </div>
      </div>
      <div class="flex justify-around gap-x-3 mb-4">
        <div class="flex flex-wrap w-6/12">
          <span class="w-full text-sm text-gray-500 font-semibold">{{$t('warehouse')}}</span>
          <BaseSelectTraitInput
            :disabled="loading"
            label-class="text-sm text-gray-500"
            input-class="text-gray-500 w-full"
            name="warehouse"
            label=""
            :url="LOCATION_URL"
            item-value="id"
            item-text="name"
            v-model="newModel.picking.location.name"
            @input="updateModelByLocation($event)"
          />
        </div>
        <div class="flex flex-wrap items-center w-6/12 pt-4">
          <span class="mr-2 text-gray-500 font-semibold">{{i18n.global.t('packed')}}</span>
          <BaseToggle
            :disabled="loading"
            :input-class="`${getInputClass()} mt-2`"
            name="packed"
            :checked="newModel.picking.sale_order.x_studio_empacar"
            @update="updateModelByPacked($event)"
          />
        </div>
      </div>
      <div class="flex justify-around gap-x-3 mb-4">
        <div  v-if="errors.length" class="p-2">
          <span class="text-red-500 text-sm" v-for="error in errors">{{error}} &nbsp; </span>
        </div>
      </div>
      <div class="min-h-16 bg-white rounded-xl border border-gray-200 px-4 py-5 mb-5">
        <div class="w-full text-center mb-2">
          <h3 class="font-bold">{{$t('moves')}}</h3>
        </div>
        <div class="flex justify-around gap-x-3 pb-4 mb-4">
          <div class="flex flex-wrap w-5/12">
            <span class="w-full text-sm text-gray-500 font-semibold">{{$t('product')}}</span>
            <BaseSelectTraitInput
              :disabled="loading"
              label-class="text-sm text-gray-500"
              input-class="text-gray-500 w-full"
              name="products"
              label=""
              :url="PRODUCT_URL"
              item-value="id"
              item-text="default_code"
              v-model="move.product.default_code"
            />
          </div>
          <div class="flex flex-wrap w-5/12">
            <span class="w-full text-sm text-gray-500 font-semibold">{{$t('quantity')}}</span>
            <BaseTextInput
              :disabled="loading"
              label-class="text-sm text-gray-500"
              input-class="text-gray-500 w-full"
              name="quantitys"
              type="number"
              label=""
              v-model="move.product_uom_qty"
            />
          </div>
          <div class="flex justify-center items-center w-2/12 ">
            <BaseButton
              :text="`${$t('add')}`"
              @click="addMove()"
              :disabled="loading"
              class-button="bg-secondary/70 hover:bg-secondary h-8"
            />
          </div>
        </div>
        <div class="flex justify-around items-center w-full border-b border-gray-200">
          <div class="mb-5" v-if="moveErrors.length">
            <span class="text-red-500 text-sm" v-for="error in moveErrors">{{error}} &nbsp; </span>
          </div>
        </div>
        <div class="w-full flex mb-2">
          <div class="flex flex-wrap w-6/12"><span>{{$t('product')}}</span></div>
          <div class="flex flex-wrap w-5/12"><span>{{$t('quantity')}}</span></div>
          <div class="flex flex-wrap w-1/12"><span>{{$t('delete')}}</span></div>
        </div>
        <div v-if="!newModel.moves.length" class="w-full h-20 flex justify-center items-center">
          <span class="text-md font-medium mb-1 px-1 text-lg text-gray-500">{{ $t('no_data') }}</span>
        </div>
        <div v-for="(move, indx) in newModel.moves" class="w-full flex">
          <div class="flex flex-wrap w-6/12"><span>{{ move.product.default_code }}</span></div>
          <div class="flex flex-wrap w-5/12"><span>{{ move.product_uom_qty }}</span></div>
          <div class="flex flex-wrap w-1/12">
            <div class="flex justify-center items-center">
              <Icon
                class="hover cursor-pointer text-md text-gray-300 hover:text-red-500"
                icon="ic:baseline-delete"
                :disabled="loading"
                @click="deleteMove(indx)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-around gap-x-3">
        <div class="w-6/12 flex justify-center items-end">
          <BaseButton
            :text="`${$t('clear')}`"
            @click="clearModel()"
            :disabled="loading"
            class-button="h-8 bg-gray-400 hover:bg-gray-500"
          />
        </div>
        <div class="w-6/12 flex justify-center items-end">
          <BaseButton
            :text="`${i18n.global.t('send')}`"
            :disabled="loading"
            class-button="h-8 bg-secondary/70 hover:bg-secondary"
            @click="handlerSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import BaseTextInput from "@/components/global/inputs/BaseTextInput.vue"
import BaseButton from "@/components/global/buttons/BaseButton.vue"
import {useAuthStore} from "@/stores/auth.store.ts"
import {inject, ref} from "vue"
import BaseSelectTraitInput from "@/components/global/inputs/BaseSelectTraitInput.vue"
import {
  CITIES_URL,
  PICKING_LIST_URL,
  PARTNER_URL,
  PRODUCT_URL,
  LOCATION_URL,
  OUTBOUND_URL
} from '@/constants/HeavyUrlConstants.js'
import {Icon} from "@iconify/vue"
import {createI18n} from "vue-i18n"
import BaseModal from "@/components/global/modals/BaseModal.vue"
import BaseToggle from "@/components/global/inputs/BaseToggle.vue"

const authStore = useAuthStore()
const useFetch = inject('useFetchDefault')
const loading = ref(false)
const confirmDialog = ref(false)
const resultDialog = ref(false)
const i18n = createI18n({
  locale: 'es',
  messages: {
    es: {
      cancel: 'Cancelar',
      confirm_data: 'Confirmar envío de datos',
      errors: {
        not_transfer: 'No hay transferencia asignada o no es válida.',
        not_address: 'No hay dirección o no es válida.',
        not_city: 'No hay ciudad o no es válida.',
        not_warehouse: 'No hay bodega o no es válida.',
        not_moves: 'Aún no hay movimientos.',
        not_packed: 'Falta validar empacado.',
        not_product: 'No hay prdoducto o no es valido.',
        not_move_qty: 'Falta cantidad.'
      },
      not: 'No',
      packed: '¿Se empaca?',
      read_only: 'Solo lectura',
      result: {
        correct: '¡Envío exitoso!',
        fail: '¡Envío Fallido!',
        message: 'Mensaje',
        created: 'creado correctamente.',
        not_processed: 'can\'t be processed.',
      },
      send: 'Enviar',
      shipping_details: 'Datos de envío',
      sure_to_send: '¿Estás seguro de envíar la transferencia con los siguientes datos?',
      sure: 'Seguro',
      yes: 'Si',

    },
    en: {
      cancel: 'Cancel',
      confirm_data: 'Confirmar envío de datos',
      errors: {
        not_transfer: 'Not valid transfer.',
        not_address: 'Not valid address.',
        not_city: 'Not valid city.',
        not_warehouse: 'Not valid warehouse.',
        not_moves: 'Not moves.',
        not_packed: 'Packaging needs to be validated.',
        not_product: 'Not Product',
        not_move_qty: 'Not quantity.'
      },
      not: 'Not',
      packed: 'Is packed?',
      read_only: 'Read only',
      result: {
        correct: 'Successful shipment!',
        fail: 'Failed Shipping!',
        message: 'Message',
        created: 'created correctly.',
        not_processed: "can't be processed.",
      },
      send: 'Send',
      shipping_details: 'Shipping details',
      sure_to_send: 'Are you sure to send the transfer with the following information?',
      sure: 'Sure',
      yes: 'Yes',

    },
  }
})
const move = ref({
  product: {
    default_code:null
  },
  product_uom_qty: null
})
const errors = ref([])
const moveErrors = ref([])
const resultErrors = ref({
  error: Boolean,
  message: null,
  transactionCode: null
})
const newModel = ref({
  partnerShipping: {
    display_name: null,
    address: null,
    city_collect: {
      name: null,
    },
  },
  picking: {
    location: {
      name: null,
    },
    sale_order: {
      x_studio_empacar: Boolean|null,
      x_studio_flete: null,
      x_studio_transportadora: null,
    },
  },
  moves: [],
  city: {}
})
const clearModel = () => {
  newModel.value = {
    partnerShipping: {
      display_name: null,
      address: null,
      city_collect: {
        name: null,
      },
    },
    picking: {
      location: {
        name: null,
      },
      sale_order: {
        x_studio_empacar: null
      },
    },
    moves: [],
    city: {}
  }
  errors.value = []
}
const addMove = () => {
  moveErrors.value = []
  if (move.value.product.default_code === null ) {
    moveErrors.value.push(i18n.global.t('errors.not_product'))
  }
  if (move.value.product_uom_qty === null || move.value.product_uom_qty === 0) {
    moveErrors.value.push(i18n.global.t('errors.not_move_qty'))
  }
  if (!moveErrors.value.length) {
    newModel.value.moves.push(move.value)
    move.value = {
      product: {
        default_code: null
      },
      product_uom_qty: null
    }
  }
}
const deleteMove = (index: number) => {
  newModel.value.moves.splice(index, 1)
}
const updateModelByPicking = (model: any) => {
    newModel.value.picking = model
    newModel.value.partnerShipping = model.sale_order.partner_shipping
    newModel.value.city = model.sale_order.partner_shipping.city_collect
    newModel.value.moves = model.moves
}
const updateModelByPartner = (model: any) => {
  newModel.value.partnerShipping = model
  newModel.value.city = model.city_collect
}
const updateModelByCity = (model: any) => {
  newModel.value.partnerShipping.city_collect = model
  newModel.value.partnerShipping.city_id = model.id
  newModel.value.partnerShipping.city = model.name
  newModel.value.city = model
}
const updateModelByLocation = (model: any) => {
  newModel.value.picking.location = model
  newModel.value.picking.location_id = model.id
}
const updateModelByPacked = (value: any) => {
  newModel.value.picking.sale_order.x_studio_empacar = value
}
const validations = () => {
  errors.value = []
  moveErrors.value = []
  if (!newModel.value.partnerShipping.display_name) {
    errors.value.push(i18n.global.t('errors.not_transfer'))
  }
  if (!newModel.value.partnerShipping.address) {
    errors.value.push(i18n.global.t('errors.not_address'))
  }
  if (!newModel.value.partnerShipping.city_collect.name) {
    errors.value.push(i18n.global.t('errors.not_city'))
  }
  if (!newModel.value.picking.location.name) {
    errors.value.push(i18n.global.t('errors.not_warehouse'))
  }
  if (newModel.value.picking.sale_order.x_studio_empacar === null
    || newModel.value.picking.sale_order.x_studio_empacar === undefined) {
    errors.value.push(i18n.global.t('errors.not_packed'))
  }
  if (!newModel.value.moves.length) {
    errors.value.push(i18n.global.t('errors.not_moves'))
  }
  return errors.value.length === 0
}
const getInputClass = () => {
  const value = newModel.value.picking.sale_order.x_studio_empacar
  if (value === true) {
    return 'bg-secondary'
  } else if (value === false) {
    return 'bg-gray-500'
  } else {
    return 'bg-gray-300'
  }
}
const handlerSubmit = () => {
  confirmDialog.value = validations()
}
const sendOutbound = async () => {
    loading.value = true
    confirmDialog.value = false
    try {
        const {data,response} = await useFetch(`${OUTBOUND_URL}/blu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newModel.value)
        }).json()
        if (response.value.ok) {
          if (data.value[0].Error === false) {
            resultErrors.value.error = data.value[0].Error
            resultErrors.value.transactionCode = data.value[0].TransactionCode
          } else {
            resultErrors.value.error = data.value[0].Error
            resultErrors.value.message = data.value[0].Message
          }
          resultDialog.value = true
        } else {
          resultErrors.value.error = true
          resultErrors.value.message = i18n.global.t('errors.not_transfer')
          resultDialog.value = true
        }
    } catch (e) {
        console.error(e)
    }
    clearModel()
    loading.value = false
}
</script>

<style scoped>

</style>
