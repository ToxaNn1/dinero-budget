<template>
  <v-text-field
    :model-value="modelValue"
    clearable
    :label="label"
    color="primary"
    :rules="rules"
    :class="[{ 'dinero-input-small': density === 'small' }]"
    variant="outlined"
    :prefix="prefix"
    hide-details
    :density="density"
    :loading="loading"
    @click:clear="$emit('update:modelValue', '')"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <slot />
  </v-text-field>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  density: {
    type: String,
    default: 'compact'
  },
  loading: {
    type: Boolean,
    default: false
  },
  prefix: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: '',
    required: true
  },
  rules: {
    type: Array,
    default: () => []
  }
})
defineEmits(['update:modelValue', 'change', 'blur'])
</script>

<style lang="scss">
.v-input--density-small {
  --v-input-control-height: 33px;
  --v-input-padding-top: 1px;
}

.dinero-input-small {
  @apply v-input--density-small;
}
</style>
