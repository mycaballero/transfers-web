<template>
  <div class="relative w-full">
    <label v-if="label" for="type" class="text-md font-medium mb-1 px-1" :class="labelClass">{{ label }}</label>
    <input
        type="text"
        v-model="value"
        :name="name"
        class="border-2 border-grey-500 rounded-lg py-2 px-2 text-lg focus:outline-primary h-12 relative"
        :class="`${{ 'base-text-input-error': errorMessage }} ${inputClass}`"
        :disabled="disabled"
        @focus="showDropdown = true"
        @blur="hideDropdown"
    />
    <ul
        v-if="showDropdown && options && !disabled"
        class="absolute scrollbarSelect border-2 border-grey-500 rounded-lg bg-white mt-1 w-full max-h-40 overflow-auto"
        :class="`${showDropdown && options? 'z-50': ''}`"
    >
      <li
          v-for="(option, i) in options"
          :key="i"
          @mousedown.prevent="selectOption(option)"
          class="py-2 px-2 cursor-pointer hover:bg-gray-200"
      >
        {{ itemText ? option[itemText] : option }}
      </li>
    </ul>
    <span class="text-[#fd0b0be7] text-xs mt-1">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts" setup>
import {useField} from "vee-validate"
import {inject, Ref, ref, watch, onMounted} from "vue"

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: null
  },
  param: {
    type: String,
    default: null
  },
  itemText: {
    type: String,
    default: null
  },
  itemValue: {
    type: String,
    default: null
  },
  other: {
    type: Boolean,
    default: false
  },
  inputClass: {
    type: String,
    default: null
  },
  labelClass: {
    type: String,
    default: "",
  },
});

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const useFetch = inject('useFetchDefault')
const loading = ref(false)
const options = ref({})
const showDropdown = ref(false)
const emit = defineEmits(['input'])
const getRequest = async (param: Ref<any>) => {
  loading.value = true
  let params = new URLSearchParams({name: param ?? ''}).toString()
  try {
    const {response, data} = await useFetch(`${props.url}?${params}`).json()
    if (response.value.ok) {
      options.value = data.value
    }
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

const selectOption = (option) => {
  value.value = option[props.itemText]
  emit('input', option)
  hideDropdown()
}
const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

watch(() => value, () => {
  getRequest(value.value)
}, {deep: true})

onMounted(async () => {
  await getRequest(null)
})
</script>
<style>
.scrollbarSelect {
    scrollbar-width: thin;
}
</style>
