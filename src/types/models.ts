import { CategoriesSelectOptions, Currency, PayType, StringOrNumber } from '@/types/global'

export interface FormModel {
  description: string
  category: CategoriesSelectOptions | string
  payType: PayType | string
  currency: Currency | string
  date: number | Date | string
  amount: StringOrNumber
}

export interface GlobalFormModel {
  globalMonth: string
  globalDateFormat: string
}
