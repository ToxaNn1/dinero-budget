<template>
  <Transition>
    <div
      v-show="openModal"
      class="modal fixed flex items-center top-0 left-0 justify-center w-full h-full bg-black z-[999]"
      @click.self="$emit('close')"
    >
      <div
        class="modal-content p-[20px] overflow-y-auto max-h-[80vh] rounded-[8px] bg-white w-1/2"
        @click.stop
      >
        <div class="flex items-center justify-between">
          <h1>{{ title }}</h1>
          <n-icon
            class="cursor-pointer"
            :size="25"
            :component="CloseCircle"
            @click="$emit('close')"
          />
        </div>
        <div class="w-full h-[1px] bg-black my-[10px]" />
        <div class="flex flex-col items-center">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits, watch } from "vue";
import { CloseCircle } from "@vicons/ionicons5";
import { useRoute } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  isShowModal: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["close"]);
const route = useRoute();

const openModal = computed(() => {
  return route.meta?.isShowModal && props.isShowModal;
});
</script>

<style lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.5);

  &-content {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      @apply bg-green rounded-md;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
