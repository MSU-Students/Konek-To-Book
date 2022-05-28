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
          <q-card style="width: 1100px; max-width: 110vw">
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
                <div class="row q-pl-md q-pr-lg">
                  <!--C O L U M N-->
                  <div class="col-12 col-md-4">
                    <div class="text-overline text-bold">
                      Account Type
                      <div class="q-gutter-y-md">
                        <q-file
                          outlined
                          accept=".jpg, image/*"
                          v-model="imageAttachement"
                          style="max-width: 300px"
                        >
                          <template v-slot:prepend>
                            <q-icon name="camera" />
                          </template>
                        </q-file>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-8">
                    <div class="text-overline text-bold">
                      Account Information
                      <div class="q-gutter-xs row">
                        <div class="col-12 col-md">
                          <q-input
                            v-model="inputUser.U_First_Name"
                            dense
                            outlined
                            label="First Name"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || '']"
                          />
                        </div>
                        <div class="col-12 col-md">
                          <q-input
                            v-model="inputUser.U_Middle_Name"
                            dense
                            outlined
                            label="Middle Initial"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || ' ']"
                          />
                        </div>
                        <div class="col-12 col-md">
                          <q-input
                            v-model="inputUser.U_Last_Name"
                            dense
                            outlined
                            label="Last Name"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || '']"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-x-xs row">
                        <div class="col-12 col-md">
                          <q-select
                            outlined
                            dense
                            v-model="inputUser.Gender"
                            :options="options"
                            label="Gender"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || '  ']"
                          />
                        </div>
                        <div class="col-12 col-md">
                          <q-input
                            dense
                            outlined
                            v-model="inputUser.U_Birth_Date"
                            type="date"
                            hint="Birth Date"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || ' ']"
                          />
                        </div>
                        <div class="col-12 col-md">
                          <q-input
                            dense
                            outlined
                            v-model="inputUser.Address"
                            label="Address"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || ' ']"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-sm row">
                        <div class="col-12 col-md">
                          <q-input
                            dense
                            outlined
                            v-model="inputUser.U_Contact_Number"
                            label="Contact Number"
                            mask="(####) ### - ####"
                            hint="Format: (0963) 135 - 8292"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || ' ']"
                          />
                        </div>
                        <div class="col-12 col-md">
                          <q-input
                            dense
                            outlined
                            v-model="inputUser.email"
                            label="Email"
                            type="email"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the email address',
                            ]"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-x-xs q-pb-sm">
                        <q-input
                          dense
                          outlined
                          v-model="inputUser.username"
                          label="Username"
                          lazy-rules
                          :rules="[(val) => (val && val.length > 0) || ' ']"
                        />
                        <q-input
                          dense
                          outlined
                          v-model="inputUser.password"
                          :type="isPwd ? 'password' : 'text'"
                          label="Password"
                          lazy-rules
                          :rules="[(val) => (val && val.length > 0) || ' ']"
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

                      <div class="q-gutter-sm row">
                        <div class="col-12 col-md">
                          <q-select
                            outlined
                            dense
                            v-model="inputUser.User_Type"
                            :options="options1"
                            label="User type"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Select the user type',
                            ]"
                          />
                        </div>
                        <div class="col-12 col-md">
                          <q-select
                            outlined
                            dense
                            v-model="inputUser.User_Status"
                            :options="options2"
                            label="Status"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Select the Account Status',
                            ]"
                          />
                        </div>
                      </div>

                      <q-card-actions align="right">
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
                      </q-card-actions>
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!--------------------------------  Export CSV _ ACCOUNT ------------------------------------------    --->
        <q-tab
          name="Export"
          icon="archive"
          label="Export to csv"
          @click="exportTable"
        />
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

        <!------------------------------------------ DETAILS ACCOUNT Button ------------------------------------------ ------------------------->

        <template v-slot:body-cell-Details="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="blue"
                icon="more_vert"
                size="md"
                flat
                dense
                @click="openDialog(props.row)"
              />
              <q-dialog v-model="showAccountDetails">
                <q-card style="width: 600px; max-width: 90vw" my-card>
                  <q-card-section>
                    <div>{{ inputUser.id }}</div>
                    <div class="text-h6 text-center">
                      {{
                        inputUser.U_First_Name +
                        " " +
                        inputUser.U_Middle_Name +
                        " " +
                        inputUser.U_Last_Name
                      }}
                    </div>
                  </q-card-section>

                  <q-separator />
                  <div class="row">
                    <div class="col">
                      <q-card-section>
                        <div class="text-left q-ma-mp q-mb-xs">
                          <strong>Gender :</strong>
                          {{ inputUser.Gender }}
                        </div>
                        <div class="text-left q-ma-mp q-mb-xs">
                          <strong>Birth Date :</strong>
                          {{ inputUser.U_Birth_Date }}
                        </div>
                        <div class="text-left q-ma-mp q-mb-xs">
                          <strong>Address :</strong>
                          {{ inputUser.Address }}
                        </div>
                        <div class="text-left q-ma-mp q-mb-xs">
                          <strong>Contact Number :</strong>
                          {{ inputUser.U_Contact_Number }}
                        </div>
                        <div class="text-left q-ma-mp q-mb-xs">
                          <strong>E-mail :</strong>
                          {{ inputUser.email }}
                        </div>
                        <div class="text-left q-ma-mp q-mb-xs">
                          <strong>Username : </strong>
                          {{ inputUser.username }}
                        </div>
                        <div class="text-left q-ma-mp q-mb-xs">
                          <strong>UserType : </strong>
                          {{ inputUser.User_Type }}
                        </div>
                        <div class="text-left q-ma-mp q-mb-xs">
                          <strong>Status :</strong>
                          {{ inputUser.User_Status }}
                        </div>
                      </q-card-section>
                    </div>
                    <div class="col">
                      <q-card-section class="col-5 flex flex-center">
                        <q-img
                          square
                          :src="`http://localhost:3000/media/${inputUser.url}`"
                          v-for="mode in fitModes"
                          :key="mode"
                          style="max-width: 300px; height: 150px"
                          :fit="mode"
                          font-size="82px"
                          color="teal"
                          text-color="white"
                          icon="account_circle"
                        />
                      </q-card-section>
                    </div>
                  </div>
                  <q-card-section
                    class="bg-primary text-center text-caption text-white"
                  >
                    Mindanao State University - Marawi City
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>
        <!--------------------------------  EDIT OF ACCOUNT  ------------------------------------------    --->
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
                <q-card style="width: 1100px; max-width: 110vw">
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
                      <div class="row q-pl-md q-pr-lg">
                        <!--C O L U M N-->
                        <div class="col-12 col-md-4">
                          <div class="text-overline text-bold">
                            Account Type
                            <div class="q-gutter-y-md">
                              <q-file
                                outlined
                                accept=".jpg, image/*"
                                v-model="imageAttachement"
                                style="max-width: 300px"
                              >
                                <template v-slot:prepend>
                                  <q-icon name="camera" />
                                </template>
                              </q-file>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 col-md-8">
                          <div class="text-overline text-bold">
                            Account Information
                            <div class="q-gutter-xs row">
                              <div class="col-12 col-md">
                                <q-input
                                  v-model="inputUser.U_First_Name"
                                  dense
                                  outlined
                                  label="First Name"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'input your first name',
                                  ]"
                                />
                              </div>
                              <div class="col-12 col-md">
                                <q-input
                                  v-model="inputUser.U_Middle_Name"
                                  dense
                                  outlined
                                  label="Middle Initial"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'input your middle initial',
                                  ]"
                                />
                              </div>
                              <div class="col-12 col-md">
                                <q-input
                                  v-model="inputUser.U_Last_Name"
                                  dense
                                  outlined
                                  label="Last Name"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'input your last name',
                                  ]"
                                />
                              </div>
                            </div>

                            <div class="q-gutter-x-xs row">
                              <div class="col-12 col-md">
                                <q-select
                                  outlined
                                  dense
                                  v-model="inputUser.Gender"
                                  :options="options"
                                  label="Gender"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Select the gender',
                                  ]"
                                />
                              </div>
                              <div class="col-12 col-md">
                                <q-input
                                  dense
                                  outlined
                                  v-model="inputUser.U_Birth_Date"
                                  type="date"
                                  hint="Birth Date"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Input the birth date',
                                  ]"
                                />
                              </div>
                              <div class="col-12 col-md">
                                <q-input
                                  dense
                                  outlined
                                  v-model="inputUser.Address"
                                  label="Address"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Input the location',
                                  ]"
                                />
                              </div>
                            </div>

                            <div class="q-gutter-sm row">
                              <div class="col-12 col-md">
                                <q-input
                                  dense
                                  outlined
                                  v-model="inputUser.U_Contact_Number"
                                  label="Contact Number"
                                  mask="(####) ### - ####"
                                  hint="Format: (0963) 135 - 8292"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Input the contact number',
                                  ]"
                                />
                              </div>
                              <div class="col-12 col-md">
                                <q-input
                                  dense
                                  outlined
                                  v-model="inputUser.email"
                                  label="Email"
                                  type="email"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Input the email account',
                                  ]"
                                />
                              </div>
                            </div>

                            <div class="q-gutter-x-xs q-pb-sm">
                              <q-input
                                dense
                                outlined
                                v-model="inputUser.username"
                                label="Username"
                                lazy-rules
                                :rules="[
                                  (val) =>
                                    (val && val.length > 0) ||
                                    'Input the username',
                                ]"
                              />
                              <q-input
                                dense
                                readonly
                                outlined
                                v-model="inputUser.password"
                                :type="isPwd ? 'password' : 'text'"
                                label="Password"
                                lazy-rules
                                :rules="[
                                  (val) =>
                                    (val && val.length > 0) ||
                                    'Input the password',
                                ]"
                              >
                              </q-input>
                            </div>

                            <div class="q-gutter-sm row">
                              <div class="col-12 col-md">
                                <q-select
                                  outlined
                                  dense
                                  v-model="inputUser.User_Type"
                                  :options="options1"
                                  label="User type"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Select the user type',
                                  ]"
                                />
                              </div>
                              <div class="col-12 col-md">
                                <q-select
                                  outlined
                                  dense
                                  v-model="inputUser.User_Status"
                                  :options="options2"
                                  label="Status"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Select the Account Status',
                                  ]"
                                />
                              </div>
                            </div>

                            <q-card-actions align="right">
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
                            </q-card-actions>
                          </div>
                        </div>
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
              <!----------------------------- - - - - -  DELETE BUTTON  - - - - ----------------------------->
              <q-btn
                color="red-8"
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                round
                dense
                @click="deleteSpecificAccount(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { exportFile } from "quasar";
import { MediaDto, UserDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";

function wrapCsvValue(
  val: string,
  formatFn?: (v: string, r: any) => string,
  row?: any
) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

@Options({
  computed: {
    ...mapState("account", ["allAccount"]),
    ...mapState("account", ["allUser"]),
  },
  methods: {
    ...mapActions("account", [
      "addAccount",
      "editAccount",
      "deleteAccount",
      "getAllUser",
    ]),
    ...mapActions("media", ["uploadMedia"]),
  },
})
export default class ManageAccount extends Vue {
  allAccount!: UserDto[];

  addAccount!: (payload: UserDto) => Promise<void>;
  editAccount!: (payload: UserDto) => Promise<void>;
  deleteAccount!: (payload: UserDto) => Promise<void>;
  getAllUser!: () => Promise<void>;

  uploadMedia!: (payload: File) => Promise<MediaDto>;

  async mounted() {
    await this.getAllUser();
    console.log(this.allAccount);
  }

  imageAttachement: File = new File([], "Pick a Profile Pic (Max: 2MB)");
  loading = false;
  filter = "";

  accountDetails = "";
  deleteSpecific = false;
  showAccountDetails = false;
  addNewAccount = false;
  cancelEnabled = true;
  editRowAccount = false;

  fitModes = ["scale-down"];
  options = ["Male", "Female"];
  options1 = ["Librarian", "Admin"];
  options2 = ["Active", "Inactive"];
  isPwd = true;

  columns = [
    {
      name: "Details",
      align: "center",
      field: "Details",
    },
      {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },

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


  ];

// ----------------------------- E X P O R T TABLE-------------------------------------
  exportTable() {
    // naive encoding to csv format
    const header = [
      wrapCsvValue("User ID"),
      wrapCsvValue("First Name"),
      wrapCsvValue("Middle Name"),
      wrapCsvValue("Last Name"),
      wrapCsvValue("Gender"),
      wrapCsvValue("Birth Date"),
      wrapCsvValue("Address"),
      wrapCsvValue("Contact number"),
      wrapCsvValue("Email"),
      wrapCsvValue("Username"),
      wrapCsvValue("User Type"),
      wrapCsvValue("Status"),
    ];
    const rows = [header.join(",")].concat(
      this.allAccount.map((c) =>
        [
          wrapCsvValue(String(c.id)),
          wrapCsvValue(c.U_First_Name),
          wrapCsvValue(String(c.U_Middle_Name)),
          wrapCsvValue(c.U_Last_Name),
          wrapCsvValue(c.Gender),
          wrapCsvValue(c.U_Birth_Date),
          wrapCsvValue(c.Address),
          wrapCsvValue(String(c.U_Contact_Number)),
          wrapCsvValue(String(c.email)),
          wrapCsvValue(c.username),
          wrapCsvValue(c.User_Type),
          wrapCsvValue(c.User_Status),
        ].join(",")
      )
    );

    const status = exportFile(
      "List of Accounts_MSU ISED LIBRARY-export.csv",
      rows.join("\r\n"),
      "text/csv"
    );

    if (status !== true) {
      this.$q.notify({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning",
      });
    }
  }

// -----------------------------------------------------------------------
  inputUser: any = {
    U_First_Name: "",
    U_Middle_Name: "",
    U_Last_Name: "",
    Gender: "",
    U_Birth_Date: "",
    Address: "",
    U_Contact_Number: "",
    email: "",
    User_Type: "",
    User_Status: "Active",
    username: "",
    password: "",
  };

  async onaddAccount() {
    //upload picture
    try {
      if (this.imageAttachement.size > 0) {
        this.loading = true;
        const media = await this.uploadMedia(this.imageAttachement as File);
        await this.addAccount({
          ...this.inputUser,
          url: media.Media_id,
        });
        this.$q.notify({
          type: "positive",
          message: "Account is Successfully Added!.",
        });
      } else {
        await this.addAccount(this.inputUser);
        this.$q.notify({
          type: "positive",
          message: "Account is Successfully Added!.",
        });
      }
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: "Error!.",
      });
    }

    this.addNewAccount = false;
    this.loading = false;
    this.resetModel();
  }
  async oneditAccount() {
    console.log;
    try {
      if (this.imageAttachement.size > 0) {
        this.loading = true;
        const media = await this.uploadMedia(this.imageAttachement as File);
        await this.editAccount({ ...this.inputUser, url: media.Media_id });
      } else if (this.imageAttachement.size < 0) {
        await this.editAccount({ ...this.inputUser });
      }
      this.$q.notify({
        type: "positive",
        message: "Successfully Update",
      });
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: "Unsuccessfully Update",
      });
    }
    this.loading = false;
    this.editRowAccount = false;
    this.resetModel();
  }

  deleteSpecificAccount(val: UserDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteAccount(val.id as any);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: UserDto) {
    this.editRowAccount = true;
    this.inputUser = { ...val };
  }

  openDialog(val: UserDto) {
    this.showAccountDetails = true;
    this.inputUser = { ...val };
  }

  resetModel() {
    this.inputUser = {
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
      url: "",
    };
    this.imageAttachement = new File([], "Pick a Profile Pic (Max: 2MB)");
  }
}
</script>
