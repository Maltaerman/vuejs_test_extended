<script lang="ts">
import { defineComponent } from "vue";
import EditForm, { type IFormData } from "@/components/design/EditForm.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useDesignsStore } from "@/stores/designs";
import type { IDesign } from "@/types/designs";
import router from "@/router";

export default defineComponent({
  components: {
    EditForm,
  },
  data() {
    return {
      isLoading: false,
      route: useRoute(),
      router: useRouter(),
      store: useDesignsStore(),
      setLoader: this.setLoader,
      addAlert: this.addAlert,
    };
  },
  inject: ["setLoader", "addAlert"],
  methods: {
    async createDesign(formData: IFormData) {
      try {
        this.isLoading = true;
        this.setLoader(true);
        await this.store.pushDesign(formData);
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
  },
});
</script>

<template>
  <EditForm
    @submit="createDesign"
    v-bind="{ disabled: isLoading }"
    @delete="
      addAlert({
        message: 'Спочатку створіть дизайн.',
        delay: 3,
      })
    "
  />
</template>
