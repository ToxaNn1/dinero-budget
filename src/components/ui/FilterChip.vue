<template>
  <v-chip-group column multiple>
    <v-chip
      v-if="categoryFilter"
      closable
      variant="outlined"
      @click:close="onCloseFilterChip('categoryFilter')"
    >
      Category: {{ categoryFilter.label }}
      <DineroIcon color="primary" :size="20" :icon="categoryFilter.icon" />
    </v-chip>
    <v-chip
      v-if="minAmount"
      closable
      variant="outlined"
      @click:close="onCloseFilterChip('minAmount')"
    >
      MinAmount: {{ minAmount }}
    </v-chip>
    <v-chip
      v-if="maxAmount"
      closable
      variant="outlined"
      @click:close="onCloseFilterChip('maxAmount')"
    >
      MaxAmount: {{ maxAmount }}
    </v-chip>
    <v-chip
      v-if="fromDate && toDate"
      closable
      variant="outlined"
      @click:close="onCloseFilterChip('fromDate')"
    >
      Date from {{ fromDate }} to {{ toDate }}
    </v-chip>
  </v-chip-group>
</template>

<script lang="ts" setup>
import DineroIcon from '@/components/ui/form/DineroIcon.vue'
import { useSpendingStore } from '@/stores/useSpendingStore'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const store = useSpendingStore()
const { categoryFilter, minAmount, maxAmount, fromDate, toDate } = storeToRefs(store)

const onCloseFilterChip = (filter: string) => {
  if (filter === 'categoryFilter') categoryFilter.value = ''
  if (filter === 'minAmount') minAmount.value = ''
  if (filter === 'maxAmount') maxAmount.value = ''
  if (filter === 'maxAmount') maxAmount.value = ''
  if (filter === 'fromDate' || filter === 'toDate') {
    fromDate.value = ''
    toDate.value = ''
  }
}
</script>
