import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
  },

  {
    path: "/Guest",
    component: () => import("layouts/GuestUser.vue"),
    children: [
      {
        path: "/GuestIndex",
        component: () => import("src/pages/Guest/GuestIndex.vue"),
      },
      {
        path: "/GuestCategories",
        component: () => import("src/pages/Guest/GuestCategories.vue"),
      },
      {
        path: "/LoginForm",
        component: () => import("src/pages/Guest/LoginForm.vue"),
      },
    ],
  },

  {
    path: "/Librarian",
    component: () => import("layouts/LibrarianLayout.vue"),
    children: [
      {
        path: "/LibrarianIndex",
        component: () => import("src/pages/Librarian/LibrarianIndex.vue"),
      },

      {
        path: "/ManageBooks",
        component: () => import("src/pages/Librarian/ManageBooks.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
