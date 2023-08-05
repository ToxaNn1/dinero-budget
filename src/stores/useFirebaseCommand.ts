import { defineStore, storeToRefs } from 'pinia'
import { useFetch } from '@/composables/useFetch'
import dayjs from 'dayjs'
import { pathToFirebaseDoc } from '@/helpers/pathToFirebaseDoc'
import { computed, toRaw } from 'vue'
import { db } from '@/main'
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  arrayRemove,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import { convertTimestamp } from '@/utils/convertTimestamp'
import { getPathToFirebaseDocuments } from '@/utils/getPathToFirebaseDocuments'
import { getFirebaseDocumentName } from '@/utils/getFirebaseDocumentName'
import { FirebaseDocumentType } from '@/types/global'
import { FINANCIAL_COLLECTION_TYPE, NAME_OF_SUB_COLLECTION } from '@/constants/config'
import { useFirebaseHelperCommand } from '@/composables/useFirebaseHelperCommand'
import { notify } from '@/plugins/toast-notification'
import { uuid } from 'vue-uuid'
import { useConfigStore } from '@/stores/useConfigStore'

export const useFirebaseCommand = defineStore('useFirebaseCommand', () => {
  const auth = getAuth()

  const configStore = useConfigStore()
  const { globalLoading, globalError } = storeToRefs(configStore)
  const icnomeYearDocuments = computed(() => 'income:' + dayjs().format('YYYY'))
  const spendingsYearDocuments = computed(() => 'spendings:' + dayjs().format('YYYY'))
  const budgetYearDocuments = computed(() => 'budget:' + dayjs().format('YYYY'))

  //*************** createFirebaseDoc *****************//
  /**
   * @param formData
   * @param nameOfCollection - auth.currentUser?.email
   * @param nameOfDocument - spendings, income, budget
   * @param nameOfSubcollection - months
   * @param nameOfSubDocument - monthName
   * @returns Promise<void>
   *     Create collection with this structure:
   *     user:email => income:year => months => month => day of month => {FormData}
   */
  const {
    loading: isCreatingFirebaseDoc,
    error: isFirebaseDocError,
    callFetch: createFirebaseDoc
  } = useFetch<
    void,
    (
      formData: object,
      nameOfCollection: string,
      nameOfDocument: string,
      nameOfSubcollection: string,
      nameOfSubDocument: string
    ) => Promise<void>
  >(
    async (
      formData,
      nameOfCollection,
      nameOfDocument,
      nameOfSubcollection = NAME_OF_SUB_COLLECTION,
      nameOfSubDocument = dayjs().format('MMMM')
    ) => {
      const collectionRef = collection(db, pathToFirebaseDoc(nameOfCollection))
      const documentRef = doc(collectionRef, nameOfDocument)
      const subcollectionRef = collection(documentRef, nameOfSubcollection)
      await setDoc(doc(subcollectionRef, nameOfSubDocument), formData as DocumentData)
    }
  )

  const createNewFirebaseDocument = async (
    formData,
    nameOfSubDocument = dayjs().format('MMMM'),
    documentType: FirebaseDocumentType = FINANCIAL_COLLECTION_TYPE.SPENDINGS,
    yearDocuments = 2023,
    nameOfSubcollection: any = NAME_OF_SUB_COLLECTION,
    nameOfCollection: string = auth?.currentUser.email
  ) => {
    try {
      globalLoading.value = true
      const firebaseData = {
        [convertTimestamp(formData[0].date)]: formData
      }
      await createFirebaseDoc(
        firebaseData,
        nameOfCollection,
        (documentType + ':' + yearDocuments) as any,
        nameOfSubcollection,
        nameOfSubDocument
      )
      globalLoading.value = false
    } catch (e) {
      console.log(e)
      globalLoading.value = false
      globalError.value = e
    } finally {
      globalLoading.value = false
    }
  }

  //Create collection for income, spendings and budget
  const createBaseFirebaseDocuments = async (
    formData,
    nameOfCollection,
    nameOfSubcollection: any = NAME_OF_SUB_COLLECTION,
    nameOfSubDocument = dayjs().format('MMMM')
  ) => {
    const income = await createFirebaseDoc(
      formData,
      nameOfCollection,
      icnomeYearDocuments.value as any,
      nameOfSubcollection,
      nameOfSubDocument
    )
    const spendings = await createFirebaseDoc(
      formData,
      nameOfCollection,
      spendingsYearDocuments.value as any,
      nameOfSubcollection,
      nameOfSubDocument
    )
    const budget = await createFirebaseDoc(
      formData,
      nameOfCollection,
      budgetYearDocuments.value as any,
      nameOfSubcollection,
      nameOfSubDocument
    )
    try {
      globalLoading.value = true
      return Promise.all([budget, income, spendings])
    } catch (e) {
      console.log(e)
      globalLoading.value = false
      globalError.value = e
    } finally {
      globalLoading.value = false
    }
  }

  const getAllMonths = async (
    userId: string = auth.currentUser?.email,
    documentName: FirebaseDocumentType = FINANCIAL_COLLECTION_TYPE.SPENDINGS
  ) => {
    const userRef = doc(db, pathToFirebaseDoc(userId), getFirebaseDocumentName(documentName))
    const monthsRef = collection(userRef, NAME_OF_SUB_COLLECTION)
    // const { monthsRef } = useFirebaseHelperCommand(userId,documentName)
    try {
      globalLoading.value = true
      const querySnapshot = await getDocs(monthsRef)
      const result = []
      querySnapshot.forEach((doc) => {
        result.push(doc.data())
      })
      globalLoading.value = false
      return result
    } catch (e) {
      console.log(e)
      globalLoading.value = false
      globalError.value = e
    } finally {
      globalLoading.value = false
    }
  }

  const getMonthData = async (
    monthName = 'July',
    userId: string = auth.currentUser?.email,
    documentName: FirebaseDocumentType = FINANCIAL_COLLECTION_TYPE.SPENDINGS
  ) => {
    const { monthDocRef } = useFirebaseHelperCommand(monthName, documentName, userId)
    try {
      globalLoading.value = true
      const querySnapshot = await getDoc(monthDocRef)
      globalLoading.value = false
      if (querySnapshot.exists()) {
        return querySnapshot.data()
      } else {
        console.log('No such document!' - monthName)
      }
    } catch (e) {
      console.log(e)
      globalLoading.value = false
      globalError.value = e
    } finally {
      globalLoading.value = false
    }
  }

  const createDocumentIfNotExists = async (modelForm): Promise<boolean> => {
    const year = dayjs(modelForm[0].date, 'DD MMMM YYYY').year()
    const month = dayjs(modelForm[0].date).format('MMMM')
    const documentRef = getPathToFirebaseDocuments(month, FINANCIAL_COLLECTION_TYPE.SPENDINGS, year)
    try {
      globalLoading.value = true
      const documentSnapshot = await getDoc(documentRef)
      globalLoading.value = false
      if (!documentSnapshot.exists()) {
        await createNewFirebaseDocument(modelForm, month, FINANCIAL_COLLECTION_TYPE.SPENDINGS, year)
        console.log('Document dont exist', month)
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
      globalLoading.value = false
      globalError.value = e
    } finally {
      globalLoading.value = false
    }
  }

  const addNewMonthData = async (
    data,
    userId: string = auth?.currentUser.email,
    documentName: FirebaseDocumentType = FINANCIAL_COLLECTION_TYPE.SPENDINGS
  ) => {
    const monthName = dayjs(data[0].date).format('MMMM')
    const { monthDocRef } = useFirebaseHelperCommand(monthName, documentName, userId)

    const dataWithId = data.map((item, index) => {
      return { ...item, id: uuid.v1() + index }
    })

    try {
      globalLoading.value = true
      if (!(await createDocumentIfNotExists(data))) {
        await updateDoc(monthDocRef, {
          [convertTimestamp(data[0].date)]: arrayUnion(...dataWithId)
        })
        notify('Data added', 'success')
      } else {
        console.log('Created new document - ' + monthName)
        notify('Created new document - ' + monthName, 'success')
        return
      }
      globalLoading.value = false
    } catch (e) {
      console.log(e)
      globalLoading.value = false
      globalError.value = e
    } finally {
      globalLoading.value = false
    }
  }

  const updateMonthData = async (
    data: FormData,
    oldData: FormData,
    userId: string = auth?.currentUser.email,
    documentName: FirebaseDocumentType = FINANCIAL_COLLECTION_TYPE.SPENDINGS
  ) => {
    const monthName = dayjs(data.date).format('MMMM')
    const { monthDocRef } = useFirebaseHelperCommand(monthName, documentName, userId)
    try {
      globalLoading.value = true
      await updateDoc(monthDocRef, {
        [convertTimestamp(data.date)]: arrayRemove(oldData)
      })
      await updateDoc(monthDocRef, {
        [convertTimestamp(data.date)]: arrayUnion(data)
      })
      notify('Data updated', 'success')
      globalLoading.value = false
    } catch (e) {
      console.log(e)
      globalLoading.value = false
      globalError.value = e
      notify('Data not updated', 'error')
    } finally {
      globalLoading.value = false
    }
    //TODO: predict if document is empty and delete it
    // if (!(await createDocumentIfNotExists(data))) {
    //   console.log('Data deleted')
    //   notify('Data deleted', 'success')
    // } else {
    //   console.log('Created new document - ' + monthName)
    //   notify('Created new document - ' + monthName, 'success')
    //   return
    // }
  }

  // щоб працювало видалення data має бути один в один з firebase обє єктом
  const deleteMonthData = async (
    data,
    userId: string = auth?.currentUser.email,
    documentName: FirebaseDocumentType = FINANCIAL_COLLECTION_TYPE.SPENDINGS
  ) => {
    const monthName = dayjs(data.date).format('MMMM')
    const { monthDocRef } = useFirebaseHelperCommand(monthName, documentName, userId)
    try {
      globalLoading.value = true
      await updateDoc(monthDocRef, {
        [convertTimestamp(data.date)]: arrayRemove(toRaw(data))
      })
      globalLoading.value = false
      notify('Data deleted', 'success')
    } catch (e) {
      console.log(e)
      globalLoading.value = false
      globalError.value = e
      notify('Data not deleted', 'error')
    } finally {
      globalLoading.value = false
    }
    //TODO: predict if document is empty and delete it
    // if (!(await createDocumentIfNotExists(data))) {
    //   console.log('Data deleted')
    //   notify('Data deleted', 'success')
    // } else {
    //   console.log('Created new document - ' + monthName)
    //   notify('Created new document - ' + monthName, 'success')
    //   return
    // }
  }

  return {
    isCreatingFirebaseDoc,
    addNewMonthData,
    isFirebaseDocError,
    updateMonthData,
    createBaseFirebaseDocuments,
    createFirebaseDoc,
    createNewFirebaseDocument,
    getMonthData,
    deleteMonthData,
    getAllMonths
  }
})
