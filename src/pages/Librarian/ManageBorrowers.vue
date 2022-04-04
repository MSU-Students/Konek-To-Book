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
          @click="addNewBorrower = true"
        />
        <q-dialog v-model="addNewBorrower" persistent>
          <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row">
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
              <q-form @submit="onaddBorrower()" class="q-px-md">
                <div class="q-gutter-md q-pb-md">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBorrower.Student_ID"
                      label="Student ID"
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
                    <q-input
                      dense
                      outlined
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
                      mask="(###) #### - #####"
                      hint="Format: (639) 6312 - 58292"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the contact number',
                      ]"
                    />
                  </div>
                  <!--- <q-input
                        dense
                        outlined
                        v-model="inputBorrower.IssuedBook_ID"
                        label="IssuedBookID"
                      />
                    </div>
                    ---->
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
        <!--------------------------------  Print BORROWER ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE _ LIST OF BORROWERS  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of Borrowers"
        :rows="allBorrower"
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
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowBorrower" persistent>
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

                  <q-card-section>
                    <q-form @submit="oneditBorrower()" class="q-px-md">
                      <div class="q-gutter-md q-pb-md">
                        <!---
                      <div class="col">
                        <q-input
                            dense
                            outlined
                            readonly
                            v-model="inputBorrower.IssuedBook_ID"
                            label="IssuedBookID"
                          />
                        </div>
                    ---->
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBorrower.Student_ID"
                            label="Student ID"
                            lazy-rules
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
                          <q-input
                            dense
                            outlined
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
                        <!---    <div class="col">
                            <q-input
                            dense
                            outlined
                            v-model="inputBorrower.IssuedBook_ID"
                            label="IssuedBookID"
                          />


                    ---->
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
                      @click="resetModel()"
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
import { BorrowerDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";
@Options({
  computed: {
    ...mapState("borrower", ["allborrower"]),
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

  options = ["001", "002", "003", "004", "008", "006"];

  columns = [
    {
      name: "borrowerID",
      align: "center",
      label: "Borrower ID",
      field: "Borrower_ID",
      sortable: true,
    },
    {
      name: "studentID",
      align: "center",
      label: "Student ID",
      field: "Student_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "First Name",
      align: "center",
      field: (row: BorrowerDto) => row.B_First_Name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "middlename ",
      label: "Middle name",
      align: "center",
      field: "B_Middle_Name",
    },
    {
      name: "lastname",
      label: "Last Name",
      align: "center",
      field: "B_Last_Name",
      sortable: true,
    },
    {
      name: "yearlevel",
      label: "Year/Level",
      align: "center",
      field: "YearLevel",
      sortable: true,
    },
    {
      name: "contact",
      label: "Contact Number",
      align: "center",
      field: "B_Contact_Number",
    },
    {
      name: "issudebookid",
      label: "IssuedBook ID",
      align: "center",
      field: "IssuedBook_ID",
    },
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
  ];

  inputBorrower: BorrowerDto = {
    Student_ID: "",
    B_First_Name: "",
    B_Middle_Name: "",
    B_Last_Name: "",
    YearLevel: "",
    B_Contact_Number: "",
    //IssuedBook_ID: "",
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
        await this.deleteBorrower(val);
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
      //IssuedBook_ID: "",
    };
  }
}
</script>
