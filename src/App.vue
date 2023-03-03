<script lang="ts">
import { defineComponent } from "vue";
import GlobalAlerts from "@/components/GlobalAlerts.vue";
import Loader from "@/components/Loader.vue";
import RouteLayout from "@/layouts/RouteLayout.vue";

export default defineComponent({
  components: {
    GlobalAlerts,
    Loader,
    RouteLayout,
  },
});
</script>

<template>
  <GlobalAlerts>
    <Loader>
      <RouteLayout />
    </Loader>
  </GlobalAlerts>
</template>
