import { auth, db } from '@/main'
import { pathToFirebaseDoc } from '@/helpers/pathToFirebaseDoc'
import { doc } from '@firebase/firestore'

export const getPathToFirebaseDocuments = (
  monthName: string,
  typeDocument = 'spendings',
  year = 2023
) => {
  return doc(
    db,
    pathToFirebaseDoc(auth.currentUser?.email),
    typeDocument + ':' + year,
    'months',
    monthName
  )
}
