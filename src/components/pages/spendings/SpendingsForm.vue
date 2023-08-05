<template>
  <v-card border @submit.prevent>
    <v-card-title>Spending Form</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col>
            <DineroButton @click="onHandleValidateForm">Save</DineroButton>
          </v-col>
        </v-row>
        <div v-for="(item, index) in formModel" :key="index">
          <v-divider
            v-if="index !== 0"
            thickness="2"
            class="!tw-border-purple-600 border-opacity-100 mx-6 my-4"
          />
          <v-row>
            <v-col>
              <DineroInput v-model="item.description" label="Description" />
            </v-col>
            <v-col>
              <DineroInput v-model="item.amount" :prefix="item.payType || ''" label="Amount" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <DineroSelect
                v-model="item.category"
                label="Category"
                :selected-items="CATEGORIES_SELECT_OPTIONS"
              />
            </v-col>
            <v-col>
              <DineroDatePicker v-model="item.date" label="data" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <DineroButtonGroup v-model="item.currency" :buttons-options="PAY_TYPES" />
            </v-col>
            <v-col>
              <DineroButtonGroup v-model="item.payType" :buttons-options="CURRENCIES" />
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col>
            <DineroButton @click="$emit('onAddNewForm')"> Add new form</DineroButton>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType, toRefs } from 'vue'
import DineroInput from '@/components/ui/form/DineroInput.vue'
import DineroSelect from '@/components/ui/form/DineroSelect.vue'
import DineroButtonGroup from '@/components/ui/form/DineroButtonGroup.vue'
import DineroButton from '@/components/ui/form/DineroButton.vue'
import DineroDatePicker from '@/components/ui/form/DineroDatePicker.vue'
import { FinancialCollectionType } from '@/types/global'
import { FINANCIAL_COLLECTION_TYPE } from '@/constants/config'
import { PAY_TYPES, CURRENCIES, CATEGORIES_SELECT_OPTIONS } from '@/constants/config'
import { FormModel } from '@/types/models'

const props = defineProps({
  formModel: {
    type: Array as PropType<FormModel[]>,
    required: true,
    default: () => []
  },
  formType: {
    type: String as PropType<FinancialCollectionType>,
    default: FINANCIAL_COLLECTION_TYPE.SPENDING
  },
  isFormSent: {
    type: Boolean,
    required: true,
    default: false
  }
})

const { formModel, isFormSent } = toRefs(props)

const emit = defineEmits(['onAddNewForm', 'onSubmitAction', 'update:isFormSent'])

const onHandleValidateForm = async () => {
  await emit('onSubmitAction', formModel.value)
  emit('update:isFormSent', !isFormSent.value)
}
</script>
