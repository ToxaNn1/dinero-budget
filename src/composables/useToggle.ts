import { ref, Ref, UnwrapRef } from 'vue'

type ToggleReturnType = [Ref<UnwrapRef<boolean>>, (flag?: boolean) => void]

export const useToggle = (initialValue = false): ToggleReturnType => {
  const modalActive = ref<boolean>(initialValue)

  const toggleValue = (flag?: boolean) => {
    modalActive.value = flag === undefined ? !modalActive.value : flag
  }

  return [modalActive, toggleValue]
}
