import type { IDesign, ICreateDesignPayload } from "@/types/designs";
import type { IListing } from "@/types/listing";
import Ostrov from "@/assets/img/Ostrov.png";
import Flora from "@/assets/img/Flora.png";
import SunWear from "@/assets/img/SunWear.png";

/** Fake designs list */
const data: IListing<IDesign> = {
  data: [
    {
      id: "design-0-id",
      code: 105,
      name: "Ostrov",
      link: "https://design105.ostrov.ua/",
      images: [Ostrov],
    },
    {
      id: "design-1-id",
      code: 104,
      name: "Flora",
      link: "https://design104.flora.ua/",
      images: [Flora],
    },
    {
      id: "design-2-id",
      code: 103,
      name: "SunWear",
      link: "https://design103.sunwear.ua/",
      images: [SunWear],
    },
    {
      id: "design-3-id",
      code: 105,
      name: "Flora",
      link: "https://design105.flora.ua/",
      images: [Flora],
    },
    {
      id: "design-4-id",
      code: 105,
      name: "Ostrov",
      link: "https://design105.ostrov.ua/",
      images: [Flora],
    },
    {
      id: "design-5-id",
      code: 105,
      name: "Ostrov",
      link: "https://design105.ostrov.ua/",
      images: [SunWear],
    },
    {
      id: "design-6-id",
      code: 105,
      name: "Ostrov",
      link: "https://design105.ostrov.ua/",
      images: [Ostrov],
    },
    {
      id: "design-6-id",
      code: 105,
      name: "Ostrov",
      link: "https://design105.ostrov.ua/",
      images: [SunWear],
    },
  ],
  meta: {
    currentPage: 1,
    lastPage: 1,
  },
};

/** Base CRUD imitation  */

export async function fetchDesigns(): Promise<IListing<IDesign>> {
  return new Promise((resolve) =>
    setTimeout((): IListing<IDesign> => resolve(data), 1000)
  );
}

export function createDesign(payload: ICreateDesignPayload): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      data.data.push({
        id: `design-id-${new Date().valueOf()}`,
        ...payload,
      });
      resolve();
    }, 1000)
  );
}
