import { ref } from 'vue'
import type { TABLE_ACTIONS } from '@/types/global'

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number

type SelectItemKey =
  | boolean
  | string
  | (string | number)[]
  | ((item: Record<string, any>, fallback?: any) => any)

type DataTableHeader = {
  key: string
  value?: SelectItemKey
  title: string
  colspan?: number
  rowspan?: number
  fixed?: boolean
  align?: 'start' | 'end'
  width?: number
  minWidth?: string
  maxWidth?: string
  sortable?: boolean
  sort?: DataTableCompareFunction
}

export const headers: DataTableHeader[] = ref([
  { title: 'Date', align: 'start', key: 'date' },
  { title: 'Description', align: 'start', key: 'description' },
  {
    title: 'Category',
    align: 'start',
    sortable: true,
    key: 'category'
  },
  { title: 'Amount', align: 'end', key: 'amount' },
  { title: 'Currency', align: 'end', key: 'currency' },
  { title: 'Pay type', align: 'end', key: 'payType' },
  { title: 'Actions', key: 'actions', sortable: false }
])

export const TABLE_ACTIONS = Object.freeze<Record<string, TABLE_ACTIONS>>({
  EDIT_ACTION: 'EDIT_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
  ADD_ACTION: 'ADD_ACTION'
})
