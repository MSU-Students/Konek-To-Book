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
          </q-btn>
          KonektoBook
          </q-toolbar-title>
        <div class="q-pa-sm q-gutter-sm on-right">
          <q-btn
            flat
            round
            size="15px"
            color="white"
            icon="account_circle"
            @click="() => $router.replace('/LoginForm')"
          >
            <q-tooltip class="bg-orange-9 text-h7">SIGN IN</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
