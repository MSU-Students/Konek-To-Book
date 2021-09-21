<template>
    <q-layout view="hHh lpR fFf">
      <q-header class="q-px-lg q-pt-md q-mb-md">
        <q-toolbar>
          <q-toolbar-title>
            <div class="row">
              <section id="logo" class="column">
                <div class="q-pa-md">
                  <q-avatar size="130px">
                    <q-img src="../assets/Images/Logo_ISED.png" />
                  </q-avatar>
                </div>
              </section>
              <section id="librarian">
                <div>
                  <div class="text-h7 text-bold text-white">WELCOME TO</div>
                  <div class="text-h4 text-orange-9 text-bold">I S E D</div>
                  <div class="text-h8 text-bold text-white">
                    LIBRARY MANAGEMENT SYSTEM
                    <q-separator color="white" />
                  </div>
                  <div class="text-body1 text-white">
                    Mindanao State University - Marawi City
                  </div>
                </div>
              </section>
              <!-- <section>
              <div>
                <q-avatar square size="120px" >
                  <q-img src="../assets/Images/msu-main.png"> </q-img>
                </q-avatar>
              </div>
            </section> -->
            </div>
          </q-toolbar-title>
        </q-toolbar>
        <div full-width>
        <q-tabs
          key=""
          inline-label
          dense
          align="justify"
          class="bg-orange-9 text-white shadow-2"
        >
          <q-tab
            name="home"
            icon="home"
            label="Home"
            @click="() => $router.replace('/GuestIndex')"
          />
          <q-tab
            name="categories"
            icon="category"
            label="Categories"
            @click="() => $router.replace('/GuestCategories')"
          />
          <q-tab
            v-if="$q.screen.gt.sm"
            name="login"
            icon="logout"
            label="Login"
            @click="() => $router.replace('/LoginForm')"
          />
        </q-tabs>
        </div>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
</template>

<style scoped>
.lfloat {
  float: left;
}
.rfloat {
  float: right;
  width: 90%;
}
#logo {
  width: 20%;
}
#librarian {
  width: 80%;
}

.font2 {
  padding-left: 1%;
}

.padding1 {
  padding-left: 1%;
}
.bg-image {
  background-image: url('../assets/library2.png');
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgb(240, 240, 239);
  background-size: 100%;
}
</style>


