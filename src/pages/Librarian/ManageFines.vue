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
                <div class="q-gutter-md row q-pb-md">
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
                      :options="allBorrower"
                      option-label="Borrower_ID"
                      map-options
                      emit-value
                      @update:model-value="onSelectBorrower"
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
        <q-tab name="Export" icon="archive" label="Export to csv" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF FINES  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of Fines"
        :rows="finesBook"
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
                @click="deleteSpecificBookFines(props.row)"
              />

              <!--------------------------------------- Payment_Status BUTTON   ------------------------------------------    --->
              <q-btn
                round
                color="green"
                icon="done_all"
                size="sm"
                flat
                dense
                @click="openPaymentStatus(props.row)"
              />

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
                    <q-icon name="pending_actions" color="green" size="34px" />
                  </q-item-section>

                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">
                      {{ data.Borrower_Name }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">Book Title : </span>
                      <span class="text-grey-8"> {{ data.Title }}</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section top side>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">Payment Amount:</span>
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
                    <q-icon name="assignment_return" color="red" size="34px" />
                  </q-item-section>

                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">
                      {{ data.Borrower_Name }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">Book Title : </span>
                      <span class="text-grey-8"> {{ data.Title }}</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section top side>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">Payment Amount :</span>
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
  </q-page>
</template>

<!--------------------------------------- DETAILS OF ISSUEDBOOK    ------------------------------------------    --->
<script lang="ts">
import { BookDto, BookFinesDto, BorrowerDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapGetters, mapState } from "vuex";

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

  addBookFines!: (payload: BookFinesDto) => Promise<void>;
  editBookFines!: (payload: BookFinesDto) => Promise<void>;
  deleteBookFines!: (payload: BookFinesDto) => Promise<void>;
  getAllBookFines!: () => Promise<void>;

  async mounted() {
    await this.getAllBookFines();
    console.log(this.allBookFines);
  }

  pagination = {};
  cancelEnabled = true;
  addNewFines = false;
  editRowFines = false;
  paymentStatus = false;
  filter = "";
  dialog = false;

  options1 = ["Fines", "Paid", "Overdue", "Overpaid"];

  columns = [
    {
      name: "bookfinesid",
      align: "center",
      label: "BookFines ID",
      field: "BookFines_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "Title",
      align: "center",
      field: (row: BookFinesDto) => row.Title,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "borrowername",
      label: "Borrower Name",
      align: "center",
      field: "Borrower_Name",
      sortable: true,
    },
    {
      name: "borrowdate",
      label: "Fine Date",
      align: "center",
      field: "Fine_Date",
    },
    {
      name: "paymentamount",
      label: "Payment Amount",
      align: "center",
      field: "Payment_Amount",
    },
    {
      name: "statusPayment ",
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
    Title: "",
    Borrower_Name: "",
    Fine_Date: "",
    Payment_Amount: "",
    Payment_Status: "Fines",
  };

  onSelectBook(book: any) {
    this.inputBookFines.Title = book.Title;
  }

  onSelectBorrower(borrower: any) {
    this.inputBookFines.Borrower_Name =
      borrower.B_Last_Name + ", " + borrower.B_First_Name;
  }

  openEditDialog(val: BookFinesDto) {
    this.editRowFines = true;
    this.inputBookFines = { ...val };
  }

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

  deleteSpecificBookFines(val: BookFinesDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteBookFines(val.BookFines_ID as any);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  resetModel() {
    this.inputBookFines = {
      Title: "",
      Borrower_Name: "",
      Fine_Date: "",
      Payment_Amount: "",
      Payment_Status: "",
    };
  }
}
</script>
