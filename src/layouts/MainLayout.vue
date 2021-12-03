<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            flat
            round
            color="white"
            icon="auto_stories"
            @click="() => $router.replace('/')"
          >
            <q-tooltip>Home</q-tooltip>
          </q-btn>
          KonektoBook
        </q-toolbar-title>
        <div class="q-gutter-sm items-center no-wrap">
          <q-btn
            flat
            round
            size="20px"
            color="white"
            icon="account_circle"
            @click="() => $router.replace('/LoginForm')"
          >
            <q-tooltip>SIGN IN</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
