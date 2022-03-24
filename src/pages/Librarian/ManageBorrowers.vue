<template>
  <q-page class="bg-image1">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_BORROWER ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-orange-9 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW BORROWER BUTTON  ------------------------------------------    --->
        <q-tab
          name="borrower"
          icon="person_add"
          label="Add Borrower"
          @click="addBorrower = true"
        />
        <q-dialog v-model="addBorrower" persistent>
          <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="person" />
                </q-avatar>
                <div class="text-h6">Add New Borrower</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>
            </q-card-section>

            <q-card-section class="q-gutter-md row q-pb-sm">
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="studentid"
                  label="Student ID"
                />
              </div>
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
                <q-input
                  dense
                  outlined
                  v-model="yearlevel"
                  label="Year/Level"
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
              <div class="col">
                <q-select
                  outlined
                  dense
                  v-model="issuedbookid"
                  :options="options"
                  label="IssuedBook_ID"
                />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="red-10" v-close-popup />
              <q-btn flat label="Save" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!--------------------------------  Print BORROWER ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE _ LIST OF BORROWERS  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of Borrowers"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
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

        <!------------------------------------- EDIT BORROWER BUTTON   ------------------------------------------    --->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="teal-8"
                icon="edit"
                size="sm"
                flat
                dense
                @click="editRow = true"
              />
              <q-dialog v-model="editRow" persistent>
                <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <q-toolbar>
                      <q-avatar size="50px">
                        <q-icon name="person" />
                      </q-avatar>
                      <div class="text-h6">Edit Borrower</div>
                      <q-space />
                      <q-btn flat round dense icon="close" v-close-popup />
                    </q-toolbar>
                  </q-card-section>

                  <q-card-section class="q-gutter-md row">
                    <div class="col">
                      <q-input
                        dense
                        outlined
                        v-model="borrowerid"
                        readonly
                        label="Borrower ID"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        dense
                        outlined
                        v-model="studentid"
                        label="Student ID"
                      />
                    </div>
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
                      <q-input
                        dense
                        outlined
                        v-model="yearlevel"
                        label="Year/Level"
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
                    <div class="col">
                      <q-select
                        outlined
                        dense
                        v-model="issuedbookid"
                        :options="options"
                        label="IssuedBook_ID"
                      />
                    </div>
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
import { Vue, Options } from "vue-class-component";
interface IRow {
  name: string;
}

export default class ManageBorrowers extends Vue {
  tableRef = null;
  navigationActive = false;
  pagination = {};
  cancelEnabled = true;
  addBorrower = false;
  editRow = false;
  filter = "";
  dialog = false;

  borrowerid = "";
  studentid = "";
  firstname = "";
  middlename = "";
  lastname = "";
  yearlevel = "";
  contact = "";
  issuedbookid = "";

  options = ["001", "002", "003", "004", "008", "006"];

  columns = [
    {
      name: "borrowerID",
      align: "center",
      label: "Borrower ID",
      field: "borrowerID",
      sortable: true,
    },
    {
      name: "studentID",
      align: "center",
      label: "Student ID",
      field: "studentID",
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
      name: "yearlevel",
      label: "Year/Level",
      align: "center",
      field: "yearlevel",
      sortable: true,
    },
    {
      name: "contact",
      label: "Contact Number",
      align: "center",
      field: "contact",
    },
    {
      name: "issudebookid",
      label: "IssuedBook ID",
      align: "center",
      field: "issudebookid",
    },
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
  ];

  rows = [
    {
      borrowerID: "01",
      studentID: "202012567",
      name: "Annehayrah",
      middlename: "P.",
      lastname: "Racman",
      yearlevel: "3rd year ",
      contact: "09876567889",
      issudebookid: "001",
    },
    {
      borrowerID: "02",
      studentID: "20187892",
      name: "Norhani",
      middlename: "A.",
      lastname: "Ayaon",
      yearlevel: "4th year ",
      contact: "09876567889",
      issudebookid: "002",
    },
    {
      borrowerID: "03",
      studentID: "201812507",
      name: "Bella",
      middlename: "M.",
      lastname: "Sangcopan",
      yearlevel: "4yh year ",
      contact: "09876560000",
      issudebookid: "003",
    },
    {
      borrowerID: "04",
      studentID: "201812507",
      name: "Norjehan",
      middlename: "M.",
      lastname: "Alango",
      yearlevel: "4yh year ",
      contact: "09876560000",
      issudebookid: "005",
    },
    {
      borrowerID: "05",
      studentID: "202119067",
      name: "Norhanifah",
      middlename: "D.",
      lastname: "Ali",
      yearlevel: "1st year ",
      contact: "09009567889",
      issudebookid: "0011",
    },
    {
      borrowerID: "06",
      studentID: "202189067",
      name: "Anisah",
      middlename: "D.",
      lastname: "Dayaan",
      yearlevel: "4th year ",
      contact: "09889567889",
      issudebookid: "0013",
    },
    {
      borrowerID: "07",
      studentID: "20198002",
      name: "Arifah",
      middlename: "A.",
      lastname: "Abdulbasit",
      yearlevel: "4th  year ",
      contact: "09456567889",
      issudebookid: "0019",
    },
    {
      borrowerID: "11",
      studentID: "20196789",
      name: "Najmah",
      middlename: "D.",
      lastname: "Omar",
      yearlevel: "4th year ",
      contact: "09889567889",
      issudebookid: "011",
    },
  ];
}
</script>
