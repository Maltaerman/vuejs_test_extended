<script lang="ts">
import { defineComponent, provide } from "vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

export interface IAddAlertPayload {
  readonly message: string;
  readonly id?: string;
}

export default defineComponent({
  components: {
    DeleteIcon,
  },
  data: () => ({
    alerts: [
      {
        id: "initial-alert-id",
        message: "Hi. I hope you enjoy this work.",
      },
    ],
    refs: [],
    margin: 10,
  }),
  computed: {
    positions() {
      /** Height of each alert*/
      const heights: number[] = this.refs.map(
        (item: any): number => item?.alert?.getBoundingClientRect()?.height || 0
      );
      return heights.map((_: number, key: number): number => {
        let position = this.margin;
        heights
          .filter((_: number, subKey: number): boolean => key > subKey)
          .forEach(
            (height: number): number => (position += height + this.margin)
          );
        return Math.floor(position);
      });
    },
  },
  methods: {
    setItemRef(el: any, key: number) {
      this.refs[key] = el;
    },
    deleteAlert(index: number) {
      this.alerts.splice(index, 1);
      this.refs.splice(index, 1);
    },
    addAlert(payload: IAddAlertPayload): void {
      this.alerts.push({
        ...payload,
        id: payload.id || `${this.alerts.length}-${Date.now()}`,
      });
    },
  },
  provide() {
    return {
      addAlert: this.addAlert,
    };
  },
});
</script>

<template>
  <transition-group
    leave-active-class="transform-gpu"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
    enter-active-class="transform-gpu"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    tag="div"
  >
    <div
      v-for="({ id, message }, key) in alerts"
      :key="id"
      :ref="(el) => setItemRef(el, key)"
      class="absolute z-40 transition-all duration-300 w-11/12 p-2 border bordr-gra-600 left-1/2 transform -translate-x-1/2 rounded flex flex-row justify-between"
      :class="`left-${margin} right-${margin}`"
      :style="`top: ${positions[key]}px; background-color: rgb(98, 123, 122)`"
    >
      <p class="text-white" v-text="message" />
      <button type="button" class="text-white" @click="deleteAlert(key)">
        <DeleteIcon fill="red" />
      </button>
    </div>
  </transition-group>
  <slot />
</template>
