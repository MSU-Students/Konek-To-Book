<template>
  <div class="fullscreen bg-primary q-pa-md flex flex-center">
    <div class="q-pa-xl">
      <q-card flat class="bg-transparent">
        <q-avatar size="100px" class="absolute-center-left">
          <img src="../assets/images/Logo_ISED.png" />
        </q-avatar>

        <div class="text-h3 text-white"><b>WELCOME TO</b></div>
        <div class="font4 text-h2 text-orange-9"><b>I S E D</b></div>
        <div class="text-h3 text-white"><b>LIBRARY MANAGEMENT SYSTEM</b></div>
        <hr />
        <div class="font1 text-h6 text-white">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error404",
});
</script>