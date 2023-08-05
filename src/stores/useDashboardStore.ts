import { defineStore } from 'pinia'
import { useFetch } from '@/composables/useFetch'
import { useFirebaseCommand } from '@/stores/useFirebaseCommand'
import { auth } from '@/main'
import { convertTimestamp } from '@/utils/convertTimestamp'
import { Ref, UnwrapRef } from 'vue'

interface TableData {
  isFetchingTableData: Ref<boolean>
  isFetchingErrorTableData: Ref<boolean>
  tableData: Ref<string[] | undefined> | Ref<UnwrapRef<string[] | undefined>>
  getTableData: (...args: never[]) => Promise<ReturnType<any[]>>
}

export const useDashboardStore = defineStore('useDashboardStore', () => {
  const { getMonthData } = useFirebaseCommand()

  const {
    loading: isFetchingCardsData,
    error: isFetchingErrorCardsData,
    callFetch: getCardsData,
    data: cardsData
  } = useFetch<Array<any>, (tableType: string) => Promise<any>>(async (tableType = 'spendings') => {
    try {
      const response = await getMonthData('July', auth?.currentUser.email, tableType)
      return Object.keys(response)
        .map((key) => response[key])
        .flatMap((item) => item)
        .map((item) => {
          return {
            description: item.description,
            category: item.category,
            amount: item.amount,
            currency: item.currency,
            payType: item.payType,
            date: convertTimestamp(item.date)
          }
        })
    } catch (e) {
      console.log(e.message)
    }
  })

  return {
    isFetchingCardsData,
    isFetchingErrorCardsData,
    getCardsData,
    cardsData
  }
})
