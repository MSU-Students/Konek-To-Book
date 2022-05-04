<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-image text-white" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          dense
          flat
          round
          icon="menu"
          aria-label="Menu"
          class="q-mx-md"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="row items-center no-wrap">
          <img src="../assets/Images/Logo_ISED.png" style="height: 40px" />
          <span class="q-ml-sm">ISED Library</span>
        </q-toolbar-title>
        <!-------------------------------------- Account Profile ---------------------------- ------------------------>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-tooltip>Account</q-tooltip>
          <q-btn-dropdown round flat dropdown-icon="account_circle">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="70px">
                  <img src="../assets/Images/msu-main.png" />
                </q-avatar>
                <div class="q-mt-md q-mb-xs">201812488</div>
                <div class="text-weight-bold">Ayaon, Norhani</div>
                <q-list>
                  <q-item clickable v-ripple to="pages/Admin/AdminChangePass">
                    <q-item-section avatar>
                      <q-avatar
                        icon="manage_accounts"
                        color="black"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Change Password</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup to="pages/Guest/LoginForm">
                    <q-item-section avatar>
                      <q-avatar
                        icon="logout"
                        color="black"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Logout</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <!-------- ---------------------------------- drawer ------------------------------------------------>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      @click="leftDrawerOpen = false"
      :breakpoint="300"
      bordered
      class="bg-grey-2"
    >
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple to="pages/Admin/AdminIndex">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="pages/Admin/ManageAccount">
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>

            <q-item-section> Manage Accounts </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple to="pages/Guest/LoginForm">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
     <q-footer bordered class="bg-primary text-center text-caption text-white">
        Mindanao State University - Marawi City
      </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AdminLayout extends Vue {
  leftDrawerOpen = false;
  drawer = false;

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
</script>

