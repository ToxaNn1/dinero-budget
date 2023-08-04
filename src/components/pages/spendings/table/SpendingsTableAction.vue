<template>
  <v-card-actions>
    <div class="tw-flex tw-flex-col tw-w-1/2">
      <div class="tw-flex tw-gap-4 tw-items-center tw-w-full">
        <DineroButton is-disable-margin button-content="Refetch" @click="getTableData" />
        <DineroButton
          is-disable-margin
          button-content="Filters"
          @click="$emit('update:drawer-show', !drawerShow)"
        />
        <DineroInput
          :model-value="tableSearch"
          density="small"
          label="Search"
          placeholder="Search ...."
          @update:model-value="$emit('update:table-search', $event)"
        />
      </div>
      <FilterChip />
    </div>
  </v-card-actions>
</template>

<script lang="ts" setup>
import DineroButton from '@/components/ui/form/DineroButton.vue'
import DineroInput from '@/components/ui/form/DineroInput.vue'
import FilterChip from '@/components/ui/FilterChip.vue'
import { useTableStore } from '@/stores/useTableStore'

defineProps({
  drawerShow: {
    type: Boolean,
    default: false,
    required: false
  },
  tableSearch: {
    type: String,
    default: ''
  }
})

defineEmits(['update:table-search', 'update:drawer-show'])

const tableStore = useTableStore()
const { getTableData } = tableStore
</script>
