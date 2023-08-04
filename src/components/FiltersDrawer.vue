<template>
  <v-navigation-drawer
    :model-value="modelValue"
    location="right"
    rail
    class="!tw-bg-grey-200 !tw-p-4"
    rail-width="340"
    tag="article"
    permanent
    elevation="8"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="tw-flex tw-flex-col tw-gap-4">
      <div class="tw-text-center tw-mb-4 tw-text-lg tw-font-bold tw-gray-700">Filters</div>
      <slot :text-field-class="'!tw-bg-white'" name="default" />
    </div>
    <DineroButton
      button-content="Close filters"
      class="tw-mt-4 tw-w-full"
      @click="$emit('update:modelValue', false)"
    />
    <DineroButton
      class="tw-mt-4 tw-w-full"
      button-content="Reset filters"
      @click="$emit('reset-filters')"
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import DineroButton from '@/components/ui/form/DineroButton.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:modelValue', 'reset-filters'])
</script>

<style scoped></style>
