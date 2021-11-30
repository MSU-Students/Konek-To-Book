import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/',
      component: () => import('src/pages/MainSearch.vue')},

      { path: '/LoginForm',
      component: () => import('src/pages/LoginForm.vue') },

    ]
  },


   //!---->For GuestUser
  {
    path: '/Guest',
    component: () => import('src/layouts/GuestLayout.vue'),
    children: [
      { path: '/GuestIndex',
      component: () => import('src/pages/Guest/GuestIndex.vue') },
      { path: '/GuestCategories',
      component: () => import('src/pages/Guest/GuestCategories.vue') },
    ],
  },


   //!---->For Librarian
  {
    path: '/Librarian',
    component: () => import('layouts/LibrarianLayout.vue'),
    children: [
      { path: '/LibrarianIndex',
      component: () => import('src/pages/Librarian/LibrarianIndex.vue') },

      { path: '/ManageCategories',
      component: () => import('src/pages/Librarian/ManageCategories.vue') },

      { path: '/ManageBorrowers',
      component: () => import('src/pages/Librarian/ManageBorrowers.vue') },

      { path: '/ManageIssuedBooks',
      component: () => import('src/pages/Librarian/ManageIssuedBooks.vue') },

      { path: '/ManageFines',
      component: () => import('src/pages/Librarian/ManageFines.vue') },

      { path: '/ChangePass',
      component: () => import('src/pages/Librarian/LibrarianChangePass.vue') },

    ],
  },


     //!---->For ADMIN
  {
    path: '/Admin',
    component: () => import('src/layouts/AdminLayout.vue'),
    children: [
      { path: '/AdminIndex',
      component: () => import('src/pages/Admin/AdminIndex.vue') },
      { path: '/ManageAccount',
      component: () => import('src/pages/Admin/ManageAccount.vue') },
      { path: '/AdminChangePass',
      component: () => import('src/pages/Admin/AdminChangePass.vue') },
    ],
  },




  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
