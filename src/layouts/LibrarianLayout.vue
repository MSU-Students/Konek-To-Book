<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-image text-white" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          dense
          flat
          round
          icon="menu"
          class="q-mx-md"
          @click="drawer = !drawer"
        />

        <q-toolbar-title class="row items-center no-wrap">
          <img src="../assets/Images/Logo_ISED.png" style="height: 40px" />
          <span class="q-ml-sm">ISED Library</span>
        </q-toolbar-title>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-tooltip>Account</q-tooltip>
          <q-btn-dropdown round flat dropdown-icon="account_circle">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="70px">
                  <img src="../assets/Images/msu-main.png" />
                </q-avatar>
                <div class="q-mt-md q-mb-xs">201812488</div>
                <div class="text-weight-bold">Alango, Norjehan</div>
                <q-list>
                  <q-item
                    clickable
                    v-ripple
                    to="pages/Librarian/LibrarianChangePass"
                  >
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

    <q-drawer show-if-above v-model="drawer" bordered class="bg-grey-2">
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple to="pages/Librarian/LibrarianIndex">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-separator />
          <q-expansion-item>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="view_list" />
              </q-item-section>
              <q-item-section> Manage </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-item clickable v-ripple to="pages/Librarian/ManageAuthor">
                  <q-item-section avatar>
                    <q-icon name="person" />
                  </q-item-section>
                  <q-item-section> Authors </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  to="pages/Librarian/ManageCategories"
                >
                  <q-item-section avatar>
                    <q-icon name="book" />
                  </q-item-section>
                  <q-item-section> Categories </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  to="pages/Librarian/ManagePublisher"
                >
                  <q-item-section avatar>
                    <q-icon name="publish" />
                  </q-item-section>
                  <q-item-section> Publisher </q-item-section>
                </q-item>

                <q-item clickable v-ripple to="pages/Librarian/ManageBorrowers">
                  <q-item-section avatar>
                    <q-icon name="people" />
                  </q-item-section>
                  <q-item-section> Borrowers </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  to="pages/Librarian/ManageIssuedBooks"
                >
                  <q-item-section avatar>
                    <q-icon name="local_library" />
                  </q-item-section>
                  <q-item-section> Issued Books </q-item-section>
                </q-item>

                <q-item clickable v-ripple to="pages/Librarian/ManageFines">
                  <q-item-section avatar>
                    <q-icon name="payments" />
                  </q-item-section>
                  <q-item-section> Fines </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

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
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
Options({});
export default class LoginForm extends Vue {
  drawer = false;
}
</script>
