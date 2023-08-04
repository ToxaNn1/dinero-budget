import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { GlobalFormModel } from '@/types/global'
import { collection, doc, DocumentData, getDoc, setDoc } from '@firebase/firestore'
import { db } from '@/main'
import { pathToFirebaseDoc } from '@/helpers/pathToFirebaseDoc'
import { getAuth } from 'firebase/auth'

export const useConfigStore = defineStore('useConfigStore', () => {
  const globalLoading = ref(false)
  const globalError = ref('')
  const auth = getAuth()

  // globalDateFormat - change date format for tables and charts
  // globalMonth - change month for all calendars, card names, after change this value - update all cards(charts, tables)

  const globalFormModel = reactive<GlobalFormModel>({
    globalMonth: '',
    globalDateFormat: ''
  })

  const setGlobalConfigToLocalStorage = () => {
    localStorage.setItem('globalMonth', globalFormModel.globalMonth)
    localStorage.setItem('globalDateFormat', globalFormModel.globalDateFormat)
  }

  const onSaveGlobalConfiguration = async () => {
    globalLoading.value = true
    setGlobalConfigToLocalStorage()

    const collectionRef = collection(db, pathToFirebaseDoc(auth.currentUser?.email))
    await setDoc(doc(collectionRef, 'globalConfig'), globalFormModel as DocumentData)

    globalLoading.value = false
  }

  const getGlobalConfiguration = async () => {
    globalLoading.value = true
    if (!!localStorage.getItem('globalMonth') && !!localStorage.getItem('globalDateFormat')) {
      globalFormModel.globalMonth = localStorage.getItem('globalMonth')
      globalFormModel.globalDateFormat = localStorage.getItem('globalDateFormat')
    } else {
      const collectionRef = doc(db, pathToFirebaseDoc(auth.currentUser?.email), 'globalConfig')
      const querySnapshot = await getDoc(collectionRef)

      if (querySnapshot.exists()) {
        const { globalMonth: month, globalDateFormat: dateFormat } =
          querySnapshot.data() as GlobalFormModel

        globalFormModel.globalMonth = month
        globalFormModel.globalDateFormat = dateFormat
      }
    }

    setGlobalConfigToLocalStorage()

    globalLoading.value = false
  }

  const changeGlobalFormModel = (key: string, value: any) => {
    globalFormModel[key] = value
    localStorage.setItem(key, value)
  }

  return {
    changeGlobalFormModel,
    globalFormModel,
    getGlobalConfiguration,
    onSaveGlobalConfiguration,
    globalLoading,
    globalError
  }
})
