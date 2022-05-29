<template>
  <q-layout view="lHh Lpr fff">
    <q-header elevated class="bg-image text-white">
      <q-toolbar class="GPL__toolbar" style="height: 60px">
        <q-toolbar-title class="row items-center no-wrap">
          <img src="../assets/Images/Logo_ISED.png" style="height: 40px" />
          <div class="title_name">
            <span class="q-ml-sm q-mr-lg">ISED Library</span>
          </div>
          <q-separator vertical class="bg-deep-red-1" />

          <div class="q-ml-md q-gutter-x-xs gt-sm">
            <q-btn
              flat
              class="push text-overline text-white no-wrap"
              label="Home"
              to="/GuestIndex"
            />
            <q-btn
              flat
              class="text-overline text-white no-wrap"
              label="Categories"
              to="/GuestCategories"
            />
          </div>
        </q-toolbar-title>

        <!------------------------LOGIN button----------------------------->
        <div class="q-gutter-sm row items-center no-wrap gt-sm">
          <q-btn
            :ripple="false"
            class="push text-overline text-white no-wrap"
            flat
            icon="login"
            label="Logout"
            @click="logout"
            to="/"
          />
        </div>
        <!----------------------------------------------------  ----->
        <div class="lt-md">
          <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
            class="q-mx-md"
          />
        </div>
      </q-toolbar>
      <q-separator />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      behavior="mobile"
      @click="leftDrawerOpen = false"
      show-if-above
      :width="200"
      :breakpoint="300"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 180px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-separator />
          <q-item clickable v-ripple to="/GuestIndex">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section> Home </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/GuestCategories">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>

            <q-item-section> Categories </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="absolute-bottom" to="/">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="q-pa-sm absolute-top" style="height: 180px">
        <div class="row justify-center">
          <q-avatar size="80px" class="q-mb-sm">
            <img src="../assets/Images/Logo_ISED.png" class="q-pb-sm" />
          </q-avatar>
        </div>

        <div class="text-bold text-caption" style="text-align: center">
          WELCOME TO ISED LIBRARY MANAGEMENT SYSTEM
        </div>
        <div class="row justify-center"></div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-footer bordered class="bg-primary text-center text-caption text-white">
      ISED LIBRARY MANAGEMENT SYSTEM IN MINDANAO STATE UNIVERSITY-MARAWI
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Chart from "components/Charts/prime.result.vue";
import { BookDto } from "src/services/rest-api";
import { mapActions, mapState } from "vuex";
@Options({})
export default class LayoutAdmin extends Vue {
  leftDrawerOpen = false;
  search = "";
  filter = "";
  drawer = false;

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }

  logout() {
    this.$q.loading.show({
      message: "Logging out...",
    });
    this.$q.notify({
      color: "accent",
      textColor: "primary",
      type: "positive",
      position: "center",
      message: "You are logged out.",
    });
  }
}
</script>
<style>
@font-face {
  font-family: BebasNeue;
  src: url(~assets/fonts/BebasNeue-Regular.ttf);
}

.title_name {
  font-family: "BebasNeue";
}
</style>
