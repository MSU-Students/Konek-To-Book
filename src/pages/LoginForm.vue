<template>
<q-layout class="bg-image q-pa-md flex flex-center">
     <q-header  class="bg-image bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            flat
            round
            size="20px"
            color="white"
            icon="auto_stories"
            @click="() => $router.replace('/')"
          >
          </q-btn>
          KonektoBook
        </q-toolbar-title>


        <div class="q-gutter-sm items-center no-wrap">
            <q-btn
              flat
              class="bg-primary text-overline text-white"
              label="Home"
              to="/"
            />
            <q-btn
              flat
              class="bg-primary text-overline text-white"
              label="Sign-in as Admin"
             @click="adminLogin = true"
            />

 </div>
      </q-toolbar>
    </q-header>

    <div class="float-right q-pa-md">
      <q-btn
        :ripple="false"
        unelevated
        rounded
        icon="home"
        label="Homepage"
        color="secondary"
        to="/"
      />
    </div>


    <div class="fixed-center">
      <q-card class="bg-grey-13 q-dark q-pb-xl float-left">
        <div class="q-pt-lg" style="max-width: 380px">
          <q-card-section>
            <div class="q-pt-lg">
              <div class="col text-h6 ellipsis flex justify-center">
                <div class="text-h4 text-primary q-my-none text-weight-bold">
                  Login
                </div>
              </div>
            </div>
          </q-card-section>
          <br />

          <!--login form-->
          <q-card-section>
            <q-form @submit="loginUser" class="q-gutter-md">
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
                  v-model="password"
                  dense
                  label="Password"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input your password',
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

                <div class="flex justify-center">
                  <q-btn
                    :ripple="false"
                    unelevated
                    rounded
                    dense
                    class="glossy q-mt-xs full-width"
                    label="Login"
                    color="primary"
                    type="submit"
                  />
                </div>

   <!------------------------------------Admin LoginForm--------------------------------------------->

    <q-dialog v-model="adminLogin" persistent>
      <q-card class="bg-grey-11">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6"></div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="col text-h6 ellipsis flex justify-center">
            <div class="text-h4 text-primary q-my-none text-weight-bold">LOGIN</div>
          </div>
        </q-card-section>

        <q-card-section>
          <!--------------- Admin form-------------------->
          <q-form @submit="adminUser">
            <div class="q-pl-xl q-pr-xl">
              <q-input
                v-model="admin_user"
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
                v-model="admin_pass"
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
                  type="submit"
                />
              </div>

              <div class="text-center q-mt-sm d-qutter-lg">
                <router-link class="text-red-9 text-caption" to="/"
                  >forgot password?</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
<!------------------------------------ FOOTER OF LOGINFORM -------------------------------------->
                <div class="text-center q-mt-lg d-qutter-lg"></div>
                <div
                  class="
                    q-mt-md
                    text-center text-caption text-weight-medium text-primary
                    absolute-center-right
                  "
                >
                  *To register your account and retrieve the password, proceed
                  to Administrative Office, Institute of Science Education High
                  School, MSU-Main Marawi Campus.
                </div>
              </div>
            </q-form>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
Options({});
export default class LoginForm extends Vue {
  username = "";
  password = "";
  isPwd = true;
  adminLogin = false;


   async loginUser() {
    if (this.username == "librarian" && this.password == "librarian") {
      await this.$router.replace("/LibrarianIndex")
           this.$q.notify({
            color: "positive",
            icon: "cloud_done",
            textColor: "white",
            position: "top",
            message: "You are Logged In!.",
         });
    } else {
      this.username = "";
      this.password = "";
      this.$q.notify({
        color: "secondary",
        textColor: "primary",
        position: "top",
        message: "Incorrect username or password.",
      });
    }
   }

  admin_user = "";
  admin_pass = "";

  async adminUser() {
    if (this.admin_user == "admin" && this.admin_pass == "admin") {
      await this.$router.replace("/AdminIndex");
      this.$q.notify({
        color: "positive",
        icon: "cloud_done",
        textColor: "white",
        position: "top",
        message: "You are Logged In!.",
      });
    } else {
      this.admin_user = "";
      this.admin_pass = "";
      this.$q.notify({
        color: "secondary",
        textColor: "primary",
        position: "top",
        message: "Incorrect username or password.",
      });
    }
  }

  }




</script>
