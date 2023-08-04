import {
  LayoutNames,
  AppTheme,
  FinancialCollectionType,
  PayType,
  Currency,
  CategoriesSelectOptions,
  Categories
} from '@/types/global'
import { setUpperFirstLetter } from '@/helpers/setUpperFirstLetter'

export const LAYOUT_NAMES = Object.freeze(<Record<string, LayoutNames>>{
  DEFAULT: 'default',
  AUTH: 'auth'
})

export const LOCALES = Object.freeze({
  EN_US: 'en-US',
  UA_UK: 'ua-UK'
})

export const THEME = Object.freeze(<Record<string, AppTheme>>{
  LIGHT: 'light',
  DARK: 'dark'
})

export const CATEGORY = Object.freeze(<Record<string, Categories>>{
  FOOD: 'FOOD',
  CLOTHES: 'CLOTHES',
  TRANSPORT: 'TRANSPORT',
  REST: 'REST',
  HEALTH: 'HEALTH',
  ASSETS: 'ASSETS',
  CRYPTO: 'CRYPTO',
  DEBT: 'DEBT',
  GIFTS: 'GIFTS',
  EDUCATION: 'EDUCATION',
  LEND: 'LEND',
  OTHER: 'OTHER',
  ALCOHOL: 'ALCOHOL',
  TECHNICS: 'TECHNICS',
  CIGARETS: 'CIGARETS',
  SUBSCRIPTIONS: 'SUBSCRIPTIONS'
})

export const FINANCIAL_COLLECTION_TYPE = Object.freeze(<Record<string, FinancialCollectionType>>{
  BUDGET: 'budget',
  INCOME: 'income',
  SPENDINGS: 'spendings'
})

export const PAY_TYPE = Object.freeze(<Record<string, PayType>>{
  CARD: 'CARD',
  CASH: 'CASH'
})

export const CURRENCY_SYMBOLS = Object.freeze(<Record<string, Currency>>{
  USD: '$',
  UAH: '₴',
  EUR: '€'
})

export const NAME_OF_SUB_COLLECTION = 'months'

export const CURRENCIES: Currency[] = [
  CURRENCY_SYMBOLS.UAH,
  CURRENCY_SYMBOLS.USD,
  CURRENCY_SYMBOLS.EUR
]

export const PAY_TYPES: PayType[] = [PAY_TYPE.CARD, PAY_TYPE.CASH]

export const CATEGORIES_SELECT_OPTIONS: CategoriesSelectOptions[] = [
  {
    label: setUpperFirstLetter(CATEGORY.FOOD),
    value: CATEGORY.FOOD,
    icon: 'mdi-food'
  },
  {
    label: setUpperFirstLetter(CATEGORY.TRANSPORT),
    value: CATEGORY.TRANSPORT,
    icon: 'mdi-train-car'
  },
  {
    label: setUpperFirstLetter(CATEGORY.CLOTHES),
    value: CATEGORY.CLOTHES,
    icon: 'mdi-tshirt-crew'
  },
  {
    label: setUpperFirstLetter(CATEGORY.TECHNICS),
    value: CATEGORY.TECHNICS,
    icon: 'mdi-desktop-tower'
  },
  {
    label: setUpperFirstLetter(CATEGORY.HEALTH),
    value: CATEGORY.HEALTH,
    icon: 'mdi-hand-heart-outline'
  },
  {
    label: setUpperFirstLetter(CATEGORY.REST),
    value: CATEGORY.REST,
    icon: 'fa-solid fa-face-laugh-squint'
  },
  {
    label: setUpperFirstLetter(CATEGORY.ASSETS),
    value: CATEGORY.ASSETS,
    icon: 'fa-solid fa-file-contract'
  },
  {
    label: setUpperFirstLetter(CATEGORY.CRYPTO),
    value: CATEGORY.CRYPTO,
    icon: '/src/assets/icons/components/crypto.vue'
  },
  {
    label: setUpperFirstLetter(CATEGORY.DEBT),
    value: CATEGORY.DEBT,
    icon: '/src/assets/icons/components/debt.vue'
  },
  {
    label: setUpperFirstLetter(CATEGORY.GIFTS),
    value: CATEGORY.GIFTS,
    icon: 'fa-solid fa-gift'
  },
  {
    label: setUpperFirstLetter(CATEGORY.EDUCATION),
    value: CATEGORY.EDUCATION,
    icon: 'fa-solid fa-graduation-cap'
  },
  {
    label: setUpperFirstLetter(CATEGORY.LEND),
    value: CATEGORY.LEND,
    icon: '/src/assets/icons/components/toLend.vue'
  },
  {
    label: setUpperFirstLetter(CATEGORY.OTHER),
    value: CATEGORY.OTHER,
    icon: '/src/assets/icons/components/other.vue'
  },
  {
    label: setUpperFirstLetter(CATEGORY.ALCOHOL),
    value: CATEGORY.ALCOHOL,
    icon: '/src/assets/icons/components/alcohol.vue'
  },
  {
    label: setUpperFirstLetter(CATEGORY.CIGARETS),
    value: CATEGORY.CIGARETS,
    icon: 'mdi-cigar'
  }
]
