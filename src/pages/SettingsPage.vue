<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="4">
              <DineroInput v-model="globalFormModel.globalMonth" label="Global Month" />
            </v-col>
            <v-col cols="4">
              <DineroInput v-model="globalFormModel.globalDateFormat" label="Global Date Format" />
            </v-col>
          </v-row>
        </v-form>

        <DineroButton
          class="tw-mt-4 tw-mx-4"
          button-content="Save Settings Configuration"
          :loading="globalLoading"
          @click="onSaveGlobalConfiguration"
        />

        <DineroButton
          class="tw-mt-4"
          button-content="Get Settings Configuration"
          :loading="globalLoading"
          @click="getGlobalConfiguration"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import DineroInput from '@/components/ui/form/DineroInput.vue'
import DineroButton from '@/components/ui/form/DineroButton.vue'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/useConfigStore'

const configStore = useConfigStore()
const { onSaveGlobalConfiguration, getGlobalConfiguration } = configStore
const { globalLoading, globalFormModel } = storeToRefs(configStore)
</script>
