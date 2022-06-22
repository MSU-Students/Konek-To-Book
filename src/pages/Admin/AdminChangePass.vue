<template>
  <q-page class="bg-image3 q-pa-md flex flex-center">
    <q-card class="bg-blue-grey-1 q-dark q-pb-xl float-left">
      <q-card-section style="width: 340px"></q-card-section>

      <section id="login" class="column">
        <div class="q-pa-md" style="max-width: 400px" align="center">
          <br />
          <div class="text-h5 text-primary q-my-none text-weight-bold">
            Change Password
          </div>
          <br />

          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="q-pl-xl q-pr-xl">
              <q-input
                autofocus
                v-model="password.oldPassword"
                dense
                label="Current Password"
                :type="isPwd2 ? 'password' : 'text'"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || '']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  />
                </template>
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <!----------------------------- NEW PASSWORD ----------------------------->
              <q-input
                v-model="password.newPassword"
                dense
                label="New Password"
                :type="isPwd1 ? 'password' : 'text'"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || '']"
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
              <!----------------------------- CONFIRM PASSWORD ----------------------------->
              <q-input
                v-model="confirmpassword"
                dense
                label="Confirm Password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || '']"
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
import { lmsApiService } from "src/services/lms-api.service";

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
  isPwd2 = true;
  user = "librarian";

  async onSubmit() {
    this.$q
      .dialog({
        message: "Are you sure to change your password?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        try {
          if (this.password.newPassword != this.confirmpassword) {
            this.$q.notify({
              type: "negative",
              message: "Passwords not match!",
            });
            return;
          } else {
            await lmsApiService.changeMyPass(this.password);
            this.$q.notify({
              type: "positive",
              message: "Change password successfully",
            });

            const result = await lmsApiService.logoutUser();
            if (result.status == 201) {
              await this.$router.replace("/");
            }
            this.$q.notify({
              type: "warning",
              message: "You have been logged out!",
            });
          }
        } catch (error: any) {
          this.$q.notify({
            type: "negative",
            message: error.message,
          });
        }
      });
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
