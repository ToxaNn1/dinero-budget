<template>
  <v-btn-toggle
    :model-value="modelValue"
    color="primary"
    variant="outlined"
    :density="density"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <DineroButton v-for="(btn, index) in buttonsOptions" :key="index" variant="tonal" :value="btn">
      {{ btn }}
    </DineroButton>
  </v-btn-toggle>
</template>

<script lang="ts" setup>
import DineroButton from '@/components/ui/form/DineroButton.vue'

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  density: {
    type: String,
    default: 'default'
  },
  buttonsOptions: {
    type: Array,
    default: () => [],
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>
