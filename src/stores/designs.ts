import { ref, type Ref, computed } from "vue";
import { defineStore } from "pinia";
import { fetchDesigns, createDesign } from "@/api/designsApi";
import type { IListing } from "@/types/listing";
import type { IDesign, ICreateDesignPayload } from "@/types/designs";

export interface Readonly<IStore> {
  designs: IListing<IDesign>;
}

export const useDesignsStore = defineStore("designs", () => {
  const designs: Ref<any> = ref({
    data: [],
    meta: {
      currentPage: 1,
      lastPage: 1,
    },
  });

  async function fetch() {
    designs.value = await fetchDesigns();
  }

  async function push(payload: ICreateDesignPayload) {
    await createDesign(payload);
  }
  return { designs, fetch, push };
});
