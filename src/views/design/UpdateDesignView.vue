<script lang="ts">
import { defineComponent } from "vue";
import EditForm, { type IFormData } from "@/components/design/EditForm.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import { useRoute, useRouter, type RouteComponent } from "vue-router";
import { useDesignsStore } from "@/stores/designs";
import type { IDesign } from "@/types/designs";
import router from "@/router";

export default defineComponent({
  components: {
    EditForm,
  },
  inject: ["setLoader", "addAlert"],
  data() {
    return {
      isLoading: false,
      route: useRoute(),
      router: useRouter(),
      store: useDesignsStore(),
      value: null,
      setLoader: this.setLoader,
      addAlert: this.addAlert,
    };
  },
  methods: {
    async updateDesign(formData: IFormData) {
      try {
        this.isLoading = true;
        this.setLoader(true);
        await this.store.updateDesign(formData);
        await this.store.fetchDesigns();
        this.router.push({
          name: "Homepage",
        });
        this.addAlert({
          message: "Новий дизайн успішно створено.",
          delay: 3,
        });
      } finally {
        this.isLoading = false;
        this.setLoader(false);
      }
    },
    async deleteDesign(id: string) {
      try {
        this.isLoading = true;
        this.setLoader(true);
        await this.store.deleteDesign(this.route.params.id);
        this.router.push({
          name: "Homepage",
        });
        this.addAlert({
          message: "Дизайн було видалено.",
          delay: 3,
        });
      } finally {
        this.isLoading = false;
        this.setLoader(false);
      }
    },
  },
  async created() {
    this.value = await this.store.getDesign(this.route.params.id);
  },
});
</script>

<template>
  <EditForm
    @submit="updateDesign"
    v-bind="{ disabled: isLoading, value }"
    @delete="deleteDesign"
  />
</template>
