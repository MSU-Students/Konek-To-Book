<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated class="bg-image text-white" height-hint="64">
      <q-toolbar class="GPL__toolbar">
        <q-btn
          dense
          flat
          round
          icon="menu"
          aria-label="Menu"
          class="q-mx-md"
          @click="drawer = !drawer"
        />

        <q-toolbar-title class="row items-center no-wrap">
          <img src="../assets/Images/Logo_ISED.png" style="height: 40px" />
          <span class="q-ml-sm">ISED Library</span>
        </q-toolbar-title>
        <!-------------------------------------- Account Profile ---------------------------- ------------------------>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-tooltip>Account</q-tooltip>
          <q-btn-dropdown
            round
            flat
            dropdown-icon="account_circle"
            :label="
              currentProfile.U_First_Name +
              ' ' +
              currentProfile.U_Middle_Name +
              ' ' +
              currentProfile.U_Last_Name
            "
          >
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="110px">
                  <img
                    v-if="currentProfile.url"
                    class="avatar"
                    :src="`http://localhost:3000/media/${currentProfile.url}`"
                  />
                  <img
                    v-if="!currentProfile.url"
                    src="../assets/Images/Logo_ISED.png"
                  />
                </q-avatar>

                <div
                  class="text-weight-bold q-mt-md"
                  style="text-align: center"
                >
                  {{ currentProfile.U_First_Name }}
                  {{ currentProfile.U_Middle_Name }}
                  {{ currentProfile.U_Last_Name }}
                </div>
                <div class="text-caption" style="text-align: center">
                  {{ currentProfile.email }}
                </div>

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

                  <q-item clickable @click="logout()">
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
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="250"
      :breakpoint="500"
      bordered
      class="bg-white"
    >
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple to="pages/Admin/AdminIndex">
            <q-item-section avatar>
              <q-icon name="dashboard" color="teal-9" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="pages/Admin/ManageAccount">
            <q-item-section avatar>
              <q-icon name="manage_accounts" color="teal-9" />
            </q-item-section>

            <q-item-section> Manage Accounts </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable @click="logout()">
            <q-item-section avatar>
              <q-icon name="logout" color="red" />
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
      ISED LIBRARY MANAGEMENT SYSTEM IN MINDANAO STATE UNIVERSITY-MARAWI
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { UserDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";
import { lmsApiService } from "src/services/lms-api.service";

Options({
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("auth", ["getProfile"]),
  },
});

export default class AdminLayout extends Vue {
  drawer = false;
  miniState = true;

  getProfile!: () => Promise<AUser>;
  currentUser!: AUser;
  currentProfile: UserDto = {
    U_First_Name: "",
    username: "",
    password: "",
    U_Last_Name: "",
    Gender: "",
    U_Birth_Date: "",
    Address: "",
    User_Type: "",
    User_Status: "",
    U_Middle_Name: "",
    U_Contact_Number: "",
    url: "",
  };

  async mounted() {
    const res = await lmsApiService.getProfile();
    this.currentProfile = res.data;
  }

  async logout() {
    try {
      const result = await lmsApiService.logoutUser();
      if (result.status == 201) {
        await this.$router.replace("/LoginForm");
      }
      this.$q.notify({
        type: "warning",
        message: "You have been logged out!",
      });
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: "Something went wrong",
      });
    }
  }
}
</script>

<style>
.avatar {
  width: 100%;
  height: 100%;
  /* border-radius: 50% !important;
  border: 2px solid rgb(0, 0, 0) !important; */
}
</style>
