<template>
  <v-form>
    <div v-for="(item, index) in formModelArray" :key="index">
      <div v-if="index !== 0" class="!tw-relative">
        <v-divider
          thickness="2"
          class="!tw-border-purple-600 !tw-cursor-pointer border-opacity-100 mx-6 my-4"
        />
        <div
          class="tw-h-[30px] tw-z-[100] tw-bg-white tw-top-[-14px] tw-left-1/2 -tw-translate-x-2/4 tw-absolute tw-cursor-pointer tw-w-[30px] tw-rounded-full tw-border-red-200 tw-border-2 tw-flex tw-items-center tw-justify-center"
          @click="$emit('on-remove-button')"
        >
          <DineroIcon color="red" :size="20" icon="fa-solid fa-minus" />
        </div>
      </div>
      <v-container>
        <v-form ref="form" @submit.prevent="onSubmitForm">
          <v-row>
            <v-col cols="12" lg="6" sm="6" md="6">
              <DineroInput
                v-model="item.description"
                :rules="dineroFormRules.description"
                label="Description"
              />
            </v-col>
            <v-col cols="12" lg="6" sm="6" md="6">
              <DineroInput v-model="item.amount" :prefix="item.payType || ''" label="Amount" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6" sm="6" md="6">
              <DineroSelect
                v-model="item.category"
                label="Category"
                :selected-items="CATEGORIES_SELECT_OPTIONS"
              />
            </v-col>
            <v-col cols="12" lg="6" sm="6" md="6">
              <DineroDatePicker v-model="item.date" label="data" />
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col align-self="end" cols="12" lg="6" sm="6" md="6">
              <DineroButtonGroup v-model="item.currency" :buttons-options="PAY_TYPES" />
            </v-col>
            <v-col align-self="end" cols="12" lg="6" sm="6" md="6">
              <DineroButtonGroup v-model="item.payType" :buttons-options="CURRENCIES" />
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, toRefs, ref } from 'vue'
import DineroInput from '@/components/ui/form/DineroInput.vue'
import DineroSelect from '@/components/ui/form/DineroSelect.vue'
import DineroButtonGroup from '@/components/ui/form/DineroButtonGroup.vue'
import DineroDatePicker from '@/components/ui/form/DineroDatePicker.vue'
import DineroIcon from '@/components/ui/form/DineroIcon.vue'
import { FormModel } from '@/types/global'
import { PAY_TYPES, CURRENCIES, CATEGORIES_SELECT_OPTIONS } from '@/constants/config'

const props = defineProps({
  formModel: {
    type: Array as PropType<FormModel[]>,
    required: true,
    default: () => []
  }
})
const emit = defineEmits(['on-remove-button', 'on-add-button', 'on-submit-form'])

const form = ref(null)
const { formModel } = toRefs(props)

const dineroFormRules = ref({
  description: [(v: string) => !!v || 'Description is required'],
  amount: [(v: string) => !!v || 'Amount is required'],
  category: [(v: string) => !!v || 'Category is required'],
  date: [(v: string) => !!v || 'Date is required'],
  currency: [(v: string) => !!v || 'Currency is required'],
  payType: [(v: string) => !!v || 'Pay type is required']
})

const onSubmitForm = async () => {
  console.log('submit')
  const { valid } = await form.value.validate()

  if (valid) console.log('Form is valid')
  else console.log('Form is not valid')
  emit('on-submit-form', formModel)
}
// має бути обовязково масив
const formModelArray = computed(() => {
  if (formModel.value.length) {
    return formModel.value
  } else {
    return [formModel.value]
  }
})
</script>
