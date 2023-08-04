<template>
  <v-btn
    v-bind="$attrs"
    :loading="loading"
    size="default"
    rounded="md"
    :variant="variant"
    :color="color"
    :class="{ '!tw-m-0': isDisableMargin }"
    :text="buttonContent"
    class="dinero-button"
  >
    <slot>
      {{ buttonContent }}
    </slot>
  </v-btn>
</template>

<script lang="ts" setup>
defineProps({
  buttonContent: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'flat'
  },
  loading: {
    type: Boolean,
    default: false
  },
  isDisableMargin: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  }
})
</script>

<style lang="scss">
.dinero-button {
  .v-btn__content {
    padding: 10px !important;
  }
}
</style>
