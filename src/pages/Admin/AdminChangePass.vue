<template>
  <q-page class="bg-image3 q-pa-md flex flex-center">
    <q-card class="bg-grey-13 q-dark q-pb-xl float-left">
      <q-card-section style="width: 360px"></q-card-section>

      <section id="login" class="column">
        <div class="q-pa-md" style="max-width: 400px" align="center">
          <br />
          <div class="text-h5 text-grey-10 text-bold">Password</div>
          <br />

          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="q-pl-xl q-pr-xl">
              <q-input
                autofocus
                v-model="password.oldPassword"
                dense
                label="Current Password"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Input your  current password',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>

              <q-input
                v-model="password.newPassword"
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

              <q-input
                v-model="confirmpassword"
                dense
                label="Confirm Password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Input your confirm password',
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
                <div>
                  <q-btn
                    clickable
                    v-ripple
                    label="save"
                    color="primary"
                    type="submit"
                  ></q-btn>
                  <q-btn
                    label="Clear"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                    @click="onClear()"
                  ></q-btn>
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { mapActions } from "vuex";
import { ChangePasswordDto } from "src/services/rest-api";

Options({
  methods: {
    ...mapActions("auth", ["changePassword"]),
  },
});

export default class LibrarianChangePass extends Vue {
  changePassword!: (changePassword: ChangePasswordDto) => Promise<void>;
  password: ChangePasswordDto = {
    oldPassword: "",
    newPassword: "",
  };
  confirmpassword = "";
  isPwd = true;
  isPwd1 = true;
  user = "librarian";

  async onSubmit() {
    try {
      if (this.password.newPassword != this.confirmpassword) {
        this.$q.notify({
          type: "negative",
          message: "Passwords not match!",
        });
        return;
      }
      await this.changePassword(this.password);
      this.$q.notify({
        type: "positive",
        message: "Change password successfully",
      });
    } catch (error: any) {
      this.$q.notify({
        type: "negative",
        message: error.message,
      });
    }
  }

  onClear() {
    this.confirmpassword = "";
    this.password = {
      oldPassword: "",
      newPassword: "",
    };
  }
}
</script>
