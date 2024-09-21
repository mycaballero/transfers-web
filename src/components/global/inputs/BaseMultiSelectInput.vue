<template>
  <label for="type" class="text-md font-medium mb-1 px-1" :class="labelClass">{{ label }}</label>
  <div class="relative" :class="contentClass">
    <div class="relative">
      <input :name="name" v-model="descriptionValues"
             ref="input"
             type="text"
             readonly
             @click="focusOrBlur"
             :class="`w-full cursor-default border-2 border-grey-500 rounded-lg py-2 px-2 text-lg focus:outline-primary h-12 ${inputClass}`">
      <Icon class="absolute top-0 left-[89%] h-12" :icon="isFocused?`typcn:times`: 'ic:round-keyboard-arrow-down'"
            :height="isFocused?'15px':'20px'" @click="focusOrBlur"/>
    </div>
    <div v-if="isFocused" class="absolute w-full bg-white z-10 rounded border max-h-40 overflow-auto">
      <li class="list-none hover:bg-[#212121] text-black hover:text-white text-sm  px-2 py-1 transition-all"
          v-if="selectedValues.length > 0">
        <button class="w-full" @click="clearValues">{{ $t('clear') }}</button>
      </li>
      <li class="list-none hover:bg-[#212121] text-black hover:text-white px-2 py-1 transition-all"
          v-for="(option, i) in props.options" :key="i">
        <input
            class="bg-transparent"
            :class="`cursor-pointer ${inputClass}`"
            type="checkbox"
            :name="itemText? option[itemText]: option"
            :value="itemText? option[itemValue]: option"
            v-model="selectedValues"
            @change="$emit('selected', selectedValues)"
        />
        {{ option[itemText] }}
      </li>
    </div>
  </div>
  <span class="text-red-500 text-xs mt-1 pl-2">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import {Icon} from '@iconify/vue/dist/iconify.js'
import {ref, computed} from 'vue'
import {useField} from 'vee-validate'
import {watch} from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  inputClass: {
    type: String,
    default: "",
  },
  contentClass: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  labelClass: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    required: {},
  },
  value: {
    type: Object,
    default: {},
  },
  itemText: {
    type: String,
    default: null,
  },
  itemValue: {
    type: String,
    default: null,
  },

});
const emit = defineEmits(['selected'])

const selectedValues = ref(props.value || [])
const isFocused = ref(false)
const descriptionValues = computed(() => {
  if (selectedValues.value.length === 0) {
    return ''
  } else {
    let prev = props.options
    if (!Array.isArray(props.options)) {
      prev = Object.values(props.options)
    }
    return cutString(selectedValues.value.map((value) => {
      return prev.find((option) => option[props.itemValue] === value)[props.itemText]
    }))
  }
})
const cutString = (string: any) => {
  string = string.toString()
  return string?.length > 20 ? string.substring(0, 20) + "..." : string
}
const focusOrBlur = () => {
  isFocused.value ? isFocused.value = false : isFocused.value = true
}
const clearValues = () => {
  selectedValues.value = []
  emit('selected', selectedValues.value)
}
const {errorMessage} = useField(() => props.name, undefined, {
  syncVModel: true,
});

watch(() => props.value, () => {
  if (props.value?.length === 0 && descriptionValues.value.length !== 0) {
    clearValues()
  }
})
</script>

<style scoped>
.base-text-input-error {
  @apply border-[#fd0b0be7] !important;
}

.base-text-input-error:focus {
  @apply border-[#fd0b0be7] !important;
}
</style>
