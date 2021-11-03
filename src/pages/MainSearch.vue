<template>
   <q-page class="bg-image q-pa-md flex flex-center">

      <div class="row">
        <div>
          <q-img src="../assets/Images/Logo_ISED.png" style="width: 220px"></q-img>
        </div>

        <div>
          <q-card flat class="bg-transparent">
            <div class="text-h3 text-bold text-black on-right">WELCOME TO</div>
            <div class="font4 text-h2 text-bold text-orange-9 on-right">I S E D</div>
            <div class="text-h3 text-bold text-black on-right">
              LIBRARY MANAGEMENT SYSTEM
              <q-separator color="black" width="100%" />
            </div>
            <div class="text-h6 text-black on-right">
              Mindanao State University - Marawi City
            </div>
          </q-card>

          <br />
          <q-input
            rounded
            dense
            outlined
            bg-color="white"
            v-model="search"
            placeholder="Search"
          >

            <template v-slot:append>
              <q-btn flat icon="search" @click="() => $router.replace('/GuestIndex')" />
            </template>
          </q-input>
        </div>
      </div>

 </q-page>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout'
})
</script>
