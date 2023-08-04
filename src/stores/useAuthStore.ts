import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/main'
import { Auth, onAuthStateChanged, User as FirebaseUser } from '@firebase/auth'
import { LoginForm } from '@/types/auth.types'
import { useFirebaseCommand } from '@/stores/useFirebaseCommand'

export const useAuthStore = defineStore('useAuthStore', () => {
  const { getMonthData, createBaseFirebaseDocuments } = useFirebaseCommand()

  const logOut = async (auth: Auth = auth): Promise<void> => {
    await signOut(auth)
  }

  const fetchUserFromFirebase = async () => {
    await onAuthStateChanged(auth as Auth, async (user: FirebaseUser | null) => {
      try {
        if (!user) {
          console.log('logout')
          await logOut(auth)
          return
        }
      } catch (e) {
        console.log(e)
      }
    })
  }

  const registerUser = async ({ email, password }: LoginForm): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await createBaseFirebaseDocuments({}, email)
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {
      console.log('login')
      await signInWithEmailAndPassword(auth, email, password)
      await getMonthData()
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return {
    registerUser,
    loginUser,
    logOut,
    fetchUserFromFirebase
  }
})
