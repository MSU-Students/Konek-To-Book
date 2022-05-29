<template>
  <q-layout class="bg-image q-pa-md flex flex-center">
    <q-header class="bg-image bg-primary text-white">
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
      <!-- <q-toolbar>
        <q-toolbar-title class="row items-center no-wrap">
          <img src="../assets/Images/Logo_ISED.png" style="height: 40px" />
          <div class="title_name">
            <span class="q-ml-sm q-mr-lg">ISED Library</span>
          </div>
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
      </q-toolbar> -->
    </q-header>

    <div class="row">
      <div>
        <q-img
          src="../assets/Images/Logo_ISED.png"
          style="width: 210px"
        ></q-img>
      </div>

      <div>
        <q-card flat class="bg-transparent">
          <div class="text-h2 q-pa-lg text-bold flex flex-center text-white">
            WELCOME TO
            <div
              class="text-h2 q-pa-sm text-bold flex flex-center text-orange-6"
            >
              ISED LIBRARY
            </div>
            <q-separator color="red-9 " width="70%" inset />
          </div>

          <div class="text-h7 q-pa-xs q-gutter-lg flex flex-center text-white">
            MINDANAO STATE UNIVERSITY - MARAWI CITY
          </div>
        </q-card>

        <div class="q-pa-lg q-gutter-lg flex flex-center">
          <q-btn
            color="red-9"
            icon="search"

            label="Search"
            style="width: 16rem"
            @click="() => $router.replace('/GuestIndex')"
          />
          <q-btn

            color="white"
            icon="login"
            outline
            label="Sign in"
            style="width: 16rem"
            @click="() => $router.replace('/LoginForm')"
          />
        </div>
      </div>

      <!-- <div>
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
        <q-btn
          rounded
          color="white"
          icon="search"
          outline
          label="Get Start"
          style="width: 50rem"
          @click="() => $router.replace('/GuestIndex')"
        />
      </div> -->
    </div>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
Options({});
export default class MainSearch extends Vue {}
</script>
