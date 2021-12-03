<template>
  <div class="q-pa-ml">
    <q-layout view="hHh lpR fFf ">
      <q-header elevated class="bg-image q-pa-sm q-py-sm">
        <q-toolbar>
          <q-img
            src="../assets/Images/Logo_ISED.png"
            style="width: 110px"
          ></q-img>

          <q-card flat class="bg-transparent flex flex-center">
            <section id="librarian">
              <div>
                <br />
                <div class="text-h6 text-bold text-white on-right">
                  WELCOME TO
                </div>
                <div class="text-h4 text-bold text-orange-9 on-right">
                  I S E D
                </div>
                <div class="text-h6 text-bold text-white on-right">
                  LIBRARY MANAGEMENT SYSTEM
                  <q-separator color="orange-9" width="390%" />
                </div>
                <div class="text-body1 text-white on-right">
                  Mindanao State University - Marawi City
                </div>
                <br />
              </div>
            </section>
          </q-card>
          <q-space />
          <q-img src="../assets/Images/msu-main.png" style="width: 80px" />
        </q-toolbar>

        <q-card flat class="bg-orange-9">
          <q-tabs key="" inline-label class="text-white shadow-2">
            <q-tab
              name="back"
              icon="home"
              label="Home"
              @click="() => $router.replace('/')"
            />
            <q-tab
              name="book"
              icon="collections_bookmark"
              label="Books"
              @click="() => $router.replace('/GuestIndex')"
            />
            <q-tab
              name="categories"
              icon="book"
              label="Categories"
              @click="() => $router.replace('/GuestCategories')"
            />
            <q-space />
            <q-tab
              v-if="$q.screen.gt.sm"
              name="login"
              icon="logout"
              label="Login"
              @click="() => $router.replace('/LoginForm')"
            />
          </q-tabs>
        </q-card>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer bordered class="bg-primary text-center text-caption text-white">
        Mindanao State University - Marawi City
      </q-footer>
    </q-layout>
  </div>
</template>
