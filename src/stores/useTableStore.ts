import { defineStore, storeToRefs } from 'pinia'
import { useFirebaseCommand } from '@/stores/useFirebaseCommand'
import { ref, Ref, UnwrapRef } from 'vue'
import { useConfigStore } from '@/stores/useConfigStore'

interface TableData {
  isFetchingTableData: Ref<boolean>
  isFetchingErrorTableData: Ref<boolean>
  tableData: Ref<string[] | undefined> | Ref<UnwrapRef<string[] | undefined>>
  getTableData: (...args: never[]) => Promise<ReturnType<any[]>>
}

export const useTableStore = defineStore('useTableStore', () => {
  const { getMonthData } = useFirebaseCommand()
  const configStore = useConfigStore()
  const { globalFormModel } = storeToRefs(configStore)
  const isFetchingTableData = ref(false)
  const isFetchingErrorTableData = ref(false)
  const tableData = ref<any>([])

  const getTableData = async () => {
    try {
      isFetchingTableData.value = true
      const response = await getMonthData(globalFormModel.value.globalMonth)
      if (!response) return []
      tableData.value = Object.keys(response)
        .map((key) => {
          return response[key]
        })
        .flatMap((item) => item)
        .map((item) => {
          return { ...item }
        })
    } catch (e) {
      isFetchingTableData.value = false
      isFetchingErrorTableData.value = true
      console.log(e.message)
    } finally {
      isFetchingTableData.value = false
    }
  }

  return {
    getTableData,
    isFetchingTableData,
    isFetchingErrorTableData,
    tableData
  }
})
