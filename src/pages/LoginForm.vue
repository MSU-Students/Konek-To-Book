<template>
  <q-layout class="bg-image q-pa-md flex flex-center">
    <q-header class="bg-image bg-primary text-white">
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
            icon="home"
            size="14px"
            to="/"
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

          <!--login form--------------------------------------------------------------->
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
                    (val) => (val && val.length > 0) || 'Input your Password',
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

                <!------------------------------------ FOOTER OF LOGINFORM -------------------------------------->
                <div class="text-center q-mt-lg d-qutter-lg"></div>
                <div
                  class="q-mt-md text-center text-caption text-weight-medium text-primary absolute-center-right"
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
import { AUser } from "src/store/auth/state";
import { mapActions, mapState } from "vuex";
@Options({
  methods: {
    ...mapActions("auth", ["login"]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
})
export default class LoginForm extends Vue {
  login!: (auth: { userName: string; password: string }) => Promise<AUser>;
  currentUser!: AUser;

  username = "";
  password = "";
  isPwd = true;
  adminLogin = false;

  async loginUser() {
    try {
      await this.login({
        userName: this.username,
        password: this.password,
      });
      if (this.currentUser.User_Type == "Admin") {
        await this.$router.replace("/AdminIndex");
        this.$q.notify({
          position: "top",
          type: "positive",
          message: "You are logged in",
        });
      }
      if (this.currentUser.User_Type == "Librarian") {
        await this.$router.replace("/LibrarianIndex");
        this.$q.notify({
          position: "top",
          type: "positive",
          message: "You are logged in",
        });
      }
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: "Wrong Username or Password!",
      });
    }
  }
}
</script>
