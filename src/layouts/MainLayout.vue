<!------    LANDING PAGE-- MainLayout   ----->
<template>
  <div class="fullscreen bg-image q-pa-md flex flex-center">
    <div class="q-pa-xl">
      <q-card flat class="bg-transparent">
        <q-avatar size="100px" class="absolute-center-left">
          <img src="../assets/images/Logo_ISED.png" />
        </q-avatar>

        <div class="text-h3 text-black"><b>WELCOME TO</b></div>
        <div class="font4 text-h2 text-orange-9"><b>I S E D</b></div>
        <div class="text-h3 text-black"><b>LIBRARY MANAGEMENT SYSTEM</b></div>
        <hr />
        <div class="font1 text-h6 text-black">
          Mindanao State University - Marawi City
        </div>
      </q-card>
      <br /><br />

      <q-input rounded outlined bg-color="white" type="search">
        <template v-slot:append>
          <q-btn
            flat
            icon="search"
            @click="() => $router.replace('/GuestIndex')"
          />
        </template>
      </q-input>
    </div>
  </div>
   <q-page-container>
   <router-view/>
 </q-page-container>
</template>



<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
})
export default class Index extends Vue{}
</script>

<style>
.bg-image {
  background-image: url('../assets/library2.png');
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgb(179, 179, 170);
  background-size: 150%;
}
</style>