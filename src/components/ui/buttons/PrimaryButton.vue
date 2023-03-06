<script lang="ts">
import { defineComponent } from "vue";

export type TButtonType = "button" | "submit";

export default defineComponent({
  props: {
    type: {
      type: String as () => TButtonType,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <button
    v-bind="{ type, disabled }"
    class="relative border rounded-md bg-active text-white py-1.5 px-3"
    style="border-color: rgba(0, 0, 0, 0.2)"
  >
    <slot />
  </button>
</template>
