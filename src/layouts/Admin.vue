<template>
  <div class="q-pa-md">
    <q-layout view="hHh lpR lFf">
      <q-header elevated class="bg-primary q-px-lg q-py-sm">
        <q-toolbar>
          <q-img src="../assets/Images/Logo_ISED.png" style="width: 110px"></q-img>

          <q-card flat class="bg-transparent">
            <div>
              <br />
              <div class="text-h4 text-bold text-orange-9 on-right">I S E D</div>
              <div class="text-h6 text-bold text-white on-right">
                LIBRARY MANAGEMENT SYSTEM
                <q-separator color="white" width="130%" />
              </div>
              <div class="text-body1 text-white on-right">
                Mindanao State University - Marawi City
              </div>
              <br />
            </div>
          </q-card>
          <q-space />

          <div class="search">
            <q-input
              rounded
              dense
              outlined
              bg-color="white"
              v-model="ph"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <q-btn-dropdown flat dropdown-icon="account_circle" size="25px">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="100px"  icon="person" />
                <div class="text-subtitle1 q-mt-md q-mb-xs">Administration</div>
                  <q-list>
                        <q-item clickable v-close-popup @click="onItemClick" to="pages/Admin/AdminChangePass">
                          <q-item-section avatar>
                            <q-avatar icon="manage_accounts" color="red-8" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Change Password</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick" to="pages/Guest/LoginForm">
                          <q-item-section avatar>
                            <q-avatar icon="logout" color="red-8" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Logout</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-icon name="info" color="amber" />
                          </q-item-section>
                        </q-item>
                      </q-list>
              </div>
            </div>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="240"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
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
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'Mylayout',

  data() {
    return {
      drawer: false,
      miniState: true,
    };
  },
};
</script>
