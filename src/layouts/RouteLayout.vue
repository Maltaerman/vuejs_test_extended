<script lang="ts">
import { defineComponent, shallowRef, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { Namespace, type TNamespace } from "./types";

export default defineComponent({
  data() {
    return {
      route: useRoute(),
      layout: shallowRef(null),
      setLayout: async (namespace: TNamespace): Promise<void> => {
        this.layout = await defineAsyncComponent(
          (): Promise<any> => import(`@/layouts/default/Layout.vue`)
        );
      },
    };
  },
  created() {
    this.setLayout(
      (this.route.meta?.layout as TNamespace) || Namespace.Default
    );
  },
});
</script>

<template>
  <component :is="layout" />
</template>
