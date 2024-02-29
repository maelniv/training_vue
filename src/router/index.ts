/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import pinia from "@/store/index";
import { useUserStore } from "@/store/UserStore";
import { storeToRefs } from "pinia";

const userSotre = useUserStore(pinia);
const { isUserConnected } = storeToRefs(userSotre);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
});

router.beforeEach((to, from) => {
  console.log(to.name);
  console.log(isUserConnected.value);
  if (!isUserConnected.value && to.name !== "/login") {
    return { name: "/login" };
  }
});

export default router;
