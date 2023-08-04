<template>
  <v-card>
    <v-card-title>Spending table</v-card-title>
    <v-card-subtitle>For {{ globalFormModel.globalMonth }}</v-card-subtitle>
    <SpendingsTableAction
      v-model:table-search="tableSearch"
      :drawer-show="drawerShow"
      @update:drawer-show="drawerShow = $event"
    />
    <v-card-text>
      <v-data-table
        v-model:items-per-page="tableItemsPerPage"
        :loading="isFetchingTableData"
        :headers="headers"
        :items="filteredTableData"
        :search="tableSearch"
      >
        <template #top>
          <v-toolbar>
            <DineroTableDIalog
              v-model="isOpenDialogForAddNewActions"
              dialog-title="Add new spendings"
              :form-model="formModel"
              max-width="800px"
              :table-action-name="tableActionName"
              @on-add-button="spendingStore.addNewSpendingForm"
              @on-remove-button="spendingStore.removeNewSpendingForm"
              @on-cancel-button="isOpenDialogForAddNewActions = false"
              @on-submit-button="spendingStore.onAddTableRow"
            >
              <template #activator-content>
                <div class="tw-flex tw-w-full tw-items-center tw-gap-4">
                  <DineroButton class="ml-3" @click="onOpenDialogForAddNewActions">
                    New Item
                  </DineroButton>
                  <h2 class="tw-text-2xl">
                    Total Summary Amount:
                    <span class="tw-font-bold tw-text-lg">{{ sumAmounts }}</span>
                  </h2>
                </div>
              </template>
            </DineroTableDIalog>
          </v-toolbar>
        </template>
        <template #[`item.category`]="{ item }">
          <div class="table-tag">
            <DineroIcon color="#663399" :icon="item.columns.category.icon" />
            <p>{{ item.columns.category.label }}</p>
          </div>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon size="small" color="primary" class="me-2" @click="onEditTableTow(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" color="error" @click="onDeleteTableTow(item)"> mdi-delete </v-icon>
        </template>
        <template #no-data>
          <v-btn color="primary" @click="tableStore.getTableData">Refetch</v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
  <DineroTableDIalog
    v-model="isOpenDialogForDeleteActions"
    dialog-title="Are you sure you want to delete this item?"
    card-action-classes="tw-justify-center"
    :table-action-name="tableActionName"
    @on-cancel-button="isOpenDialogForDeleteActions = false"
    @on-submit-button="spendingStore.onDeleteTableRow"
  />
  <DineroTableDIalog
    v-model="isOpenDialogForEditActions"
    dialog-title="Edit spendings item"
    :form-model="tableRowItem"
    max-width="800px"
    :table-action-name="tableActionName"
    @on-cancel-button="isOpenDialogForEditActions = false"
    @on-submit-button="spendingStore.onEditTableRow"
  />
  <FiltersDrawer v-model="drawerShow" @reset-filters="spendingStore.resetFilters">
    <template #default="slotProps">
      <DineroDatePicker
        v-model="fromDate"
        :date-picker-class="slotProps.textFieldClass"
        label="From Date"
        placeholder="From Date"
      />
      <DineroDatePicker
        v-model="toDate"
        :date-picker-class="slotProps.textFieldClass"
        label="To Date"
        placeholder="To Date"
      />
      <DineroSelect
        v-model="categoryFilter"
        :select-class="slotProps.textFieldClass"
        label="Category"
        placeholder="Select Category ...."
        :selected-items="CATEGORIES_SELECT_OPTIONS"
      />
      <DineroInput
        v-model="minAmount"
        :class="slotProps.textFieldClass"
        label="Min Amount"
        placeholder="Min Amount ...."
      />
      <DineroInput
        v-model="maxAmount"
        :class="slotProps.textFieldClass"
        label="Max Amount"
        placeholder="Max Amount ...."
      />
    </template>
  </FiltersDrawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useTableStore } from '@/stores/useTableStore'
import { storeToRefs } from 'pinia'
import { headers, TABLE_ACTIONS } from '@/constants/table.constants'
import DineroIcon from '@/components/ui/form/DineroIcon.vue'
import DineroDatePicker from '@/components/ui/form/DineroDatePicker.vue'
import DineroButton from '@/components/ui/form/DineroButton.vue'
import DineroInput from '@/components/ui/form/DineroInput.vue'
import DineroTableDIalog from '@/components/ui/table/DineroTableDIalog.vue'
import { useSpendingStore } from '@/stores/useSpendingStore'
import { FormModel } from '@/types/global'
import DineroSelect from '@/components/ui/form/DineroSelect.vue'
import { CATEGORIES_SELECT_OPTIONS } from '@/constants/config'
import FiltersDrawer from '@/components/FiltersDrawer.vue'
import SpendingsTableAction from '@/components/pages/spendings/table/SpendingsTableAction.vue'
import { useConfigStore } from '@/stores/useConfigStore'

const configStore = useConfigStore()
const { globalFormModel } = storeToRefs(configStore)
const tableStore = useTableStore()
const { isFetchingTableData } = storeToRefs(tableStore)
const spendingStore = useSpendingStore()

const {
  formModel,
  isOpenDialogForEditActions,
  isOpenDialogForAddNewActions,
  isOpenDialogForDeleteActions,
  tableRowItem,
  fromDate,
  toDate,
  tableSearch,
  filteredTableData,
  categoryFilter,
  minAmount,
  maxAmount
} = storeToRefs(spendingStore)

const tableActionName = ref(TABLE_ACTIONS.ADD_ACTION)
const drawerShow = ref(false)

const onEditTableTow = (item: FormModel) => {
  spendingStore.getTableRow(item, TABLE_ACTIONS.EDIT_ACTION)
  tableActionName.value = TABLE_ACTIONS.EDIT_ACTION
}

const onDeleteTableTow = (item: FormModel) => {
  spendingStore.getTableRow(item, TABLE_ACTIONS.DELETE_ACTION)
  tableActionName.value = TABLE_ACTIONS.DELETE_ACTION
}

const sumAmounts = computed(() => {
  return filteredTableData.value.reduce((acc, item) => acc + +item.amount, 0)
})

const onOpenDialogForAddNewActions = () => {
  isOpenDialogForAddNewActions.value = true
  tableActionName.value = 'ADD_ACTION'
}

// TODO   add pahination bottom sloy is reserved   <template #bottom>
//     <div class="tw-px-4 tw-pt[22px]">
//     <p>
//         Total sum: <span>{{ sumAmounts }}</span>
// </p>
// </div>
// </template>
const tableItemsPerPage = ref(5)
</script>

<style lang="scss">
.table-tag {
  @apply tw-inline-flex tw-items-center tw-gap-[5px] tw-px-[8px] tw-py-[4px] tw-w-[110px] tw-bg-blue-300 tw-text-white tw-rounded-[4px];
}
</style>
