<script lang="ts">
import { defineComponent, shallowRef, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "",
    },
    code: {
      type: String,
      default: "",
    },
    images: {
      type: Array as () => (File | string)[],
      default: () => [],
    },
  },
  methods: {
    getSrc(file: File | string) {
      if (typeof file === "string") return file;
      return URL.createObjectURL(file);
    },
  },
});
</script>

<template>
  <div class="flex flex-col">
    <img
      style="max-height: 300px; aspect-ratio: 1 / 1.5"
      :src="getSrc(images[0])"
    />
    <div class="flex flex-wrap mt-4">
      <p class="bg-white mr-2 rounded-lg px-2" v-text="code" />
      <p class="text-white" v-text="name" />
    </div>
  </div>
</template>
