import { computed, onMounted, onUnmounted, ref } from 'vue'

export const useBreakpoints = () => {
  const innerWidth = ref(window.innerWidth)

  const onWidthChange = () => (innerWidth.value = window.innerWidth)
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  return { windowWidth: computed(() => innerWidth.value) }
}
