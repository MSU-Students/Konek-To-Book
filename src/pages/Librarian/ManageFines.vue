<template>
  <q-page class="bg-image1">
    <div class="text-h4 text-teal-9 q-pb-lg q-pt-lg text-bold flex flex-center">
      <q-icon
        class="q-pr-sm"
        name="payments"
        color="teal-9"
        style="font-size: 3rem"
      />
      Manage Fines
    </div>
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_FINES------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-teal-9 text-white shadow-2"
      >
        <!-------------------------------- VIEW TABLE ------------------------------------------    --->
        <q-tab
          label="View Table"
          color="teal-9"
          icon="view_list"
          @click="viewTable = !viewTable"
        />
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
                <div class="q-gutter-md row q-pb-md">
                  <div class="col-md-3">
                    <q-select
                      autofocus
                      outlined
                      dense
                      label="Book_ID"
                      :options="options"
                      option-label="Book_ID"
                      optine-value="Book_ID"
                      map-options
                      emit-value
                      @update:model-value="onSelectBook($event)"
                      @filter="filterFn"
                      use-input
                      v-model="inputBookFines.book"
                      lazy-rules
                      :rules="[(val) => val || 'Select Book ID']"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBookFines.Title"
                      readonly
                      label="Title"
                    />
                  </div>
                </div>
                <div class="q-gutter-md row q-pb-md">
                  <div class="col-md-3">
                    <q-select
                      dense
                      outlined
                      label="Borrower ID"
                      :options="OptionBorrow"
                      option-label="Borrower_ID"
                      option-value="Borrower_ID"
                      map-options
                      emit-value
                      @update:model-value="onSelectBorrower($event)"
                      @filter="filtering"
                      use-input
                      v-model="inputBookFines.borrower"
                      lazy-rules
                      :rules="[(val) => val || 'Select Borrower ID']"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      optine-value="B_First_Name"
                      v-model="inputBookFines.Borrower_Name"
                      readonly
                      label="Borrower Name"
                    />
                  </div>
                </div>

                <div class="q-gutter-md row q-pb-md">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBookFines.Fine_Date"
                      type="date"
                      hint="Fine Date"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the fine date',
                      ]"
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
                      input-class="text-right"
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
                      :options="options1"
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
        <!--------------------------------  Export CSV _ FINES ------------------------------------------    --->
        <q-tab
          name="Export"
          icon="archive"
          label="Export"
          @click="exportTable"
        />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF FINES  ------------------------------------------    --->
    <div v-show="viewTable" class="q-ma-md">
      <q-table
        title="Fine List"
        :rows="allBookFines"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <div>
            <q-fab
              color="teal-9"
              icon="sort"
              direction="left"
              label="Filter by:"
              label-position="top"
              external-label
              padding="xs"
            >
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = 'Fines'"
                label="Fines"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = 'Overdue'"
                label="Overdue"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = 'Paid'"
                label="Paid"
              />

              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = ''"
                icon="clear"
              />
            </q-fab>
          </div>
          <div class="q-pa-md">
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

        <template #body-cell-paymentstatus="props">
          <q-td :props="props">
            <q-chip
              flat
              color="white"
              :text-color="colorManipulation(props.row.Payment_Status)"
              :label="labelManipulation(props.row.Payment_Status)"
            >
            </q-chip>
          </q-td>
        </template>

        <!------------------------------------- EDIT FINES BUTTON   ------------------------------------------    --->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <!-- <q-btn
                round
                color="teal-8"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowFines" persistent>
                <q-card style="width: 850px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <q-toolbar>
                      <q-avatar size="50px">
                        <q-icon name="payments" />
                      </q-avatar>
                      <div class="text-h6">Edit Fines</div>
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
                    <q-form @submit="oneditBookFines()" class="q-px-md">
                      <div class="q-gutter-md row q-pb-md">
                        <div class="col-md-2">
                          <q-input
                            dense
                            outlined
                            readonly
                            label="IssuedBook ID"
                            v-model="inputBookFines.BookFines_ID"
                          />
                        </div>
                        <div class="col-md-3">
                          <q-select
                            autofocus
                            outlined
                            dense
                            label="Book_ID"
                            :options="allBook"
                            option-label="Book_ID"
                            optine-value="Book_ID"
                            map-options
                            emit-value
                            @update:model-value="onSelectBook"
                            v-model="inputBookFines.book"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBookFines.Title"
                            readonly
                            label="Title"
                          />
                        </div>
                      </div>
                      <div class="q-gutter-md row q-pb-md">
                        <div class="col-md-3">
                          <q-select
                            dense
                            outlined
                            label="Borrower ID"
                            :options="allBorrower"
                            option-label="Borrower_ID"
                            map-options
                            emit-value
                            @update:model-value="onSelectBorrower"
                            v-model="inputBookFines.borrower"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            optine-value="B_First_Name"
                            v-model="inputBookFines.Borrower_Name"
                            readonly
                            label="Borrower Name"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            readonly
                            outlined
                            v-model="inputBookFines.Fine_Date"
                            hint="Fine Date"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            readonly
                            v-model="inputBookFines.Payment_Amount"
                            label="Payment Amount"
                            prefix="₱"
                            mask="#.##"
                            fill-mask="0"
                            reverse-fill-mask
                            input-class="text-right"
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
                            :options="options1"
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
                          @click="resetModel()"
                          v-close-popup
                        />
                        <q-btn
                          flat
                          label="Save"
                          v-close-popup
                          color="primary"
                          type="submit"
                        />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog> -->

              <!-------------------------    DETAILS BOOK Button --------------------------------------------------->
              <q-btn
                round
                color="teal-6"
                icon="more_vert"
                size="md"
                flat
                dense
                @click="openDialog(props.row)"
                ><q-tooltip class="bg-teal-7" :offset="[10, 10]">
                  Details
                </q-tooltip></q-btn
              >

              <q-dialog v-model="Details">
                <q-card style="width: 600px; max-width: 100vw" my-card>
                  <q-card-section class="bg-grey-1">
                    <div>{{ inputBookFines.BookFines_ID }}</div>
                    <div class="text-h7 text-center">
                      <strong>Book Title: </strong>
                      {{ inputBookFines.Title }}
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="bg-grey-1">
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong> Borrower Name: </strong>
                      {{ inputBookFines.Borrower_Name }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong>Fine Date: </strong>
                      {{ inputBookFines.Fine_Date }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong>Payment Amount: ₱ </strong>
                      {{ inputBookFines.Payment_Amount }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong>Payment Status: </strong>
                      {{ inputBookFines.Payment_Status }}
                    </div>
                  </q-card-section>

                  <q-card-section
                    class="bg-primary text-center text-caption text-white"
                  >
                    Mindanao State University - Marawi City
                  </q-card-section>
                </q-card>
              </q-dialog>
              <!--------------------------------------- Payment_Status BUTTON   ------------------------------------------    --->
              <q-btn
                round
                color="teal-8"
                icon="done_all"
                size="sm"
                flat
                dense
                @click="openPaymentStatus(props.row)"
                ><q-tooltip class="bg-teal-7" :offset="[10, 10]">
                  Payment Status
                </q-tooltip></q-btn
              >

              <q-dialog v-model="paymentStatus">
                <q-card style="width: 400px" class="q-ma-sm">
                  <q-card-section class="text-h8">
                    Payment Status
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="flex flex-center q-pt-none">
                    <q-form @submit="oneditBookFines()">
                      <div>
                        <q-radio
                          v-model="inputBookFines.Payment_Status"
                          val="Fines"
                          label="Fines"
                          color="Primary"
                          size="lg"
                        />
                        <q-radio
                          v-model="inputBookFines.Payment_Status"
                          val="Paid"
                          label="Paid"
                          color="secondary"
                          size="lg"
                        />
                        <q-radio
                          v-model="inputBookFines.Payment_Status"
                          val="Overdue"
                          label="Overdue"
                          color="red"
                          size="lg"
                        />
                      </div>
                      <div class="q-gutter-md q-pt-lg" align="right">
                        <q-btn
                          label="Cancel"
                          color="red"
                          v-close-popup
                          @click="resetModel()"
                        />
                        <q-btn label="Done" color="primary" type="submit" />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>
      </q-table>
      <!--------------------------------------- Paid Table   ------------------------------------------    --->
      <div class="q-py-lg row q-gutter-md">
        <div class="col">
          <q-card style="height: 300px">
            <q-layout container style="height: 300px">
              <q-list style="max-height: 300px" class="rounded-borders">
                <q-item-label header>Paid</q-item-label>

                <q-item v-for="data in paidBook" v-bind:key="data.Title">
                  <q-item-section avatar top>
                    <q-icon name="credit_score" color="green" size="34px" />
                  </q-item-section>

                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">
                      {{ data.Borrower_Name }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label lines="1">
                      <span class="text-weight-medium"> {{ data.Title }} </span>
                    </q-item-label>

                    <q-item-label caption lines="1"> Book Title </q-item-label>
                  </q-item-section>

                  <q-item-section top side>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">Payment Amount: ₱ </span>
                      <span class="text-grey-8">
                        {{ data.Payment_Amount }}</span
                      >
                    </q-item-label>
                    <q-item-label caption lines="1">
                      Fine Date : {{ data.Fine_Date }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced />
              </q-list>
            </q-layout>
          </q-card>
        </div>

        <!--------------------------------------- OVERDUE Book Table   ------------------------------------------    --->
        <div class="col">
          <q-card style="height: 300px">
            <q-layout container style="height: 300px">
              <q-list bordered class="rounded-borders">
                <q-item-label header>Overdue</q-item-label>

                <q-item
                  v-for="data in overdueBook"
                  v-bind:key="data.Borrower_Name"
                >
                  <q-item-section avatar top>
                    <q-icon name="price_change" color="red" size="34px" />
                  </q-item-section>

                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">
                      {{ data.Borrower_Name }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label lines="1">
                      <span class="text-weight-medium"> {{ data.Title }} </span>
                    </q-item-label>

                    <q-item-label caption lines="1"> Book Title </q-item-label>
                  </q-item-section>

                  <q-item-section top side>
                    <q-item-label lines="1">
                      <span class="text-weight-medium"
                        >Payment Amount : ₱
                      </span>
                      <span class="text-grey-8">
                        {{ data.Payment_Amount }}</span
                      >
                    </q-item-label>
                    <q-item-label caption lines="1">
                      Fine Date : {{ data.Fine_Date }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-layout>
          </q-card>
        </div>
      </div>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="orange-9" text-color="white" />
    </q-page-scroller>
  </q-page>
</template>

<!--------------------------------------- DETAILS OF ISSUEDBOOK    ------------------------------------------    --->
<script lang="ts">
import { exportFile } from "quasar";
import { BookDto, BookFinesDto, BorrowerDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapGetters, mapState } from "vuex";

//---------------------------------------- FUNCTION FOR EXPORT CSV----------
function wrapCsvValue(
  val: string,
  formatFn?: (v: string, r: any) => string,
  row?: any
) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

//-------------------------------------------------------------------------

@Options({
  computed: {
    ...mapState("bookfines", ["allBookFines"]),
    ...mapState("book", ["allBook"]),
    ...mapState("borrower", ["allBorrower"]),

    ...mapGetters("bookfines", ["paidBook", "finesBook", "overdueBook"]),
  },
  methods: {
    ...mapActions("bookfines", [
      "addBookFines",
      "editBookFines",
      "deleteBookFines",
      "getAllBookFines",
    ]),
  },
})
export default class ManageFines extends Vue {
  allBookFines!: BookFinesDto[];
  allBook!: BookDto[];
  allBorrower!: BorrowerDto[];

  paidBook!: BookFinesDto[];
  overdueBook!: BookFinesDto[];
  finesBook!: BookFinesDto[];

  options: BookDto[] = [];
  OptionBorrow: BorrowerDto[] = [];

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
  paymentStatus = false;
  filter = "";
  dialog = false;
  Details = false;
  viewTable = false;

  options1 = ["Fines", "Paid", "Overdue"];

  columns = [
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
    {
      name: "bookfinesid",
      align: "center",
      label: "BookFines ID",
      field: "BookFines_ID",
      sortable: true,
    },
    {
      name: "borrowername",
      label: "Borrower Name",
      align: "left",
      field: (row: BookFinesDto) => row.Borrower_Name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "borrowdate",
      label: "Fine Date",
      align: "left",
      field: "Fine_Date",
    },
    {
      name: "paymentamount",
      label: "Payment Amount",
      align: "center",
      field: (row: BookFinesDto) => "₱ " + row.Payment_Amount,
    },
    {
      name: "paymentstatus",
      label: "Payment Status",
      align: "center",
      field: "Payment_Status",
    },
  ];

  // ----------------------------- E X P O R T TABLE-------------------------------------
  exportTable() {
    // naive encoding to csv format
    const header = [
      wrapCsvValue("BookFines ID"),
      wrapCsvValue("Title"),
      wrapCsvValue("Borrower Name"),
      wrapCsvValue("Fine Date"),
      wrapCsvValue("Payment Amount"),
      wrapCsvValue("Payment Status"),
    ];
    const rows = [header.join(",")].concat(
      this.allBookFines.map((c) =>
        [
          wrapCsvValue(String(c.BookFines_ID)),
          wrapCsvValue(c.Title),
          wrapCsvValue(c.Borrower_Name),
          wrapCsvValue(c.Fine_Date),
          wrapCsvValue(c.Payment_Amount),
          wrapCsvValue(c.Payment_Status),
        ].join(",")
      )
    );

    const status = exportFile(
      "List of Book Fines_ MSU ISED LIBRARY-export.csv",
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

  // --------------------------------------------------------------------------

  inputBookFines: any = {
    Title: "",
    Borrower_Name: "",
    Fine_Date: "",
    Payment_Amount: "",
    Payment_Status: "Fines",
  };

  onSelectBook(book: any) {
    this.inputBookFines.Title = this.allBook.find(
      (i) => i.Book_ID === book
    )?.Title;
  }

  onSelectBorrower(borrower: any) {
    this.inputBookFines.Borrower_Name =
      this.allBorrower.find((s) => s.Borrower_ID === borrower)?.B_First_Name +
      " " +
      this.allBorrower.find((s) => s.Borrower_ID === borrower)?.B_Last_Name;
  }

  filterFn(val: any, update: any) {
    if (val === "") {
      update(() => {
        this.options = this.allBook.map(
          (i) => i.Book_ID
        ) as unknown as BookDto[];
      });
      return;
    }

    update(() => {
      const needle = val.toLowerCase();
      this.options = this.allBook
        .filter((v) => String(v.Book_ID).toLowerCase().indexOf(needle) > -1)
        .map((i) => i.Book_ID) as unknown as BookDto[];
    });
  }
  filtering(val: any, update: any) {
    if (val === "") {
      update(() => {
        this.OptionBorrow = this.allBorrower.map(
          (i) => i.Borrower_ID
        ) as unknown as BorrowerDto[];
      });
      return;
    }
    update(() => {
      const needle = val.toLowerCase();
      this.OptionBorrow = this.allBorrower
        .filter((v) => String(v.Borrower_ID).toLowerCase().indexOf(needle) > -1)
        .map((s) => s.Borrower_ID) as unknown as BorrowerDto[];
    });
  }

  openDialog(val: BookFinesDto) {
    this.Details = true;
    this.inputBookFines = { ...val };
  }

  // openEditDialog(val: BookFinesDto) {
  //   this.editRowFines = true;
  //   this.inputBookFines = { ...val };
  // }

  openPaymentStatus(val: BookFinesDto) {
    this.paymentStatus = true;
    this.inputBookFines = { ...val };
  }
  async onaddBookFines() {
    await this.addBookFines(this.inputBookFines);
    this.addNewFines = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
  }

  async oneditBookFines() {
    await this.editBookFines(this.inputBookFines);
    this.paymentStatus = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Update",
    });
  }

  // deleteSpecificBookFines(val: BookFinesDto) {
  //   this.$q
  //     .dialog({
  //       message: "Confirm to delete?",
  //       cancel: true,
  //       persistent: true,
  //     })
  //     .onOk(async () => {
  //       await this.deleteBookFines(val.BookFines_ID as any);
  //       this.$q.notify({
  //         type: "warning",
  //         message: "Successfully removed",
  //       });
  //     });
  // }

  resetModel() {
    this.inputBookFines = {
      Title: "",
      Borrower_Name: "",
      Fine_Date: "",
      Payment_Amount: "",
      Payment_Status: "",
    };
  }

  colorManipulation(Payment_Status: string) {
    if (Payment_Status === "Fines") {
      return "warning";
    }
    if (Payment_Status === "Paid") {
      return "positive";
    }
    if (Payment_Status === "Overdue") {
      return "negative";
    }
  }
  labelManipulation(Payment_Status: string) {
    if (Payment_Status === "Fines") {
      return "Fines";
    }
    if (Payment_Status === "Paid") {
      return "Paid";
    }
    if (Payment_Status === "Overdue") {
      return "Overdue";
    }
  }
}
</script>
