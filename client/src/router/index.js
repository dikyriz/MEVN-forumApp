import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import { useAuthStore } from "@/stores/authStores";
import DetailQuestion from "@/views/DetailQuestion.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/question/:id",
      name: "DetailQuestion",
      component: DetailQuestion,
    },

    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
      meta: {
        requiredAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = await useAuthStore();
  if (to.meta.requiredAuth && !authStore.currentUser) {
    alert("login terlebih dahulu");
    return {
      path: "/",
    };
  }
});

export default router;
