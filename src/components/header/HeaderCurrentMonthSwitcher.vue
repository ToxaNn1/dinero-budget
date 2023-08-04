<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn color="primary" v-bind="props"> {{ globalFormModel.globalMonth }} </v-btn>
    </template>
    <v-list @click:select="onSelectMenuItem">
      <v-list-item v-for="(item, index) in months" :key="index" :value="index">
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useConfigStore } from '@/stores/useConfigStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const configStore = useConfigStore()
const { changeGlobalFormModel } = configStore
const { globalFormModel } = storeToRefs(configStore)

const months = computed(() => getMonthNames())

function getMonthNames() {
  const monthNames = []
  for (let month = 0; month < 12; month++) {
    const monthName = dayjs().month(month).format('MMMM')
    monthNames.push(monthName)
  }
  return monthNames
}

interface SelectMonthMenuItem {
  id: number
  value: boolean
  path: number[]
  event: PointerEvent
}

const onSelectMenuItem = (item: SelectMonthMenuItem) => {
  changeGlobalFormModel('globalMonth', months.value[item.id])
}
</script>
