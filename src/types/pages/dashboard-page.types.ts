import type { Component } from 'vue'
import { Category, Currency, FinancialCollectionType } from '@/types/global'

export type TagsType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface HistoryCardOption {
  content: string
  iconName: Component
  moneyValue: number
  currency?: Currency
  category: Category
}

export interface CardOption {
  title: FinancialCollectionType
  type?: TagsType
  titleTime?: string | Date
  iconName?: Component
  moneyValue: number
}

export interface BankClientInfo {
  clientId: string
  name: string
  webHookUrl: string
  permissions: string
  accounts: BankAccount[]
}

export interface BankAccount {
  id: string
  sendId: string
  currencyCode: number
  cashbackType: string
  balance: number
  creditLimit: number
  maskedPan: string[]
  type: string
  iban: string
}

export interface BankStatement {
  amount: number
  balance: number
  cashbackAmount: number
  commissionRate: number
  currencyCode: number
  description: string
  hold: boolean
  id: string
  mcc: number
  operationAmount: number
  originalMcc: number
  receiptId: string
  time: number | Date
}
