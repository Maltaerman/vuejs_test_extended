<script lang="ts">
import { defineComponent, provide, type Ref } from "vue";
import Alert from "@/components/ui/Alert.vue";

export interface IAlert {
  id: string;
  message: string;
  delay?: number;
}

export interface IAddAlertPayload extends IAlert {}

export interface IData {
  alerts: IAlert[];
  refs: Ref[];
  margin: number;
}

export default defineComponent({
  components: {
    Alert,
  },
  data: (): IData => ({
    alerts: [
      {
        id: "initial-message-id",
        message: `
          Доброго дня. Було дуже приємно отримати швидкий відгук від Софії та Антона на помилку у дизайні що я вказа.
          Для мене гарний колектив є першочерговим пріорітетом, тому я вирішив зробити трохи більше щоб показати свою зацікавленість у довгій співпраці.
        `,
        delay: 16,
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
    <Alert
      v-for="({ id, message, delay }, key) in alerts"
      :key="id"
      :ref="(el) => setItemRef(el, key)"
      class="absolute z-40 transition-all duration-300 w-11/12 left-1/2 transform -translate-x-1/2"
      :style="`top: ${positions[key]}px; background-color: rgb(98, 123, 122)`"
      v-bind="{
        message,
        delay,
      }"
      @delete="deleteAlert(id)"
    />
  </transition-group>
  <div></div>
  <slot />
</template>
