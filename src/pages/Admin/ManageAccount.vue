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
          @click="addAccount = true"
        />
        <q-dialog v-model="addAccount" persistent>
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
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="firstname"
                  label="First Name"
                />
              </div>
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="middlename"
                  label="Middle Name"
                />
              </div>
              <div class="col">
                <q-input dense outlined v-model="lastname" label="Last Name" />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-select
                  outlined
                  dense
                  v-model="gender"
                  :options="options"
                  label="Gender"
                />
              </div>
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="bdate"
                  type="date"
                  label="Birth Date"
                />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-input dense outlined v-model="address" label="Address" />
              </div>
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="contact"
                  label="Contact Number"
                />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md">
              <q-input dense outlined v-model="username" label="Username" />
              <q-input
                dense
                outlined
                v-model="password"
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
                v-model="usertype"
                :options="options1"
                label="User type"
              />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="red-10" v-close-popup />
              <q-btn flat label="Add" color="primary" v-close-popup />
            </q-card-actions>
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
        :class="tableClass"
        tabindex="0"
        :icon="book"
        title="Manage Accounts"
        :rows="rows"
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
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
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

                    <q-card-section class="q-gutter-md">
                      <q-input
                        dense
                        outlined
                        v-model="userid"
                        readonly
                        label="User ID"
                      />
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="firstname"
                          label="First Name"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="middlename"
                          label="Middle Name"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="lastname"
                          label="Last Name"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-select
                          outlined
                          dense
                          v-model="gender"
                          :options="options"
                          label="Gender"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="bdate"
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
                          v-model="address"
                          label="Address"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="contact"
                          label="Contact Number"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                      <q-input
                        dense
                        outlined
                        v-model="username"
                        label="Username"
                      />
                      <q-input
                        dense
                        outlined
                        v-model="password"
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
                        v-model="usertype"
                        :options="options1"
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
                        color="primary"
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

            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

interface IRow {
  name: string;
}

Options({});
export default class ManageAccount extends Vue {
  tableRef = null;
  navigationActive = false;
  pagination = {};
  cancelEnabled = true;
  addAccount = false;
  editRow = false;
  filter = "";
  dialog = false;
  userid = "";
  firstname = "";
  middlename = "";
  lastname = "";
  gender = "";
  bdate = "";
  address = "";
  contact = "";
  username = "";
  password = null;
  usertype = "";
  options = ["Female", "Male"];
  options1 = ["Admin", "Librarian"];
  isPwd = true;

  columns = [
    {
      name: "userid",
      align: "center",
      label: "User ID",
      field: "userid",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "First Name",
      align: "center",
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "middlename ",
      label: "Middle name",
      align: "center",
      field: "middlename",
    },
    {
      name: "lastname",
      label: "Last Name",
      align: "center",
      field: "lastname",
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

  rows = [
    {
      userid: "01",
      studentID: "202012567",
      name: "Annehayrah",
      middlename: "P.",
      lastname: "Racman",
      gender: "Female",
      bdate: "10-10-1998",
      address: "Iligan City",
      contact: "09876567889",
      username: "ayrah",
      password: "1234",
      usertype: "Librarian",
    },
    {
      userid: "02",
      studentID: "20187892",
      name: "Norhani",
      middlename: "A.",
      lastname: "Ayaon",
      gender: "Female",
      bdate: "08-10-1998",
      address: "Marawi City",
      contact: "09876567889",
      username: "Kanie",
      password: "Kanie08",
      usertype: "Admin",
    },
    {
      userid: "03",
      studentID: "201812507",
      name: "Paul",
      middlename: "M.",
      lastname: "Sangcopan",
      gender: "Male",
      bdate: "12-02-1997",
      address: "Cagayan De Oro City",
      contact: "09876560000",
      username: "paul",
      password: "paul02",
      usertype: "Librarian",
    },
    {
      userid: "04",
      studentID: "201812507",
      name: "Norjehan",
      middlename: "M.",
      lastname: "Alango",
      gender: "Female",
      bdate: "12-15-1998",
      address: "Marawi City",
      contact: "09876560000",
      username: "jyyhan",
      password: "jyyhan15",
      usertype: "Admin",
    },
    {
      userid: "05",
      studentID: "202119067",
      name: "Norhanifah",
      middlename: "D.",
      lastname: "Ali",
      gender: "Female",
      bdate: "03-05-2000",
      address: "Marawi City",
      contact: "09009567889",
      username: "ifah",
      password: "ifah23",
      usertype: "Librarian",
    },
    {
      userid: "06",
      studentID: "202189067",
      name: "July",
      middlename: "D.",
      lastname: "rodrigues",
      gender: "Male",
      bdate: "06-29-2000",
      address: "Marawi City",
      contact: "09889567889",
      username: "july",
      password: "july09",
      usertype: "Librarian",
    },
  ];
}
</script>
