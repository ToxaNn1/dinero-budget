<template>
  <v-icon v-if="!isAwesomeIcon && !isPromiseResolved" :size="size" v-bind="$attrs" :icon="icon" />
  <v-icon v-if="isAwesomeIcon" :size="size" v-bind="$attrs">
    <font-awesome-icon :icon="icon" />
  </v-icon>
  <v-icon v-else-if="isPromiseResolved" class="component-icon" :size="size" v-bind="$attrs">
    <component :is="promiseIcon.default" />
  </v-icon>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  icon: {
    type: String,
    default: '',
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  }
})

const isPromiseResolved = ref(false)
const promiseIcon = ref(null)
const { icon } = toRefs(props)

watch(
  () => icon.value,
  async () => {
    try {
      if (!icon.value.includes('/')) return
      promiseIcon.value = await import(icon.value)
      isPromiseResolved.value = true
    } catch (error) {
      console.error('Error loading icon:', error)
    }
  },
  { immediate: true }
)

const isAwesomeIcon = computed(() => !icon.value.includes('/') && icon.value.includes('fa-'))
</script>

<style lang="scss">
.component-icon {
  & > svg {
    fill: rebeccapurple !important;
  }
}
</style>
