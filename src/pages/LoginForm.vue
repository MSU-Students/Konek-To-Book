<template>
  <q-page class="bg-image flex flex-center">
    <q-card class="bg-grey-13 q-dark q-pb-xl float-left">
        <div class="q-pt-lg" style="max-width: 380px " >

         <q-card-section>
             <div class="q-pt-lg">
              <div class="col text-h6 ellipsis flex justify-center">
                <div class="text-h4 text-primary q-my-none text-weight-bold">Login</div>
              </div>
            </div>
          </q-card-section>
          <br>

            <!--login form-->
            <q-card-section>
            <div class="q-pl-xl q-pr-xl">
              <q-input
                v-model="username"
                dense
                label="Username"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Input your Username']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                dense
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Input your password']"
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

              <div class="flex justify-center">
                <q-btn
                  :ripple="false"
                  unelevated
                  rounded
                  dense
                  class="glossy q-mt-xs full-width"
                  label="Login"
                  color="primary"
                  @click="Admin()"
                />
              </div>
              <div class="text-center q-mt-lg d-qutter-lg">

              </div>
              <div
                class="q-mt-md text-center text-caption text-weight-medium text-primary absolute-center-right"
              >

                *To register your account and retrieve the password, proceed to Administrative Office, Institute
                of Science Education High School, MSU-Main Marawi Campus.
              </div>
            </div>
          </q-card-section>
        </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
Options({});
export default class LoginForm extends Vue {
  username = "";
  password = "";
  isPwd = true;
  user = "";

  async Admin() {
    if (this.username == "admin" && this.password == "admin") {
      await this.$router.replace("Librarian/LibrarianIndex");
      this.$q.notify({
        color: "positive",
        icon: "cloud_done",
        textColor: "white",
        position: "bottom",
        message: "You are Logged In!.",
      });
    } else {
      this.username = "";
      this.password = "";
      this.$q.notify({
        color: "secondary",
        textColor: "primary",
        position: "bottom",
        message: "Incorrect username or password.",
      });
    }
  }
}
</script>
