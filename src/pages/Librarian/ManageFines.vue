<template>
  <q-page class="bg-image">
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
          @click="addFines = true"
        />
        <q-dialog v-model="addFines" persistent>
          <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="payments" />
                </q-avatar>
                <div class="text-h6">Add Fines</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col-md-3">
                <q-select
                  outlined
                  dense
                  v-model="bookid"
                  :options="options1"
                  label="Book ID"
                />
              </div>
              <div class="col">
                <q-input dense outlined readonly label="Title" />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col-md-3">
                <q-select
                  outlined
                  dense
                  v-model="borrowerid"
                  :options="options2"
                  label="Borrower ID"
                />
              </div>
              <div class="col">
                <q-input dense outlined readonly label="Borrower Name" />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="finedate"
                  type="date"
                  readonly
                  label="Fine Date"
                />
              </div>
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="paymentamount"
                  type="date"
                  label="Payment Amount"
                />
              </div>
              <div class="col">
                <q-select
                  outlined
                  dense
                  v-model="paymentstatus"
                  :options="options3"
                  label="Payment Status"
                />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="red-10" v-close-popup />
              <q-btn flat label="Add" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!--------------------------------  Print FINES ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF FINES  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        :rows-per-page-options="[0]"
        title="List of Fines"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        selection="multiple"
        :v-model:selected="selected"
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
                <!------------------------------------- EDIT FINES BUTTON   ------------------------------------------    --->
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
                  <q-card
                    style="width: 750px; max-width: 100vw"
                    class="q-pa-md"
                  >
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

                    <q-card-section class="q-gutter-md row">
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
                          outlined
                          dense
                          v-model="bookid"
                          :options="options1"
                          label="Book ID"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                      <q-input dense outlined readonly label="Title" />
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col-md-3">
                        <q-select
                          outlined
                          dense
                          v-model="borrowerid"
                          :options="options2"
                          label="Borrower ID"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          readonly
                          label="Borrower Name"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="finedate"
                          type="date"
                          readonly
                          label="Fine Date"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="paymentamount"
                          type="date"
                          label="Payment Amount"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          outlined
                          dense
                          v-model="paymentstatus"
                          :options="options3"
                          label="Payment Status"
                        />
                      </div>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="Cancel" color="red-10" v-close-popup />
                      <q-btn flat label="Save" color="primary" v-close-popup />
                    </q-card-actions>
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

<!--------------------------------------- DETAILS OF ISSUEDBOOK    ------------------------------------------    --->
<script lang="ts">
import { Vue, Options } from "vue-class-component";
interface IRow {
  name: string;
}

Options({});
export default class ManageFines extends Vue {
  selected = [];
  tableRef = null;
  navigationActive = false;
  pagination = {};
  cancelEnabled = true;
  addFines = false;
  editRow = false;
  filter = "";
  dialog = false;

  bookfinesid = "";
  bookid = "";
  borrowerid = "";
  finedate = "";
  paymentamount = "";
  paymentstatus = "";

  options1 = ["001", "02", "003", "006", "078", "0672", "0898", "04332"];
  options2 = ["01", "02", "03", "04", "05", "06", "021", "034"];
  options3 = [" ", "Fine", "Pay", "Overdue", "Overpaid"];

  columns = [
    {
      name: "bookfinesid",
      align: "center",
      label: "BookFines ID",
      field: "bookfinesid",
      sortable: true,
    },
    {
      name: "bookID",
      align: "center",
      label: "Book ID",
      field: "bookID",
      sortable: true,
    },
    {
      name: "borrowerID",
      align: "center",
      label: "Borrower ID",
      field: "borrowerID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "Fine Date",
      align: "center",
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "paymentamount",
      label: "Payment Amount",
      align: "center",
      field: "paymentamount",
    },
    {
      name: "paymentstatus ",
      label: "Payment Status",
      align: "center",
      field: "paymentstatus",
    },
  ];

  rows = [
    {
      bookfinesid: "001",
      bookID: "01",
      borrowerID: "01",
      name: "03-04-21",
      paymentamount: "P5.00 ",
      paymentstatus: "Pay",
    },
    {
      bookfinesid: "003",
      bookID: "02",
      borrowerID: "02",
      name: "05-23-21",
      paymentamount: "P10.00",
      paymentstatus: "Pay ",
    },
    {
      bookfinesid: "005",
      bookID: "03",
      borrowerID: "03",
      name: "05-24-21",
      paymentamount: "P100.00",
      paymentstatus: "Fine",
    },
    {
      bookfinesid: "006",
      bookID: "04",
      borrowerID: "06",
      name: "07-20-21",
      paymentamount: "P0.00",
      paymentstatus: " ",
    },
    {
      bookfinesid: "007",
      bookID: "06",
      borrowerID: "11",
      name: "07-29-21",
      paymentamount: "P0.00",
      paymentstatus: " ",
    },
    {
      bookfinesid: "008",
      bookID: "08",
      borrowerID: "07",
      name: "08-03-21",
      paymentamount: "P10.00",
      paymentstatus: "Overdue",
    },
  ];
}
</script>
