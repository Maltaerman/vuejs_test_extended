<script lang="ts">
import { defineComponent } from "vue";

export type TInputType = "text" | "email";

export default defineComponent({
  emits: ["update:modelValue"],
  props: {
    type: {
      type: String as () => TInputType,
      default: "text",
    },
    name: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array as () => string[],
      default: (): string[] => [],
    },
    modelValue: {
      type: String,
      default: "",
    },
    maxlength: {},
  },
  data: () => ({
    style: {
      error: {
        button: "bg-red-600 focus:ring-red-500 focus:ring-red-500",
        buttonHover: "hover:bg-red-700",
        loader: ":border-t-red-600 border-t-red-600",
      },
      default: {
        button: "bg-blue-600 focus:ring-blue-500 focus:ring-blue-500",
        buttonHover: "hover:bg-blue-700",
        loader: ":border-t-blue-600 border-t-blue-600",
      },
    },
  }),
  computed: {
    model: {
      get: (v) => v.modelValue,
      set: function (value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-200"
      v-text="label"
    />
    <div class="mt-1 relative rounded-md" :class="label ? 'mt-1' : 'mt-0'">
      <input
        v-model="model"
        v-bind="{
          ...$attrs,
          id: name,
          type,
          autocomplete: 'off',
          maxlength,
        }"
        class="block w-full rounded-md px-3 py-2 border border-gray-200"
      />
    </div>

    <div class="mt-1 relative" style="min-height: 20px">
      <transition
        enter-active-class="transition ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <p
          v-if="errors.length"
          class="text-sm text-red-500"
          v-text="errors[0]"
        />
      </transition>
    </div>
  </div>
</template>
