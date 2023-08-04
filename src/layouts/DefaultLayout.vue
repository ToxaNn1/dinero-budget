<template>
  <v-layout class="tw-rounded-md">
    <Sidebar v-model="sidebar" />
    <v-app-bar title="Application bar">
      <HeaderCurrentMonthSwitcher />
      <div class="tw-flex tw-gap-2">
        <router-link class="tw-text-sky-500" to="dashboard-page">Home</router-link>
        <router-link class="tw-text-sky-500" to="settings-page">Settings</router-link>
        <router-link class="tw-text-sky-500" to="cool-tricks">Cool tricks</router-link>
      </div>
      <v-app-bar-nav-icon variant="text" @click.stop="sidebar = !sidebar" />
      <v-progress-linear color="primary" :active="globalLoading" indeterminate absolute bottom />
      <v-btn @click="toggleTheme">Change theme</v-btn>
    </v-app-bar>
    <v-main class="tw-flex tw-align-center tw-justify-center">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { THEME } from '@/constants/config'
import { onBeforeMount, ref, watch } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { useConfigStore } from '@/stores/useConfigStore'
import { storeToRefs } from 'pinia'
import HeaderCurrentMonthSwitcher from '@/components/header/HeaderCurrentMonthSwitcher.vue'
import { useTableStore } from '@/stores/useTableStore'
import { useSpendingStore } from '@/stores/useSpendingStore'

//stores
const tableStore = useTableStore()
const spendingStore = useSpendingStore()
const configStore = useConfigStore()

const { globalLoading, globalFormModel } = storeToRefs(configStore)
const { chartData } = storeToRefs(spendingStore)
const { tableData } = storeToRefs(tableStore)

const { getTableData } = tableStore
const { getChartData } = spendingStore

const theme = useTheme()
const sidebar = ref(false)

const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark ? THEME.LIGHT : THEME.DARK)

onBeforeMount(async () => {
  await configStore.getGlobalConfiguration()
})

watch(
  () => globalFormModel.value,
  async () => {
    chartData.value = []
    await getChartData()
    await getTableData()
  },
  { deep: true }
)
</script>
