import { ref, type Ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  fetchDesigns as fetch,
  pushDesign as push,
  deleteDesign as remove,
  getDesign as get,
  updateDesign as update,
} from "@/api/designsApi";
import type { IListing } from "@/types/listing";
import type {
  IDesign,
  ICreateDesignPayload,
  IUpdateDesignPayload,
} from "@/types/designs";

export interface IStore {
  designs: Ref<IListing<IDesign[]>>;
  fetchDesigns: () => Promise<void>;
  pushDesign: (payload: ICreateDesignPayload) => Promise<void>;
  deleteDesign: (payload: string) => Promise<void>;
  getDesign: (payload: string) => Promise<IDesign>;
  updateDesign: (payload: string) => Promise<IDesign>;
}

export const useDesignsStore = defineStore("designs", (): IStore => {
  const designs = ref({
    data: [],
    meta: {
      currentPage: 1,
      lastPage: 1,
    },
  });

  async function fetchDesigns() {
    designs.value = await fetch();
  }

  async function pushDesign(payload: ICreateDesignPayload) {
    await push(payload);
  }

  async function deleteDesign(id: string) {
    await remove(id);
  }

  async function getDesign(id: string) {
    return await get(id);
  }

  async function updateDesign(payload: IUpdateDesignPayload) {
    return await update(payload);
  }

  return {
    designs,
    fetchDesigns,
    pushDesign,
    deleteDesign,
    getDesign,
    updateDesign,
  };
});
