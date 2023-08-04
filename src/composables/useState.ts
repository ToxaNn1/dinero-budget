import { Ref, ref } from 'vue'

type StateReturnType<T> = [Ref<T>, (value: T) => void]

export const useState = <T = any>(initialState: T): StateReturnType<T> => {
  const state = ref<T>(initialState) as Ref<T>
  const setState = (value: T) => {
    state.value = value
  }

  return [state, setState]
}
