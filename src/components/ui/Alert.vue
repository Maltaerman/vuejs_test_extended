<script lang="ts">
import { defineComponent, provide, type ComponentPropsOptions } from "vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

export interface IProps {
  readonly message: string;
  readonly delay?: number;
}

export interface IData {
  t: number;
  interval: number;
}

export default defineComponent({
  components: {
    DeleteIcon,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  data(): IData {
    return {
      t: this.delay,
      interval: setInterval((): number => (this.t -= 1), 1000),
    };
  },
  watch: {
    t(value) {
      value <= 0 && clearInterval(this.interval);
      value === 0 && this.$emit("delete");
    },
  },
  computed: {
    position() {
      return `${100 - Math.floor((100 * this.t) / this.delay)}%`;
    },
  },
});
</script>

<template>
  <div class="p-2 border rounded flex flex-col">
    <div
      class="absolute top-0 left-0 h-1 bg-active rounded"
      :style="`width: ${position}; transition: all 1s;`"
    />

    <div class="flex flex-row items-start justify-between">
      <p class="text-white" v-text="message" />
      <button type="button" class="text-white p-1" @click="$emit('delete')">
        <DeleteIcon fill="red" />
      </button>
    </div>
  </div>
</template>
