import { computed } from 'vue'
import dayjs from 'dayjs'

export const getFirebaseDocumentName = (documentName: string): string => {
  const icnomeYearDocuments = computed(() => 'income:' + dayjs().format('YYYY'))
  const spendingsYearDocuments = computed(() => 'spendings:' + dayjs().format('YYYY'))
  const budgetYearDocuments = computed(() => 'budget:' + dayjs().format('YYYY'))
  let document
  switch (documentName) {
    case 'income':
      document = icnomeYearDocuments.value
      break
    case 'spendings':
      document = spendingsYearDocuments.value
      break
    case 'budget':
      document = budgetYearDocuments.value
      break
    default:
      document = spendingsYearDocuments.value
  }
  return document
}
