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

                <q-input color="orange-9" filled v-model="username"  style="width: 250px" placeholder="Username">
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
                class="q-ml-sm"
              ></q-btn>
            </div>
          </q-form>
        </div>
      </section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'MainLayout',
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
      user: ref('librarian'),
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
