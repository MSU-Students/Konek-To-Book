<template>
  <q-page class="bg-image1">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_FINES------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-light-green-8 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW FINES BUTTON  ------------------------------------------    --->
        <q-tab
          name="fines"
          icon="person_add"
          label="Add New"
          @click="addNewFines = true"
        />
        <q-dialog v-model="addNewFines" persistent>
          <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="payments" />
                </q-avatar>
                <div class="text-h6">Add Fines</div>
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
              <q-form @submit="onaddBookFines()" class="q-px-md">
                <!---
                <div class="q-gutter-md row q-pb-md">
                  <div class="col-md-3">
                    <q-select
                      autofocus
                      outlined
                      dense
                      v-model="inputBookFines.Book_ID"
                      :options="options1"
                      label="Book ID"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Select the Book ID',
                      ]"
                    />
                  </div>

                  <div class="col">
                    <q-input dense outlined readonly  label="Title" />
                  </div>
                </div>

                <div class="q-gutter-md row q-pb-md">
                  <div class="col-md-3">
                     <q-select
                        outlined
                        dense
                        v-model="inputBookFines.Borrower_ID"
                        :options="options2"
                        label="Borrower ID"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Select the Borrower ID',
                        ]"
                      />
                    </div>
                    <div class="col">
                      <q-input dense outlined readonly label="Borrower Name" />
                    </div>
                      </div>
  --->

                <div class="q-gutter-md row q-pb-md">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBookFines.Fine_Date"
                      readonly
                      hint="Fine Date"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBookFines.Payment_Amount"
                      label="Payment Amount"
                      prefix="₱"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Select the payment amount',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-select
                      outlined
                      dense
                      v-model="inputBookFines.Payment_Status"
                      :options="options3"
                      label="Payment Status"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Select the payment status',
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
        <!--------------------------------  Print FINES ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF FINES  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of Fines"
        :rows="allBookFines"
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
        <!------------------------------------- EDIT FINES BUTTON   ------------------------------------------    --->
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
              <q-dialog v-model="editRowFines" persistent>
                <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <q-toolbar>
                      <q-avatar size="50px">
                        <q-icon name="payments" />
                      </q-avatar>
                      <div class="text-h6">Edit Fines</div>
                      <q-space />
                      <q-btn flat round dense icon="close" v-close-popup />
                    </q-toolbar>
                  </q-card-section>

                  <q-card-section>
                    <q-form @submit="oneditBookFines()" class="q-px-md">
                      <!---
                 <div class="q-gutter-md row q-pb-md">
                      <div class="col">
                      <q-input
                        dense
                        outlined
                        v-model="bookfinesid"
                        readonly
                        label="BookFines ID"
                      />
                    </div>

                  <div class="col">
                    <q-select
                      autofocus
                      outlined
                      dense
                      v-model="inputBookFines.Book_ID"
                      :options="options1"
                      label="Book ID"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Select the Book ID',
                      ]"
                    />
                  </div>
                </div>

                  <div class="q-gutter-md row q-pb-md">
                    <q-input dense outlined readonly  label="Title" />
                  </div>

                <div class="q-gutter-md row q-pb-md">
                  <div class="col-md-3">
                     <q-select
                        outlined
                        dense
                        v-model="inputBookFines.Borrower_ID"
                        :options="options2"
                        label="Borrower ID"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Select the Borrower ID',
                        ]"
                      />
                    </div>
                    <div class="col">
                      <q-input dense outlined readonly label="Borrower Name" />
                    </div>
                      </div>
  --->

                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBookFines.Fine_Date"
                            readonly
                            hint="Fine Date"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBookFines.Payment_Amount"
                            hint="Payment Amount"
                            prefix="₱"
                            mask="#.##"
                            fill-mask="0"
                            reverse-fill-mask
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Select the payment amount',
                            ]"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="inputBookFines.Payment_Status"
                            :options="options3"
                            label="Payment Status"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Select the payment status',
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
              <!--------------------------------------- DELETE FINES BUTTON   ------------------------------------------    --->
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

<!--------------------------------------- DETAILS OF ISSUEDBOOK    ------------------------------------------    --->
<script lang="ts">
import { BookFinesDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  computed: {
    ...mapState("book-fines", ["allBookFines"]),
  },
  methods: {
    ...mapActions("book-fines", [
      "addBookFines",
      "editBookFines",
      "deleteBookFines",
      "getAllBookFines",
    ]),
  },
})
export default class ManageFines extends Vue {
  allBookFines!: BookFinesDto[];
  addBookFines!: (payload: BookFinesDto) => Promise<void>;
  editBookFines!: (payload: BookFinesDto) => Promise<void>;
  deleteBookFines!: (payload: BookFinesDto) => Promise<void>;
  getAllBookFines!: () => Promise<void>;

  async mounted() {
    await this.getAllBookFines();
  }

  pagination = {};
  cancelEnabled = true;
  addNewFines = false;
  editRowFines = false;
  filter = "";
  dialog = false;

  options1 = ["001", "02", "003", "006", "078", "0672", "0898", "04332"];
  options2 = ["01", "02", "03", "04", "05", "06", "021", "034"];
  options3 = [" ", "Fine", "Pay", "Overdue", "Overpaid"];

  columns = [
    {
      name: "bookfinesid",
      align: "center",
      label: "BookFines ID",
      field: "BookFines_ID",
      sortable: true,
    },
    {
      name: "bookID",
      align: "center",
      label: "Book ID",
      field: "Book_ID",
      sortable: true,
    },
    {
      name: "borrowerID",
      align: "center",
      label: "Borrower ID",
      field: "Borrower_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "Fine Date",
      align: "center",
      field: (row: BookFinesDto) => row.Fine_Date,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "paymentamount",
      label: "Payment Amount",
      align: "center",
      field: "Payment_Amount",
    },
    {
      name: "paymentstatus ",
      label: "Payment Status",
      align: "center",
      field: "Payment_Status",
    },
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
  ];

  inputBookFines: BookFinesDto = {
    // BookFines_ID: "",
    // Book_ID: "",
    // Borrower_ID: "",
    Fine_Date: "",
    Payment_Amount: "",
    Payment_Status: "",
  };

  async onaddBookFines() {
    await this.addBookFines(this.inputBookFines);
    this.addNewFines = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
    debugger;
  }

  async oneditBookFines() {
    await this.editBookFines(this.inputBookFines);
    this.editRowFines = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Update",
    });
  }

  deleteSpecificBookFines(val: BookFinesDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteBookFines(val);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: BookFinesDto) {
    this.editRowFines = true;
    this.inputBookFines = { ...val };
  }

  resetModel() {
    this.inputBookFines = {
      // BookFines_ID: "",
      // Book_ID: "",
      // Borrower_ID: "",
      Fine_Date: "",
      Payment_Amount: "",
      Payment_Status: "",
    };
  }
}
</script>
