<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { cloneDeep } from 'lodash';
import Toggle from "@/components/ui/Toggle.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton.vue";
import Input from "@/components/ui/inputs/Input.vue";
import ImagePicker from "@/components/ui/ImagePicker.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import ImageIcon from "@/components/icons/ImageIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import { mapState } from "pinia";
import { useDesignsStore } from "@/stores/designs";
import Validation from "@/mixins/validations/design/EditFormValidation.vue";
import type { IDesign } from "@/types/designs";

export interface IFormData {
  published: boolean;
  code: string;
  name: string;
  link: string;
  images: File[];
}

export interface IErrors {
  name: string[];
  code: string[];
  images: string[];
}
export interface IData {
  formData: IFormData;
}

export default defineComponent({
  components: {
    Toggle,
    PrimaryButton,
    SecondaryButton,
    Input,
    ImagePicker,
    ArrowLeftIcon,
    ImageIcon,
    PlusIcon,
    DeleteIcon,
  },
  mixins: [Validation],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object as () => IDesign,
    },
  },
  data: (): IData => ({
    formData: {
      published: false,
      code: "",
      name: "",
      link: "",
      images: [],
    },
  }),
  computed: {
    isValid() {
      const { name, code, images } = this.formData;
      return name && code && images[0];
    },
  },
  emits: ["submit"],
  methods: {
    getSrc(file: File | string) {
      if (typeof file === "string") return file;
      return URL.createObjectURL(file);
    },
    submit() {
      this.resetErrors();
      if (this.isValid) {
        this.$emit("submit", this.formData);
      } else {
        this.setErrors();
      }
    },
  },
  watch: {
    value(value) {
      if (this.value) {
        this.formData = cloneDeep(this.value);
      }
      deep: true;
    },
  },
});
</script>

<template>
  <form @submit.prevent="submit">
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6"
    >
      <div class="flex flex-wrap">
        <router-link :to="{ name: 'Homepage' }">
          <ArrowLeftIcon width="24" height="24" class="mr-2 sm:mr-16" />
        </router-link>
        <Toggle
          v-model="formData.published"
          class="w-20"
          v-bind="{
            label: formData.published ? 'Опублікований' : 'Неопублікований',
          }"
        />
      </div>
      <div class="flex flex-row">
        <SecondaryButton
          type="button"
          v-bind="{ disabled }"
          class="mr-2"
          @click="$emit('delete')"
        >
          Видалити
        </SecondaryButton>
        <PrimaryButton type="submit" v-bind="{ disabled }">
          Зберегти і вийти
        </PrimaryButton>
      </div>
    </div>

    <div class="grid grid-cols-6 gap-1" style="max-width: 600px">
      <div
        class="col-start-1 col-end-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6 gap-2"
      >
        <div
          v-for="(image, key) in formData.images"
          :key="image.name"
          class="relative group"
        >
          <img
            :src="getSrc(formData.images[key])"
            alt=""
            class="rounded-sm cursor-pointer"
          />
          <button
            type="button"
            class="hidden group-hover:block absolute right-2 bottom-2 p-2 rounded"
            style="background-color: rgba(0, 0, 0, 0.5)"
            @click="formData.images.splice(key, 1)"
          >
            <DeleteIcon fill="white" />
          </button>
        </div>

        <ImagePicker
          @update:modelValue="(image) => formData.images.push(image)"
          v-bind="{ showErrors: false }"
          style="min-height: 120px; height: 100%"
        >
          <PlusIcon
            v-if="!formData.images.length"
            class="h-full"
            @update:modelValue="(image) => formData.images.push(image)"
          />
          <ImageIcon v-else width="60px" heigth="48px" class="h-full" />
        </ImagePicker>
      </div>

      <Input
        v-model.number="formData.code"
        v-bind="{
          placeholder: '###',
          maxlength: 3,
          errors: errors.code,
        }"
        class="col-start-1 col-end-7 sm:col-end-2"
      />

      <Input
        v-model="formData.name"
        v-bind="{
          placeholder: 'Назва дизайну',
          errors: errors.name,
        }"
        class="col-start-1 col-end-7 sm:col-start-2"
      />

      <Input
        v-model="formData.link"
        v-bind="{
          placeholder: 'https://design###.horoshop.ua/',
          errors: errors.link,
        }"
        class="col-start-1 col-end-7"
      />

      <div v-if="formData.images.length" class="col-start-1 col-end-7">
        <div
          v-for="image in formData.images"
          :key="image.name"
          class="w-full bg-gray-50 mb-2 p-2 flex flex-row justify-between items-center"
        >
          <div class="flex flex-row items-center">
            <ImageIcon class="mr-2 text-gray-600" width="16" height="16" />
            <p class="text-blue-400" v-text="image.name" />
          </div>

          <button type="button" @click="formData.images.splice(key, 1)">
            <DeleteIcon fill="red" />
          </button>
        </div>
      </div>

      <ImagePicker
        class="col-start-1 col-end-7"
        v-bind="{
          errors: errors.images,
        }"
        @update:modelValue="(image) => formData.images.push(image)"
      />
    </div>
  </form>
</template>
