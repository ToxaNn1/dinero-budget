<template>
  <v-dialog
    :model-value="modelValue"
    v-bind="$attrs"
    :max-width="dialogMaxWidth"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #activator="{ props }">
      <slot name="activator-content" v-bind="props" />
    </template>
    <v-card class="!tw-py-[10px]">
      <v-card-title>
        <span class="text-h5">{{ dialogTitle }}</span>
        <v-divider thickness="2" class="!tw-border-purple-300 border-opacity-100 mx-6 my-4" />
      </v-card-title>
      <v-card-text v-if="Object.keys(formModel).length" class="pt-0">
        <v-container>
          <slot name="drawerContent">
            <DineroForm
              :form-model="formModel"
              @on-submit-form="test"
              @on-remove-button="$emit('on-remove-button', $event)"
              @on-add-button="$emit('on-add-button', $event)"
            />
          </slot>
        </v-container>
      </v-card-text>

      <v-card-actions class="!tw-px-[36px]" :class="cardActionClasses">
        <slot name="drawerAction">
          <v-spacer />
          <DineroButton :button-content="cancelButtonContent" @click="$emit('onCancelButton')" />
          <DineroButton :button-content="submitButtonContent" @click="test" />
          <!--          <DineroButton-->
          <!--            :button-content="submitButtonContent"-->
          <!--            @click="$emit('on-submit-button', oldFormModel)"-->
          <!--          />-->
          <DineroButton
            v-if="tableActionName === 'ADD_ACTION'"
            button-content="Add new form"
            @click="$emit('onAddButton', oldFormModel)"
          />
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import DineroButton from '@/components/ui/form/DineroButton.vue'
import DineroForm from '@/components/ui/form/DineroForm.vue'
import { onMounted, PropType, ref, toRef, watch } from 'vue'
import { FormModel } from '@/types/global'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  },
  cardActionClasses: {
    type: String,
    default: 'tw-justify-end'
  },
  formModel: {
    type: Object as PropType<FormModel>,
    default: () => ({})
  },
  tableActionName: {
    type: String,
    default: 'ADD_ACTION'
  },
  cancelButtonContent: {
    type: String,
    default: 'Cancel'
  },
  submitButtonContent: {
    type: String,
    default: 'Save'
  },
  dialogMaxWidth: {
    type: [String, Number],
    default: '500px'
  },
  dialogTitle: {
    type: String,
    default: '',
    required: true
  }
})

const emit = defineEmits([
  'update:modelValue',
  'onAddButton',
  'onCancelButton',
  'on-submit-button',
  'on-remove-button',
  'on-add-button'
])

const oldFormModel = ref({})

const test = () => {
  console.log('test')
  emit('on-submit-button', oldFormModel.value)
}

// це піздєц
// для firebase updateMonthData  треба передати два значення
// 1. oldFormModel - це обєкт який є копією formModel, але ще до змін
// 2. formModel - це обєкт який ми змінюємо
// це треба для того щоб ця функція спочатку видалила старі значення, а потім додала нові

onMounted(() => {
  oldFormModel.value = { ...toRef(props, 'formModel').value }

  watch(toRef(props, 'formModel'), (newVal) => {
    oldFormModel.value = { ...newVal }
  })
})
</script>
