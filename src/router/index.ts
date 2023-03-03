import {
  createRouter,
  createWebHistory,
  type RouteComponent,
} from "vue-router";
import { Namespace } from "@/layouts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/homepage",
      alias: "/",
      name: "Homepage",
      meta: {
        layout: Namespace.Default,
      },
      component: (): Promise<RouteComponent> =>
        import("@/views/design/List.vue"),
    },
    {
      path: "/design/edit",
      name: "EditDesign",
      meta: {
        layout: Namespace.Default,
      },
      component: (): Promise<RouteComponent> =>
        import("@/views/design/Edit.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: {
        name: "Homepage",
      },
    },
  ],
});

export default router;
