<template>
  <q-page class="bg-image1 q-pa-md flex flex-center">
    <q-card class="bg-grey-13 q-dark q-pb-xl float-left">
     <div class="fixed-center">
      <q-card class="bg-grey-13 q-dark q-pb-xl float-left">
        <div class="q-pt-lg" style="max-width: 380px">
          <q-card-section>
            <div class="q-pt-lg">
              <div class="col text-h6 ellipsis flex justify-center">
                <div class="text-h4 text-primary q-my-none text-weight-bold">
                  Password
                </div>
              </div>
            </div>
          </q-card-section>
          <br />

          <!--login form-->
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="q-pl-xl q-pr-xl">
                <q-input
                  v-model="username"
                  dense
                  label="Username"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input your Username',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>

                <q-input
                  v-model="currentpassword"
                  dense
                  label="Current Password"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input your current password',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>

                <q-input
                  v-model="newpassword"
                  dense
                  label="New Password"
                  :type="isPwd1 ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input your new password',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd1 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd1 = !isPwd1"
                    />
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>

                <div class="flex justify-center">
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
                </div>

              </div>
            </q-form>
          </q-card-section>
        </div>
      </q-card>
    </div>

    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
Options({});
export default class LibrarianChangePass extends Vue {
  username = "";
  currentpassword = "";
  newpassword = "";
  isPwd = true;
  isPwd1 = true;
  user = "librarian";

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
