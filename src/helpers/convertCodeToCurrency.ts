import { ISO_4217 } from '@/constants/dashboard-page.constants'

export const convertCodeToCurrency = (code: number): string => {
  let currency = ''
  switch (code) {
    case (code = ISO_4217.USD):
      currency = '$'
      break
    case (code = ISO_4217.UAH):
      currency = '₴'
      break
    case (code = ISO_4217.EUR):
      currency = '€'
      break
  }
  return currency
}
