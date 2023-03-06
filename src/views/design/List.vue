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
  inject: ["setLoader"],
  data() {
    return {
      router: useRouter(),
      store: useDesignsStore(),
      setLoader: this.setLoader,
    };
  },
  computed: {
    designs() {
      return this.store.designs.data;
    },
  },
  async created() {
    try {
      this.setLoader(true);
      await this.store.fetchDesigns();
    } finally {
      this.setLoader(false);
    }
  },
});
</script>

<template>
  <div style="background-color: #2c3d39">
    <div class="flex flex-wrap justify-between items-center w-full mb-5">
      <h1
        class="text-white"
        style="
          font-weight: 400
          font-size: 24px;
          line-height: 40px
        "
        v-text="'Всі дизайни'"
      />
      <PrimaryButton
        @click="
          router.push({
            name: 'CreateDesign',
          })
        "
      >
        Додати дизайн
      </PrimaryButton>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
    >
      <div
        v-for="{ id, ...props } in designs"
        :key="id"
        class="flex items-center justify-center mb-6 cursor-pointer"
        @click="
          router.push({
            name: 'EditDesign',
            params: { id },
          })
        "
      >
        <ListItem v-bind="props" />
      </div>
    </div>
  </div>
</template>
