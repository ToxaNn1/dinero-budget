import { collection, doc } from '@firebase/firestore'
import { db, auth } from '@/main'
import { pathToFirebaseDoc } from '@/helpers/pathToFirebaseDoc'
import { getFirebaseDocumentName } from '@/utils/getFirebaseDocumentName'
import { FINANCIAL_COLLECTION_TYPE, NAME_OF_SUB_COLLECTION } from '@/constants/config'
import { FirebaseDocumentType } from '@/types/global'
import { computed } from 'vue'
import dayjs from 'dayjs'

export const useFirebaseHelperCommand = (
  monthName?,
  documentName: FirebaseDocumentType = FINANCIAL_COLLECTION_TYPE.SPENDINGS,
  userId = auth.currentUser?.email,
  year = 2023
) => {
  const icnomeYearDocuments = computed(() => 'income:' + dayjs().format('YYYY'))
  const spendingsYearDocuments = computed(() => 'spendings:' + dayjs().format('YYYY'))
  const budgetYearDocuments = computed(() => 'budget:' + dayjs().format('YYYY'))
  let firebaseDocumentName
  switch (documentName) {
    case 'income':
      firebaseDocumentName = icnomeYearDocuments.value
      break
    case 'spendings':
      firebaseDocumentName = spendingsYearDocuments.value
      break
    case 'budget':
      firebaseDocumentName = budgetYearDocuments.value
      break
    default:
      firebaseDocumentName = spendingsYearDocuments.value
  }

  const userRef = doc(db, pathToFirebaseDoc(userId), firebaseDocumentName)
  const monthsRef = collection(userRef, NAME_OF_SUB_COLLECTION)
  const monthDocRef = doc(monthsRef, monthName)

  const pathToFirebaseDocuments = doc(
    db,
    pathToFirebaseDoc(userId),
    documentName + ':' + year,
    NAME_OF_SUB_COLLECTION,
    monthName
  )

  return { userRef, monthsRef, firebaseDocumentName, monthDocRef, pathToFirebaseDocuments }
}
