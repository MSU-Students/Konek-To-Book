<template>
<q-page class="bg-image">
  <!-- another section -->
  <section id="login" class="column">
    <div class="q-pa-md" style="max-width: 400px" align="center">
      <br /><br />
      <div class="text-h5 text-grey-10"><b>.</b></div>

      <q-card class="q-pa-x1 my-card bg-amber-1 text-white-2">
        <q-form class="q-gutter-md" style="max-width: 300px">
          <q-radio v-model="user" val="librarian" label="Librarian" />
          <q-radio v-model="user" val="admin" label="Admin" />

          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input color="primary" filled v-model="username" placeholder="Username">
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                color="primary"
                filled
                v-model="password"
                placeholder="Password"
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

              <div class="q-px-sm">
                Your selection is: <strong>{{ user }}</strong>
              </div>

              <div>
                <q-btn
                  clickable
                  v-ripple
                  to="Librarian/LibrarianIndex"
                  label="Login"
                  color="primary"
                ></q-btn>

                <q-btn
                  label="Clear"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-md"
                ></q-btn>
                
              </div>
            </q-form>
          </q-card-section>
        </q-form>
      </q-card>
    </div>
  </section>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "MainLayout",
  setup() {
    const username = ref(null);
    const password = ref(null);
    const accept = ref(false);
    return {
      slide: ref(1),
      isPwd: ref(true),
      username,
      password,
      autoplay: ref(true),
      user: ref("librarian"),
      // onSubmit() {
      //   $q.ref({
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'cloud_done',
      //     message: 'Submitted',
      //   });
      // },
      onClear() {
        username.value = null;
        password.value = null;
        accept.value = false;
      },
      onItemClick() {
        // console.log('Clicked on an Item')
      },
    };
  },
});
</script>