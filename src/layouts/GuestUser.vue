<template>
  <div class="q-pa-md">
    <q-layout view="hHh lpR fFf ">
      <q-header elevated class="bg-primary q-px-lg q-py-sm">
        <q-toolbar>
          <q-img src="../assets/Images/Logo_ISED.png" style="width: 110px"></q-img>

          <q-card flat class="bg-transparent">
            <section id="librarian">
              <div>
                <br />
                <div class="text-h6 text-bold text-white on-right">WELCOME TO</div>
                <div class="text-h4 text-bold text-orange-9 on-right">I S E D</div>
                <div class="text-h6 text-bold text-white on-right">
                  LIBRARY MANAGEMENT SYSTEM
                  <q-separator color="white" width="390%" />
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
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
