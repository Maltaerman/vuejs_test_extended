<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./Sidebar.vue";

export default defineComponent({
  components: {
    Sidebar,
  },
});
</script>

<template>
  <div class="min-h-screen h-max flex flex-row">
    <Sidebar style="background-color: #627b7a; min-width: 40px" />

    <main class="flex-grow mx-auto w-full flex flex-col min-h-screen h-max">
      <router-view class="min-h-screen h-max" />
    </main>
  </div>
</template>
