<template>
  <div class="q-pa-md">
    <q-layout view="hHh lpR lFf">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            <div class="row">
            <section id="logo" class="column">
              <div class="q-pa-md">
                <q-avatar size="100px">
                  <q-img src="../assets/Images/Logo_ISED.png" />
                </q-avatar>
              </div>
            </section>
            <section id="librarian">
              <div>
                <br>
                <div class="text-h5 text-bold text-orange-9">I S E D</div>
                <div class="text-body3  text-bold text-white">
                  LIBRARY MANAGEMENT SYSTEM
                  <q-separator color="white" />
                </div>
                <div class="text-body1 text-white">
                  Mindanao State University - Marawi City
                </div>
                  <br>
              </div>
            </section>
          </div>
          </q-toolbar-title>

          <q-btn-dropdown flat dropdown-icon="account_circle" >
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="90px" icon="person"/>
                <div class="text-subtitle1 q-mt-md q-mb-xs">Librarian</div>
                <q-btn
                  class="q-ma-xs"
                  color="primary"
                  label="Logout"
                  push
                  size="md"
                  to="/Mainlayout"
                  v-close-popup
                />

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
            <q-item clickable v-ripple to="pages/Librarian/LibrarianIndex">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section> Dashboard </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="pages/Librarian/ManageBooks">
              <q-item-section avatar>
                <q-icon name="book" />
              </q-item-section>

              <q-item-section> Manage Books </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/admin/POS">
              <q-item-section avatar>
                <q-icon name="category" />
              </q-item-section>

              <q-item-section> Manage Categories </q-item-section>
            </q-item>

             <q-separator />

            <q-item clickable v-ripple to="/admin/POS">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section> Manage Borrowers </q-item-section>
            </q-item>

              <q-item clickable v-ripple to="/admin/POS">
              <q-item-section avatar>
                <q-icon name="how_to_reg" />
              </q-item-section>

              <q-item-section> Manage Issued Books </q-item-section>
            </q-item>

              <q-item clickable v-ripple to="/admin/POS">
              <q-item-section avatar>
                <q-icon name="how_to_reg" />
              </q-item-section>

              <q-item-section> Manage Fines </q-item-section>
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
