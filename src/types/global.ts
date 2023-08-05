import type { Component } from 'vue'

export type StringOrNumber = string | number

export type Currency = '$' | '₴' | '€'
export type Locale = 'en' | 'uk'
export type LayoutNames = 'default' | 'auth'
export type PayType = 'card' | 'cash' | 'CARD' | 'CASH'
export type AppTheme = 'light' | 'dark'
export type FinancialCollectionType = 'spendings' | 'income' | 'budget'

export type FirebaseDocumentType = FinancialCollectionType

export type Categories =
  | 'FOOD'
  | 'CLOTHES'
  | 'TRANSPORT'
  | 'REST'
  | 'HEALTH'
  | 'ASSETS'
  | 'CRYPTO'
  | 'DEBT'
  | 'GIFTS'
  | 'EDUCATION'
  | 'LEND'
  | 'OTHER'
  | 'ALCOHOL'
  | 'TECHNICS'
  | 'CIGARETS'
  | 'SUBSCRIPTIONS'

export interface CategoriesSelectOptions {
  label: string
  value: Categories
  icon: string | Promise<Component>
}

export type TABLE_ACTIONS = 'EDIT_ACTION' | 'DELETE_ACTION' | 'ADD_ACTION'
