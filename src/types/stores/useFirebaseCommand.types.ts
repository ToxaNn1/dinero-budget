import { Ref } from 'vue'

export interface FirebaseCommand {
  createBaseFirebaseDocuments: (
    spendingFormData,
    nameOfCollection,
    nameOfSubcollection?: string | undefined,
    nameOfSubDocument?: string | undefined
  ) => Promise<Awaited<void>[]>
  isCreatingFirebaseDoc: Ref<boolean>
  isFirebaseDocError: Ref<boolean>
  getMonthData: (userId?: string, documentName?: string) => Promise<any>
  createFirebaseDoc: (
    ...args: Parameters<
      (
        spendingFormData: object,
        nameOfCollection: string,
        nameOfDocument: string,
        nameOfSubcollection: string,
        nameOfSubDocument: string
      ) => Promise<void>
    >
  ) => Promise<
    ReturnType<
      (
        spendingFormData: object,
        nameOfCollection: string,
        nameOfDocument: string,
        nameOfSubcollection: string,
        nameOfSubDocument: string
      ) => Promise<void>
    >
  >
  addNewMonthData: (
    userId: string,
    data,
    monthName?: string,
    documentName?: string
  ) => Promise<void>
}
