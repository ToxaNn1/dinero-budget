import { useConfigStore } from '@/stores/useConfigStore'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { StringOrNumber } from '@/types/global'

const configStore = useConfigStore()
const { globalFormModel } = storeToRefs(configStore)

const getMonthNameByNumber = (monthNumber: StringOrNumber): string | Date => {
  const date = new Date()
  date.setMonth(+monthNumber)

  return date.toLocaleString([], { month: 'long' })
}

export const getMonthNumber = (
  month: string | Date = globalFormModel.value.globalMonth
): number => {
  const newMonthQuardValue = month ? month : getMonthNameByNumber(dayjs().month())
  const date = new Date(`${newMonthQuardValue} 1, 2023`)
  return date.getMonth()
}
