import { createI18n } from 'vue-i18n'
import messages from '@/plugins/i18n/translations/index'

type MessageSchema = typeof messages

export const i18n = createI18n<[MessageSchema]>({
  locale: 'en-US',
  messages,
  legacy: false,
  modifiers: {
    snake_case: (str) => str.split('-').join('_')
  }
})
