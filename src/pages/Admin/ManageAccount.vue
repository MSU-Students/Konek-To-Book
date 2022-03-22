<template>
  <q-page class="bg-image1">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_ACCOUNT ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-red-8 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW Account BUTTON  ------------------------------------------    --->
        <q-tab
          name="account"
          icon="person_add"
          label="Add Account"
          @click="addNewAccount = true"
        />
        <q-dialog v-model="addNewAccount" persistent>
          <q-card style="width: 750px; max-width: 100vw">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="person" />
                </q-avatar>
                <div class="text-h6">Add New Account</div>
                <q-space />
                <q-btn
                  flat
                  round
                  dense
                  icon="close"
                  @click="resetModel()"
                  v-close-popup
                />
              </q-toolbar>
            </q-card-section>

            <q-card-section>
              <q-form @submit="onaddAccount()" class="q-px-md">
                <div class="q-gutter-md row q-pb-md">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.U_First_Name"
                      label="First Name"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.U_Middle_Name"
                      label="Middle Name"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.U_Last_Name"
                      label="Last Name"
                    />
                  </div>
                </div>
                <div class="q-gutter-md row q-pb-sm">
                  <div class="col">
                    <q-select
                      outlined
                      dense
                      v-model="inputAccount.Gender"
                      :options="options"
                      label="Gender"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.U_Birth_Date"
                      type="date"
                      hint="Birth Date"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.Address"
                      label="Address"
                    />
                  </div>
                </div>
                <div class="q-gutter-md row q-pb-sm">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.U_Contact_Number"
                      label="Contact Number"
                      mask="(###) #### - #####"
                      hint="Format: (639) 6312 - 58292"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAccount.email"
                      label="Email"
                    />
                  </div>
                </div>

                <div class="q-gutter-md">
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
                    v-model="inputAccount.User_Type"
                    :options="options1"
                    label="User type"
                  />
                </div>
                <div align="right">
                  <q-btn
                    flat
                    label="Cancel"
                    color="red-10"
                    v-close-popup
                    @click="resetModel()"
                  />
                  <q-btn flat label="Save" color="primary" type="submit" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!--------------------------------  Print ACCOUNT ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF ACCOUNT  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="Manage Accounts"
        :rows="allAccount"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
        :filter="filter"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:top-right>
          <div class="q-pa-md q-gutter-sm row">
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
          </div>
        </template>
        <!--------------------------------  SHOW LIST OF ACCOUNT  ------------------------------------------    --->
        <template v-slot:body-cell-accountDetails="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="blue"
                icon="description"
                size="sm"
                flat
                dense
                @click="showAccountDetails = true"
              />
              <q-dialog v-model="showAccountDetails">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-h6">
                      Account Information
                      <q-btn
                        round
                        flat
                        dense
                        icon="close"
                        class="float-right"
                        color="grey-8"
                        v-close-popup
                      ></q-btn>
                    </div>
                    <div>User ID:</div>
                    <div>First Name:</div>
                    <div>Middle Name:</div>
                    <div>Last Name:</div>
                    <div>Birth Date:</div>
                    <div>Address:</div>
                    <div>Contact Number:</div>
                    <div>Email:</div>
                    <div>Username:</div>
                    <div>UserType:</div>
                    <div>Status:</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section>
                    Assessing clients needs and present suitable promoted
                    products. Liaising with and persuading targeted doctors to
                    prescribe our products utilizing effective sales skills.
                  </q-card-section>
                  <q-separator />
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="blue"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowAccount" persistent>
                <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <q-toolbar>
                      <q-avatar size="50px">
                        <q-icon name="person" />
                      </q-avatar>
                      <div class="text-h6">Edit Account</div>
                      <q-space />
                      <q-btn
                        flat
                        round
                        dense
                        icon="close"
                        v-close-popup
                        @click="resetModel()"
                      />
                    </q-toolbar>
                  </q-card-section>

                  <q-card-section>
                    <q-form @submit="oneditAccount()" class="q-px-md">
                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputAccount.U_First_Name"
                            label="First Name"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputAccount.U_Middle_Name"
                            label="Middle Name"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputAccount.U_Last_Name"
                            label="Last Name"
                          />
                        </div>
                      </div>
                      <div class="q-gutter-md row q-pb-sm">
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="inputAccount.Gender"
                            :options="options"
                            label="Gender"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputAccount.U_Birth_Date"
                            type="date"
                            hint="Birth Date"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputAccount.Address"
                            label="Address"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-sm">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputAccount.U_Contact_Number"
                            label="Contact Number"
                            mask="(###) #### - #####"
                            hint="Format: (639) 6312 - 58292"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputAccount.email"
                            label="Email"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md q-pb-md">
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
                      </div>

                      <div class="q-gutter-md row q-pb-sm">
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="inputAccount.User_Type"
                            :options="options1"
                            label="User type"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="inputAccount.User_Status"
                            :options="options2"
                            label="Status"
                          />
                        </div>
                      </div>

                      <div align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-10"
                          v-close-popup
                          @click="resetModel()"
                        />
                        <q-btn
                          flat
                          label="Save"
                          color="primary"
                          type="submit"
                        />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
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
                    <q-btn flat label="Confirm" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { UserDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";
@Options({
  computed: {
    ...mapState("account", ["allAccount"]),
  },
  methods: {
    ...mapActions("account", [
      "addAccount",
      "editAccount",
      "deleteAccount",
      "getAllUser",
    ]),
  },
})
export default class ManageAccount extends Vue {
  allAccount!: UserDto[];
  addAccount!: (payload: UserDto) => Promise<void>;
  editAccount!: (payload: UserDto) => Promise<void>;
  deleteAccount!: (payload: UserDto) => Promise<void>;
  getAllUser!: () => Promise<void>;

  async mounted() {
    await this.getAllUser();
  }

  tableRef = null;
  navigationActive = false;
  pagination = {};
  selected = [];
  filter = "";
  dialog = false;
  //editRowExpenses = false;
  showAccountDetails = false;
  addNewAccount = false;
  cancelEnabled = true;
  editRowAccount = false;

  accountDetails = "";
  options = ["Male", "Female"];
  options1 = ["Librarian", "Admin"];
  options2 = ["Active", "Inactive"];
  isPwd = true;

  columns = [
    {
      name: "userid",
      required: true,
      align: "center",
      label: "User ID",
      field: "id",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "First Name",
      align: "center",
      field: (row: UserDto) => row.U_First_Name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "middlename ",
      label: "Middle name",
      align: "center",
      field: "U_Middle_Name",
    },
    {
      name: "lastname",
      label: "Last Name",
      align: "center",
      field: "U_Last_Name",
      sortable: true,
    },
    {
      name: "gender",
      label: "Gender",
      align: "center",
      field: "Gender",
      sortable: true,
    },
    {
      name: "bdate",
      label: "Birth Date",
      align: "center",
      field: "U_Birth_Date",
    },
    { name: "address", label: "Address", align: "center", field: "Address" },
    {
      name: "contact",
      label: "Contact Number",
      align: "center",
      field: "U_Contact_Number",
    },
    { name: "email", label: "Email", align: "center", field: "email" },
    { name: "username", label: "Username", align: "center", field: "username" },
    {
      name: "usertype",
      label: "User Type",
      align: "center",
      field: "User_Type",
    },
    {
      name: "userstatus",
      label: "Status",
      align: "center",
      field: "User_Status",
    },
    {
      name: "accountDetails",
      align: "center",
      label: "Note",
      field: "accountDetails",
    },
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
  ];

  inputAccount: UserDto = {
    U_First_Name: "",
    U_Middle_Name: "",
    U_Last_Name: "",
    Gender: "",
    U_Birth_Date: "",
    Address: "",
    U_Contact_Number: "",
    email: "",
    User_Type: "",
    User_Status: "active",
    username: "",
    password: "",
  };

  async onaddAccount() {
    await this.addAccount(this.inputAccount);
    this.addNewAccount = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
    debugger;
  }

  async oneditAccount() {
    await this.editAccount(this.inputAccount);
    this.editRowAccount = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Edit.",
    });
  }

  deleteSpecificAccount(val: UserDto) {
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
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: UserDto) {
    this.editRowAccount = true;
    this.inputAccount = { ...val };
  }

  resetModel() {
    this.inputAccount = {
      U_First_Name: "",
      U_Middle_Name: "",
      U_Last_Name: "",
      Gender: "",
      Address: "",
      U_Birth_Date: "",
      U_Contact_Number: "",
      email: "",
      User_Type: "",
      User_Status: "",
      username: "",
      password: "",
    };
  }
}
</script>
