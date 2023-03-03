<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<template>
  <button
    class="relative border border-gray-300 rounded-md bg-white text-error py-1.5 px-3"
  >
    <slot />
  </button>
</template>
