<template>
  <v-select
    class="dinero-select"
    color="primary"
    variant="outlined"
    :model-value="modelValue"
    clearable
    :density="density"
    :rules="rules"
    :class="selectClass"
    size
    hide-details
    :loading="loading"
    :items="selectedItems"
    :label="label"
    return-object
    item-title="label"
    item-value="value"
    :menu-props="{
      closeOnClick: true,
      closeOnContentClick: true
    }"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #item="{ item }">
      <v-list-item
        class="dinero-select__option-item"
        @click="$emit('update:modelValue', item.value)"
      >
        <DineroIcon color="#663399" :size="20" :icon="item.value.icon" />
        {{ item.value.label }}
      </v-list-item>
    </template>
    <template v-if="modelValue" #prepend-inner>
      <DineroIcon color="#663399" :size="20" :icon="modelValue.icon" />
    </template>
  </v-select>
</template>

<script lang="ts" setup>
import { CategoriesSelectOptions } from '@/types/global'
import { PropType } from 'vue'
import DineroIcon from '@/components/ui/form/DineroIcon.vue'

defineProps({
  modelValue: {
    type: [Object, String],
    default: () => '',
    required: true
  },
  rules: {
    type: Array,
    default: () => []
  },
  selectClass: {
    type: String,
    default: ''
  },
  density: {
    type: String,
    default: 'compact'
  },
  loading: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  },
  selectedItems: {
    type: Array as PropType<CategoriesSelectOptions[]>,
    default: () => []
  }
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss">
.dinero-select {
  &__option-item {
    .v-list-item {
      &__content {
        @apply tw-flex tw-gap-2 tw-items-center  #{!important};
      }
    }
  }
}
</style>
