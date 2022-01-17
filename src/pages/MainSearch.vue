<template>
 <q-layout class="bg-image q-pa-md flex flex-center">
      <q-header  class="bg-image bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            flat
            round
            size="20px"
            color="white"
            icon="auto_stories"
            @click="() => $router.replace('/')"
          >
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

    <div class="row">
      <div>
        <q-img
          src="../assets/Images/Logo_ISED.png"
          style="width: 220px"
        ></q-img>
      </div>

      <div>
        <q-card flat class="bg-transparent">
          <div class="text-h3 text-bold text-white on-right">WELCOME TO</div>
          <div class="font4 text-h2 text-bold text-orange-9 on-right">
            I S E D
          </div>
          <div class="text-h3 text-bold text-white on-right">
            LIBRARY MANAGEMENT SYSTEM
            <q-separator color="orange-9 " width="100%" />
          </div>
          <div class="text-h6 text-white on-right">
            Mindanao State University - Marawi City
          </div>
        </q-card>

        <br />
        <q-input
          rounded
          dense
          outlined
          bg-color="white"
          model="search"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-btn
              flat
              icon="search"
              @click="() => $router.replace('/GuestIndex')"
            />
          </template>
        </q-input>
      </div>
    </div>
   </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
Options({});
export default class MainSearch extends Vue {}
</script>
