<template>
  <v-menu v-model="isOpenMenu" class="dinero-date-picker__menu" :offset="35">
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        :model-value="modelValue"
        class="!tw-cursor-pointer"
        variant="outlined"
        placeholder="Select Date"
        :label="label"
        :class="datePickerClass"
        :density="density"
        clearable
        hide-details
        color="primary"
        readonly
        append-outer
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </template>
    <VueDatePicker
      inline
      position="center"
      :model-value="modelValue"
      auto-apply
      :start-date="defaultDate"
      :month-change-on-scroll="false"
      @update:model-value="onChangeDatepicker"
    />
  </v-menu>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import dayjs from 'dayjs'
import { getMonthNumber } from '@/utils/getMonthNumber'

defineProps({
  modelValue: {
    type: [String, Number, Date],
    default: '',
    required: true
  },
  datePickerClass: {
    type: String,
    default: ''
  },
  density: {
    type: String,
    default: 'compact'
  },
  label: {
    type: String,
    default: 'Date',
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
const isOpenMenu = ref(false)

const onChangeDatepicker = (date: Date) => {
  emit('update:modelValue', dayjs(date).format('DD MMMM YYYY'))
  isOpenMenu.value = false
}

const defaultDate = computed(() => new Date(new Date().getFullYear(), getMonthNumber()))
</script>

<style lang="scss">
.dinero-date-picker__menu {
  .dp__flex_display {
    @apply tw-flex tw-justify-center #{!important};
    .dp__outer_menu_wrap:before {
      @apply tw-absolute tw-mt-[-20px] tw-bottom-[-10px] tw-border-solid tw-left-1/2 tw-w-0 tw-h-0 #{!important};
      content: '';
      border-width: 10px 10px 10px 10px;
      border-color: transparent #ddd transparent transparent;
      transform: translate(-50%, 0);
    }
  }
}
</style>
