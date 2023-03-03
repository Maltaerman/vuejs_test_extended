<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import ListItem from "@/components/design/ListItem.vue";
import { useDesignsStore } from "@/stores/designs";
import type { IDesign } from "@/types/designs";

export default defineComponent({
  components: {
    ListItem,
    PrimaryButton,
  },
  data: () => ({
    router: useRouter(),
    store: useDesignsStore(),
  }),
  computed: {
    designs() {
      return this.store.designs.data;
    },
  },
  inject: ["setLoader"],
  async created() {
    try {
      this.setLoader(true);
      await this.store.fetch();
    } finally {
      this.setLoader(false);
    }
  },
});
</script>

<template>
  <div class="px-6 py-8" style="background-color: #2c3d39">
    <div class="flex flex-wrap justify-between items-center mb-10 w-full">
      <h1 class="text-white" v-text="'Всі дизайни'" />
      <PrimaryButton
        @click="
          router.push({
            name: 'EditDesign',
          })
        "
      >
        Додати дизайн
      </PrimaryButton>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="{ id, ...props } in designs"
        :key="id"
        class="flex items-center justify-center p-2 py-5"
      >
        <ListItem v-bind="props" />
      </div>
    </div>
  </div>
</template>
