<script lang="ts">
import { defineComponent } from "vue";
import EditForm, { type IFormData } from "@/components/design/EditForm.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import { useDesignsStore } from "@/stores/designs";

export default defineComponent({
  components: {
    EditForm,
  },
  data: () => ({
    store: useDesignsStore(),
  }),
  inject: ["setLoader", "addAlert"],
  methods: {
    async addDesign(formData: IFormData) {
      try {
        this.setLoader(true);
        await this.store.push(formData);
        await this.store.fetch();
        this.$router.push({
          name: "Homepage",
        });
        this.addAlert({
          message: "Новйи дизайн успішно створено.",
        });
      } finally {
        this.setLoader(false);
      }
    },
  },
});
</script>

<template>
  <div class="px-8 py-6">
    <EditForm
      @submit="addDesign"
      @delete="
        addAlert({
          message: 'Ця функція у розробці.',
        })
      "
    />
  </div>
</template>
