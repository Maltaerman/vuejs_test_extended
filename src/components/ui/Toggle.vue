<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    model: {
      get: (value) => value.modelValue,
      set: function () {
        this.$emit("update:modelValue", this.modelValue);
      },
    },
  },
});
</script>

<template>
  <div>
    <label class="relative inline-flex items-center cursor-pointer">
      <input v-model="model" type="checkbox" class="sr-only peer" />
      <div
        class="w-16 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-10 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"
      />
      <span
        v-if="label"
        class="ml-3 text-sm font-medium"
        :class="model ? 'text-success' : 'text-black'"
        v-text="label"
      />
    </label>
  </div>
</template>
