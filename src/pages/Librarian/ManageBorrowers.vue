<template>
  <q-page class="bg-image1">
    <div class="text-h4 text-teal-9 q-pb-lg q-pt-lg text-bold flex flex-center">
      <q-icon
        class="q-pr-sm"
        name="people"
        color="teal-9"
        style="font-size: 3rem"
      />
      Manage Borrowers
    </div>
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_BORROWER ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-teal-9 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW BORROWER BUTTON  ------------------------------------------    --->
        <q-tab
          name="borrower"
          icon="person_add"
          label="Add Borrower"
          @click="addNewBorrower = true"
        />
        <q-dialog v-model="addNewBorrower" persistent>
          <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row q-pa-md">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="person" />
                </q-avatar>
                <div class="text-h6">Add New Borrower</div>
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
              <q-form @submit="onaddBorrower()" class="q-px-sm">
                <div class="q-gutter-md q-pb-md">
                  <div class="col">
                    <q-input
                      autofocus
                      dense
                      outlined
                      v-model="inputBorrower.Student_ID"
                      label="Student ID"
                      mask="#########"
                      hint="Format: 200000000"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the Student ID',
                      ]"
                    />
                  </div>
                </div>

                <div class="q-gutter-md row q-pb-md">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBorrower.B_First_Name"
                      label="First Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the first name',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBorrower.B_Middle_Name"
                      label="Middle Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the middle name',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBorrower.B_Last_Name"
                      label="Last Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the last name',
                      ]"
                    />
                  </div>
                </div>

                <div class="q-gutter-md row q-pb-md">
                  <div class="col">
                    <q-select
                      dense
                      outlined
                      :options="options1"
                      v-model="inputBorrower.YearLevel"
                      label="Year/Level"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the year/level',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBorrower.B_Contact_Number"
                      label="Contact Number"
                      mask="(####) ### - ####"
                      hint="Format: (0963) 135 - 8292"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the contact number',
                      ]"
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
                  <q-btn flat label="Save" color="primary" type="submit" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!--------------------------------  Export CSV _ BORROWERS ------------------------------------------    --->
        <q-tab
          name="Export"
          icon="archive"
          label="Export to csv"
          @click="exportTable"
        />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE _ LIST OF BORROWERS  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="Borrower List"
        :rows="allBorrower"
        :columns="columns"
        row-key="name"
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
                @click="openEditDialog(props.row)"
                ><q-tooltip class="bg-teal-7" :offset="[10, 10]">
                  Edit
                </q-tooltip></q-btn
              >
              <q-dialog v-model="editRowBorrower" persistent>
                <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row q-pa-md">
                    <q-toolbar>
                      <q-avatar size="50px">
                        <q-icon name="person" />
                      </q-avatar>
                      <div class="text-h6">Edit Borrower</div>
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
                    <q-form @submit="oneditBorrower()">
                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            readonly
                            label="Borrower ID"
                            v-model="inputBorrower.Borrower_ID"
                          />
                        </div>

                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBorrower.Student_ID"
                            label="Student ID"
                            lazy-rules
                            mask="#### - #####"
                            hint="Format: 0000 - 00000"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the Student ID',
                            ]"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBorrower.B_First_Name"
                            label="First Name"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the first name',
                            ]"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBorrower.B_Middle_Name"
                            label="Middle Name"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the middle name',
                            ]"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBorrower.B_Last_Name"
                            label="Last Name"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the last name',
                            ]"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-select
                            dense
                            outlined
                            :options="options1"
                            v-model="inputBorrower.YearLevel"
                            label="Year/Level"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the year/level',
                            ]"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBorrower.B_Contact_Number"
                            label="Contact Number"
                            mask="(###) #### - #####"
                            hint="Format: (639) 6312 - 58292"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the contact number',
                            ]"
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
              <!--------------------------------------- DELETE BORROWER BUTTON   ------------------------------------------    --->
              <q-btn
                color="red-8"
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                round
                dense
                @click="deleteSpecificBorrower(props.row)"
                ><q-tooltip class="bg-red-10" :offset="[10, 10]">
                  Delete
                </q-tooltip></q-btn
              >
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { exportFile } from "quasar";
import { BorrowerDto } from "src/services/rest-api";
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
    ...mapState("borrower", ["allBorrower"]),
  },
  methods: {
    ...mapActions("borrower", [
      "addBorrower",
      "editBorrower",
      "deleteBorrower",
      "getAllBorrower",
    ]),
  },
})
export default class ManageBorrowers extends Vue {
  allBorrower!: BorrowerDto[];

  addBorrower!: (payload: BorrowerDto) => Promise<void>;
  editBorrower!: (payload: BorrowerDto) => Promise<void>;
  deleteBorrower!: (payload: BorrowerDto) => Promise<void>;
  getAllBorrower!: () => Promise<void>;

  async mounted() {
    await this.getAllBorrower();
  }

  pagination = {};
  cancelEnabled = true;
  addNewBorrower = false;
  editRowBorrower = false;
  filter = "";
  dialog = false;
  BorrowerDetails = "";

  options1 = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  columns = [
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
    {
      name: "borrowerID",
      align: "center",
      label: "Borrower ID",
      field: "Borrower_ID",
      sortable: true,
    },
    {
      name: "studentID",
      align: "left",
      label: "Student ID",
      field: "Student_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "First Name",
      align: "left",
      field: (row: BorrowerDto) => row.B_First_Name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "middlename ",
      label: "Middle name",
      align: "left",
      field: "B_Middle_Name",
    },
    {
      name: "lastname",
      label: "Last Name",
      align: "left",
      field: "B_Last_Name",
      sortable: true,
    },
    {
      name: "yearlevel",
      label: "Year/Level",
      align: "left",
      field: "YearLevel",
      sortable: true,
    },
    {
      name: "contact",
      label: "Contact Number",
      align: "left",
      field: "B_Contact_Number",
    },
  ];

  //----------------------------- E X P O R T TABLE-------------------------------------
  exportTable() {
    // naive encoding to csv format
    const header = [
      wrapCsvValue("Borrower ID"),
      wrapCsvValue("Student ID"),
      wrapCsvValue("First Name"),
      wrapCsvValue("Middle Name"),
      wrapCsvValue("Last Name"),
      wrapCsvValue("Year/Level"),
      wrapCsvValue("Contact number"),
    ];
    const rows = [header.join(",")].concat(
      this.allBorrower.map((c) =>
        [
          wrapCsvValue(String(c.Borrower_ID)),
          wrapCsvValue(c.Student_ID),
          wrapCsvValue(c.B_First_Name),
          wrapCsvValue(String(c.B_Middle_Name)),
          wrapCsvValue(c.B_Last_Name),
          wrapCsvValue(c.YearLevel),
          wrapCsvValue(c.B_Contact_Number),
        ].join(",")
      )
    );

    const status = exportFile(
      "List of Borrowers_MSU ISED LIBRARY-export.csv",
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

  inputBorrower: BorrowerDto = {
    Student_ID: "",
    B_First_Name: "",
    B_Middle_Name: "",
    B_Last_Name: "",
    YearLevel: "",
    B_Contact_Number: "",
  };

  async onaddBorrower() {
    await this.addBorrower(this.inputBorrower);
    this.addNewBorrower = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
  }

  async oneditBorrower() {
    await this.editBorrower(this.inputBorrower);
    this.editRowBorrower = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Edit.",
    });
  }

  deleteSpecificBorrower(val: BorrowerDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteBorrower(val.Borrower_ID as any);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: BorrowerDto) {
    this.editRowBorrower = true;
    this.inputBorrower = { ...val };
  }

  resetModel() {
    this.inputBorrower = {
      Student_ID: "",
      B_First_Name: "",
      B_Middle_Name: "",
      B_Last_Name: "",
      YearLevel: "",
      B_Contact_Number: "",
    };
  }
}
</script>
