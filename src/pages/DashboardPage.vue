<template>
  <div class="tw-flex tw-flex-col tw-w-full tw-p-4">
    <v-row>
      <v-col>
        <DineroButton @click="login">login</DineroButton>
        <v-btn @click="getData">GEt data</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SpendingsTable />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Spending Chart</v-card-title>
          <v-card-subtitle>For {{ globalFormModel.globalMonth }}</v-card-subtitle>
          <v-card-text>
            <DashboardChart />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useFirebaseCommand } from '@/stores/useFirebaseCommand'
import SpendingsTable from '@/components/pages/spendings/table/SpendingsTable.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import DineroButton from '@/components/ui/form/DineroButton.vue'
import DashboardChart from '@/components/pages/dashboard/charts/DashboardChart.vue'
import { notify } from '@/plugins/toast-notification'
import { useSpendingStore } from '@/stores/useSpendingStore'
import { storeToRefs } from 'pinia'
import { useTableStore } from '@/stores/useTableStore'
import { useConfigStore } from '@/stores/useConfigStore'

const spendingStore = useSpendingStore()
const tableStore = useTableStore()

const configStore = useConfigStore()
const { globalFormModel } = storeToRefs(configStore)

const { formModel } = storeToRefs(spendingStore)
const { loginUser, fetchUserFromFirebase } = useAuthStore()

const firebaseStore = useFirebaseCommand()

const authForm = reactive({
  email: 'test@gmail.com',
  password: 'test@gmail.com'
})

const login = async () => {
  await loginUser(authForm.email, authForm.password)
  await fetchUserFromFirebase()
}

const getData = async () => {
  const response = await firebaseStore.getMonthData()
}

watch(
  () => formModel.value,
  async () => {
    await tableStore.getTableData()
    await spendingStore.getChartData()
    notify('Updated success', 'success')
  },
  { immediate: true }
)
</script>
