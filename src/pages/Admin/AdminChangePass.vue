<template>
  <q-page class="bg-image3 q-pa-md flex flex-center">
    <q-card class="bg-grey-13 q-dark q-pb-xl float-left">
      <q-card-section style="width: 360px"></q-card-section>

      <section id="login" class="column">
        <div class="q-pa-md" style="max-width: 400px" align="center">
          <br />
          <div class="text-h5 text-grey-10 text-bold">Password</div>
          <br />
          <q-form @submit="onSubmit" @reset="onClear" class="q-gutter-md">
            <div class="q-pa-md">
              <div class="q-gutter-xs">
                <q-input
                  color="orange-9"
                  filled
                  v-model="username"
                  style="width: 250px"
                  placeholder="Username"
                >
                  <template v-slot:append>
                    <q-icon name="person" />
                  </template>
                </q-input>

                <q-input
                  color="orange-9"
                  filled
                  v-model="currentpassword"
                  placeholder="Current Password"
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-input
                  color="orange-9"
                  filled
                  v-model="newpassword"
                  placeholder="New Password"
                  :type="isPwd1 ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd1 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd1 = !isPwd1"
                    />
                  </template>
                </q-input>
              </div>
            </div>

            <div>
              <q-btn clickable v-ripple label="save" color="primary"></q-btn>
              <q-btn
                label="Clear"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              ></q-btn>
            </div>
          </q-form>
        </div>
      </section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
Options({});
export default class AdminChangePass extends Vue {
  username = "";
  currentpassword = "";
  newpassword = "";
  isPwd = true;
  isPwd1 = true;
  user = "admin";

  // onSubmit() {
  //   $q.ref({
  //     color: 'green-4',
  //     textColor: 'white',
  //     icon: 'cloud_done',
  //     message: 'Submitted',
  //   });
  // },

  onClear() {
    this.username = "";
    this.currentpassword = "";
    this.newpassword = "";
  }
}
</script>
