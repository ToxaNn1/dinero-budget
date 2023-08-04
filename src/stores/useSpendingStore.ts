import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useTableStore } from '@/stores/useTableStore'
import { useFirebaseCommand } from '@/stores/useFirebaseCommand'
import { FormModel } from '@/types/global'
import dayjs from 'dayjs'
import { useConfigStore } from '@/stores/useConfigStore'

export const useSpendingStore = defineStore('useSpendingStore', () => {
  const tableStore = useTableStore()
  const configStore = useConfigStore()
  const { globalFormModel } = storeToRefs(configStore)
  const { getTableData } = tableStore
  const firebaseStore = useFirebaseCommand()
  const { getMonthData } = useFirebaseCommand()
  const { tableData } = storeToRefs(tableStore)

  const formModel: FormModel[] = reactive([
    {
      description: '',
      category: '',
      payType: '',
      currency: '',
      date: '',
      amount: ''
    }
  ])

  const addNewSpendingForm = () => {
    formModel.push({
      description: '',
      category: '',
      payType: '',
      currency: '',
      date: '',
      amount: ''
    })
  }

  const removeNewSpendingForm = () => {
    formModel.pop()
  }

  const tableSearch = ref('')
  const chartData = ref([])

  // modal window
  const isOpenDialogForAddNewActions = ref(false)
  const isOpenDialogForDeleteActions = ref(false)
  const isOpenDialogForEditActions = ref(false)
  const tableRowItem = ref<FormModel>({})

  // filters
  const fromDate = ref('')
  const toDate = ref('')
  const minAmount = ref('')
  const maxAmount = ref('')
  const categoryFilter = ref('')

  const filteredTableData = computed(() => {
    console.log(tableData.value, 'tableData.value')
    return tableData.value.filter((item) => {
      const itemDate = new Date(item.date)
      const start = new Date(fromDate.value)
      const end = new Date(toDate.value)

      const filterMin = !minAmount.value || +item.amount >= +minAmount.value
      const filterMax = !maxAmount.value || +item.amount <= +maxAmount.value
      const filterDate =
        (!toDate.value && !fromDate.value) || (itemDate >= start && itemDate <= end)
      const filterCategory =
        !categoryFilter.value || item.category?.label === categoryFilter.value?.label

      return filterDate && filterCategory && filterMin && filterMax
    })
  })

  const resetFilters = () => {
    fromDate.value = ''
    minAmount.value = ''
    maxAmount.value = ''
    toDate.value = ''
    categoryFilter.value = ''
  }

  const getTableRow = ({ raw }: FormModel, actionName: string) => {
    if (actionName === 'EDIT_ACTION') {
      isOpenDialogForEditActions.value = true
    } else {
      isOpenDialogForDeleteActions.value = true
    }
    tableRowItem.value = raw
  }

  const onDeleteTableRow = async () => {
    isOpenDialogForDeleteActions.value = false
    await firebaseStore.deleteMonthData(tableRowItem.value)
    await getTableData()
    tableRowItem.value = {}
  }

  const onEditTableRow = async (oldFormModel: FormModel) => {
    isOpenDialogForEditActions.value = false
    await firebaseStore.updateMonthData(tableRowItem.value, oldFormModel)
    await getTableData()
    tableRowItem.value = {}
  }

  const onAddTableRow = async () => {
    isOpenDialogForAddNewActions.value = false
    const isHasSomeFieldFilled = formModel.every((item: FormModel) => {
      return Object.values(item).some((value) => {
        return value !== ''
      })
    })
    isHasSomeFieldFilled && (await firebaseStore.addNewMonthData(formModel))
    resetFormModel()
    await getTableData()
  }

  const resetFormModel = () => {
    formModel.forEach((item) => {
      item.description = ''
      item.category = ''
      item.payType = ''
      item.currency = ''
      item.date = ''
      item.amount = ''
    })
  }

  const getChartData = async () => {
    const response = await getMonthData(globalFormModel.value.globalMonth)
    console.log(response)
    if (response) {
      const arr = Object.keys(response)
        .map((key) => {
          return response[key]
        })
        .flatMap((item) => item)
        .map((item) => {
          return {
            date: dayjs(item.date).format('DD MMMM'),
            amount: +item.amount
          }
        })
      chartData.value = arr.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getDate() - dateB.getDate()
      })
    }
  }

  return {
    getChartData,
    fromDate,
    toDate,
    resetFilters,
    filteredTableData,
    tableSearch,
    addNewSpendingForm,
    removeNewSpendingForm,
    formModel,
    isOpenDialogForAddNewActions,
    isOpenDialogForDeleteActions,
    isOpenDialogForEditActions,
    getTableRow,
    categoryFilter,
    onDeleteTableRow,
    tableRowItem,
    onEditTableRow,
    minAmount,
    maxAmount,
    onAddTableRow,
    chartData
  }
})
