<template>
  <q-page class="bg-image1">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_BORROWER ------------------------------------------    --->

      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-red-8 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW BORROWER BUTTON  ------------------------------------------    --->
        <q-tab
          name="account"
          icon="person_add"
          label="Add Account"
          @click="addUser = true"
        />
        <q-dialog v-model="addUser" persistent>
          <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="person" />
                </q-avatar>
                <div class="text-h6">Add New Account</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <q-form @submit="onaddAccount()">
                <div class="q-gutter-md row">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.FName"
                      label="First Name"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.MName"
                      label="Middle Name"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.LName"
                      label="Last Name"
                    />
                  </div>
                </div>
                <div class="q-gutter-md row">
                  <div class="col">
                    <q-select
                      outlined
                      dense
                      v-model="inputAccount.gender"
                      label="Gender"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.bdate"
                      type="date"
                      label="Birth Date"
                    />
                  </div>
                  <div align="right">
                    <q-btn flat label="Cancel" color="red-10" v-close-popup />
                    <q-btn flat label="Save" color="primary" type="submit" />
                  </div>
                </div>
              </q-form>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="inputAccount.address"
                  label="Address"
                />
              </div>
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="inputAccount.contact"
                  label="Contact Number"
                />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md">
              <q-input
                dense
                outlined
                v-model="inputAccount.username"
                label="Username"
              />
              <q-input
                dense
                outlined
                v-model="inputAccount.password"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-select
                outlined
                dense
                v-model="inputAccount.usertype"
                label="User type"
              />
            </q-card-section>

            <q-card-actions align="right"> </q-card-actions>
          </q-card>
        </q-dialog>
        <!--------------------------------  Print BORROWER ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF BORROWER  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        ref="tableRef"
        tabindex="0"
        title="Manage Accounts"
        :rows="allAccount"
        :columns="columns"
        row-key="name"
        :pagination="pagination"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input
            outlined
            rounded
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-page-scroller
            position="bottom-right"
            :scroll-offset="150"
            :offset="[18, 18]"
          >
            <q-btn
              fab
              icon="keyboard_arrow_up"
              color="orange-9"
              text-color="white"
            />
          </q-page-scroller>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.FName" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <div>
              <q-td>
                <!------------------------------------- EDIT BORROWER BUTTON   ------------------------------------------    --->
                <q-btn
                  round
                  color="teal-8"
                  icon="edit"
                  size="sm"
                  flat
                  dense
                  @click="editRow = true"
                />
                <q-dialog v-model="editRow">
                  <q-card
                    style="width: 750px; max-width: 100vw"
                    class="q-pa-md"
                  >
                    <q-card-section class="row">
                      <q-toolbar>
                        <q-avatar size="50px">
                          <q-icon name="person" />
                        </q-avatar>
                        <div class="text-h6">Edit Account</div>
                        <q-space />
                        <q-btn flat round dense icon="close" v-close-popup />
                      </q-toolbar>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAccount.FName"
                          label="First Name"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAccount.MName"
                          label="Middle Name"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAccount.LName"
                          label="Last Name"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-select
                          outlined
                          dense
                          v-model="inputAccount.gender"
                          label="Gender"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAccount.bdate"
                          type="date"
                          label="Birth Date"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAccount.address"
                          label="Address"
                        />
                      </div>

                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAccount.contact"
                          label="Contact Number"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                      <q-input
                        dense
                        outlined
                        v-model="inputAccount.username"
                        label="Username"
                      />
                      <q-input
                        dense
                        outlined
                        v-model="inputAccount.password"
                        :type="isPwd ? 'password' : 'text'"
                        label="Password"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                      <q-select
                        outlined
                        dense
                        v-model="inputAccount.usertype"
                        label="User type"
                      />
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="Cancel" color="red-10" v-close-popup />
                      <q-btn flat label="Save" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
                <!--------------------------------------- DELETE BORROWER BUTTON   ------------------------------------------    --->
                <q-btn
                  color="red-8"
                  icon="delete"
                  size="sm"
                  class="q-ml-sm"
                  flat
                  round
                  dense
                  @click="dialog = true"
                />
                <q-dialog v-model="dialog" persistent>
                  <q-card style="width: 300px">
                    <q-card-section class="row items-center">
                      <q-avatar
                        size="sm"
                        icon="warning"
                        color="red-10"
                        text-color="white"
                      />
                      <span class="q-ml-sm">Confirm Delete?</span>
                    </q-card-section>
                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-8"
                        v-close-popup="cancelEnabled"
                        :disable="!cancelEnabled"
                      />
                      <q-btn
                        flat
                        label="Confirm"
                        color="primary"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </q-td>
            </div>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { IAccountInfo } from "src/store/account/state";
import { mapActions, mapState } from "vuex";

@Options({
  computed: {
    ...mapState("account", ["allAccount"]),
  },
  methods: {
    ...mapActions("account", ["addAccount", "editAccount", "deleteAccount"]),
  },
})
export default class ManageAccount extends Vue {
  addAccount!: (payload: IAccountInfo) => Promise<void>;
  editAccount!: (payload: IAccountInfo) => Promise<void>;
  deleteAccount!: (payload: IAccountInfo) => Promise<void>;
  allAccount!: IAccountInfo[];

  tableRef = null;
  navigationActive = false;
  pagination = {};
  cancelEnabled = true;
  addUser = false;
  editRow = false;
  filter = "";
  dialog = false;
  isPwd = true;

  columns = [
    {
      name: "desc",
      required: true,
      label: "Name",
      align: "center",
      field: (row: IAccountInfo) => row.FName + "" + row.MName + "" + row.LName,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "gender",
      label: "Gender",
      align: "center",
      field: "gender",
      sortable: true,
    },
    { name: "bdate", label: "Birth Date", align: "center", field: "bdate" },
    { name: "address", label: "Address", align: "center", field: "address" },
    {
      name: "contact",
      label: "Contact Number",
      align: "center",
      field: "contact",
    },
    { name: "username", label: "Username", align: "center", field: "username" },
    { name: "password", label: "Password", align: "center", field: "password" },
    {
      name: "usertype",
      label: "User Type",
      align: "center",
      field: "usertype",
    },
  ];

  inputAccount: IAccountInfo = {
    studentID: "",
    FName: "",
    MName: "",
    LName: "",
    gender: "",
    bdate: "",
    address: "",
    contact: "",
    username: "",
    password: "",
    usertype: "",
  };

  async onaddAccount() {
    await this.addAccount(this.inputAccount);
    this.addUser = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Adeded.",
    });
  }

  async oneditAccount() {
    await this.editAccount(this.inputAccount);
    this.editRow = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Edit.",
    });
  }

  deleteSpecificAccount(val: IAccountInfo) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteAccount(val);
        this.$q.notify({
          type: "warning",
          message: "Successfully deleted",
        });
      });
  }

  openEditDialog(val: IAccountInfo) {
    this.editRow = true;
    this.inputAccount = { ...val };
  }

  resetModel() {
    this.inputAccount = {
      studentID: "",
      FName: "",
      MName: "",
      LName: "",
      gender: "",
      bdate: "",
      address: "",
      contact: "",
      username: "",
      password: "",
      usertype: "",
    };
  }
}
</script>
