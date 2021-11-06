<template>
  <!-- another section -->
  <q-page class="bg-image q-pa-md flex flex-center">
    <q-card class="bg-grey-13 q-dark q-pb-xl float-left">
      <q-card-section style="width: 360px"></q-card-section>

      <section id="login" class="column">
        <div class="q-pa-md" style="max-width: 400px" align="center">
          <br /><br />
          <div class="text-h5 text-grey-10 text-bold">SIGN IN FORM</div>
          <q-form @submit="onSubmit" @reset="onClear" class="q-gutter-md">
            <div class="q-pa-sm">
              <div class="q-gutter-xs">
                <q-radio v-model="user" val="librarian" label="Librarian" />
                <q-radio v-model="user" val="admin" label="Admin" />

                <q-input
                  color="orange-9"
                  filled
                  v-model="username"
                  style="width: 250px"
                  placeholder="Username"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input your Username',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  color="orange-9"
                  filled
                  v-model="password"
                  placeholder="Password"
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
                </q-input>
              </div>
            </div>

            <div class="q-px-sm">
              Your selection is: <strong>{{ user }}</strong>
            </div>

            <div>
              <q-btn label="Login" color="primary" type="submit" />
              <q-btn
                clickable
                label="Clear"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
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
export default class LoginForm extends Vue {
  username = "";
  password = "";
  isPwd = true;
  user = "";

  async onSubmit() {
    if (this.username == "admin" && this.password == "admin") {
      await this.$router.replace("Librarian/LibrarianIndex");
    } else {
      this.username = "";
      this.password = "";
    }
  }
  onClear() {
    this.username = "";
    this.password = "";
  }
}
</script>
