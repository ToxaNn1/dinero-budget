<template>
  <v-card :loading="isFetchingCardsData">
    <template #loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate />
    </template>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover />
    <v-card-item>
      <v-card-title>Spendings</v-card-title>
      <v-card-subtitle class="tw-w-full !tw-flex tw-justify-end">For last July</v-card-subtitle>
    </v-card-item>
    <v-card-actions>
      <DineroButton @click="dashboardStore.getCardsData()">Refetch data</DineroButton>
      <v-spacer />
      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-card-text v-for="(item, index) in cardsData?.splice(0, 3)" :key="index">
          {{ item?.category }}
          <v-menu
            v-model="menu"
            location="top start"
            origin="top start"
            transition="scale-transition"
          >
            <template #activator="{ props }">
              <v-chip color="primary" text-color="white" pill v-bind="props" link>
                {{ item?.currency }}
                {{ item?.amount }}
              </v-chip>
            </template>
            <v-card width="300">
              <v-list bg-color="black">
                <v-list-item>
                  <v-list-item-title> Pay type: {{ item?.payType }}</v-list-item-title>
                  <template #append>
                    <v-list-item-action>
                      <v-btn icon variant="text" @click="menu = false">
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list>
              <v-list>
                <v-list-item link prepend-icon="mdi-briefcase">
                  <v-list-item-subtitle>Description: {{ item?.description }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          {{ item?.date }}
        </v-card-text>
        <v-card-actions>
          <DineroButton>See more</DineroButton>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, PropType, ref } from 'vue'
import type { CardOption } from '@/types/pages/dashboard-page.types'
import DineroButton from '@/components/ui/form/DineroButton.vue'
import { useDashboardStore } from '@/stores/useDashboardStore'
import { storeToRefs } from 'pinia'

defineProps({
  cardOption: {
    type: Object as PropType<CardOption>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const show = ref(false)
const menu = ref(false)
const dashboardStore = useDashboardStore()
const { cardsData, isFetchingCardsData } = storeToRefs(dashboardStore)

onMounted(async () => {
  await dashboardStore.getCardsData()
})
</script>
