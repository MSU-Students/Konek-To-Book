<template>
  <q-page class="bg-image1">
    <div class="text-h4 text-teal-9 q-pb-lg q-pt-lg text-bold flex flex-center">
      <q-icon
        class="q-pr-sm"
        name="local_library"
        color="teal-9 "
        style="font-size: 3rem"
      />
      Manage IssuedBooks
    </div>
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_ISSUEBOOK ------------------------------------------    --->
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
        <!--------------------------------  ADD NEW ISSUEDBOOK BUTTON  ------------------------------------------    --->
        <q-tab
          name="issuedbook"
          icon="library_add"
          label="Add Issued Book"
          @click="addNewIssuedBook = true"
        />
        <q-dialog v-model="addNewIssuedBook" persistent>
          <q-card style="width: 900px; max-width: 110vw" class="q-pa-md">
            <q-card-section class="row q-pa-md">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="local_library" />
                </q-avatar>
                <div class="text-h6">Add IssuedBook</div>
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
              <q-form @submit="onaddIssuedBook" class="q-px-md">
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
                      v-model="inputIssuedBook.books"
                      lazy-rules
                      :rules="[(val) => val || 'Select Book ID']"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputIssuedBook.Title"
                      readonly
                      label="Title"
                    />
                  </div>
                </div>
                <div class="q-gutter-md row q-pb-lg">
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
                      v-model="inputIssuedBook.borrowerss"
                      lazy-rules
                      :rules="[(val) => val || 'Select Borrower ID']"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      optine-value="B_First_Name"
                      v-model="inputIssuedBook.Borrower_Name"
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
                      v-model="inputIssuedBook.Due_Date"
                      type="date"
                      hint="Due Date"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the due date',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      outlined
                      dense
                      v-model="inputIssuedBook.Book_Status"
                      readonly
                      label="Book Status"
                    />
                  </div>
                  <div class="col">
                    <q-select
                      outlined
                      dense
                      v-model="inputIssuedBook.IssuedBook_Status"
                      :options="issuedstatusOpt"
                      label="IssuedBook Status"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Select the issuedbook status',
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
                  <q-btn flat label="Save" color="primary" type="submit" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!--------------------------------  EXPORT CSV _ ISSUEDBOOK ------------------------------------------    --->
        <q-tab
          name="Export"
          icon="archive"
          label="Export"
          @click="exportTable"
        />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF ISSUEDBOOK  ------------------------------------------    --->
    <div v-show="viewTable" class="q-ma-md">
      <q-table
        title="IssuedBook List"
        :rows="allIssuedBook"
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
                @click="filter = 'Issued'"
                label="Issued"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = 'Return'"
                label="Return"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = 'Lost'"
                label="Lost"
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

        <template #body-cell-issuedbookstatus="props">
          <q-td :props="props">
            <q-chip
              flat
              color="white"
              :text-color="colorManipulation(props.row.IssuedBook_Status)"
              :label="labelManipulation(props.row.IssuedBook_Status)"
            >
            </q-chip>
          </q-td>
        </template>

        <!-------------------------------------  BUTTONS   ------------------------------------------    --->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
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
                    <div>{{ inputIssuedBook.IssuedBook_ID }}</div>
                    <div class="text-h7 text-center">
                      <strong>Book Title: </strong>
                      {{ inputIssuedBook.Title }}
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="bg-grey-1">
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong> Borrower Name: </strong>
                      {{ inputIssuedBook.Borrower_Name }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong>Borrow Date: </strong>
                      {{ inputIssuedBook.Borrow_Date }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong>Due Date: </strong>
                      {{ inputIssuedBook.Due_Date }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong>Book Status: </strong>
                      {{ inputIssuedBook.Book_Status }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      <strong>IssuedBook Status: </strong>
                      {{ inputIssuedBook.IssuedBook_Status }}
                    </div>
                  </q-card-section>

                  <q-card-section
                    class="bg-primary text-center text-caption text-white"
                  >
                    Mindanao State University - Marawi City
                  </q-card-section>
                </q-card>
              </q-dialog>

              <!--------------------------------------- EDITISSUEDBOOK Button --------------- ------------------------->
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
              <q-dialog v-model="editRowIssuedBook" persistent>
                <q-card style="width: 900px; max-width: 110vw" class="q-pa-lg">
                  <q-card-section class="row">
                    <q-toolbar>
                      <q-avatar size="50px">
                        <q-icon name="local_library" />
                      </q-avatar>
                      <div class="text-h6">Edit Issued Book</div>
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
                    <q-form @submit="oneditIssuedBook()" class="q-px-md">
                      <div class="q-gutter-md row q-pb-md">
                        <div class="col-md-2">
                          <q-input
                            dense
                            outlined
                            readonly
                            label="IssuedBook ID"
                            v-model="inputIssuedBook.IssuedBook_ID"
                          />
                        </div>
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
                            v-model="inputIssuedBook.books"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputIssuedBook.Title"
                            readonly
                            label="Title"
                          />
                        </div>
                      </div>
                      <div class="q-gutter-md row q-pb-lg">
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
                            v-model="inputIssuedBook.borrowerss"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            optine-value="B_First_Name"
                            v-model="inputIssuedBook.Borrower_Name"
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
                            v-model="inputIssuedBook.Due_Date"
                            type="date"
                            hint="Due Date"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Input the due date',
                            ]"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            outlined
                            dense
                            v-model="inputIssuedBook.Book_Status"
                            readonly
                            label="Book Status"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="inputIssuedBook.IssuedBook_Status"
                            :options="issuedstatusOpt"
                            label="IssuedBook Status"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Select the issuedbook status',
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
                          v-close-popup
                          type="submit"
                        />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>

              <!--------------------------------------- IssuedBook_Status BUTTON   ------------------------------------------    --->
              <q-btn
                round
                color="teal-8"
                icon="done_all"
                size="sm"
                flat
                dense
                @click="openIssuedStatus(props.row)"
                ><q-tooltip class="bg-teal-7" :offset="[10, 10]">
                  IssueBook Status
                </q-tooltip></q-btn
              >

              <q-dialog v-model="issuedStatus">
                <q-card style="width: 400px" class="q-ma-sm">
                  <q-card-section class="text-h8">
                    IssuedBook Status
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="flex flex-center q-pt-none">
                    <q-form @submit="oneditIssuedBook()">
                      <div>
                        <q-radio
                          v-model="inputIssuedBook.IssuedBook_Status"
                          val="Issued"
                          label="Issued"
                          color="Primary"
                          size="lg"
                        />
                        <q-radio
                          v-model="inputIssuedBook.IssuedBook_Status"
                          val="Return"
                          label="Return"
                          color="secondary"
                          size="lg"
                        />
                        <q-radio
                          v-model="inputIssuedBook.IssuedBook_Status"
                          val="Lost"
                          label="Lost"
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
      <!--------------------------------------- Return Book Table   ------------------------------------------    --->
      <div class="q-py-lg row q-gutter-md">
        <div class="col">
          <q-card style="height: 300px">
            <q-layout container style="height: 300px">
              <q-list style="max-height: 300px" class="rounded-borders">
                <q-item-label header>Return Book</q-item-label>

                <q-item v-for="data in returnBook" v-bind:key="data.Title">
                  <q-item-section avatar top>
                    <q-icon name="beenhere" color="green" size="34px" />
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
                    <q-item-label caption lines="1">
                      Book Status: {{ data.Book_Status }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section top side>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">Return Date :</span>
                      <span class="text-grey-8"> {{ data.Borrow_Date }}</span>
                    </q-item-label>
                    <q-item-label caption lines="1">
                      Due Date : {{ data.Due_Date }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced />
              </q-list>
            </q-layout>
          </q-card>
        </div>

        <!--------------------------------------- Lost Book Table   ------------------------------------------    --->
        <div class="col">
          <q-card style="height: 300px">
            <q-layout container style="height: 300px">
              <q-list bordered class="rounded-borders">
                <q-item-label header>Lost Book</q-item-label>

                <q-item
                  v-for="data in lostBook"
                  v-bind:key="data.Borrower_Name"
                >
                  <q-item-section avatar top>
                    <q-icon name="assignment_late" color="red" size="34px" />
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
                    <q-item-label caption lines="1">
                      Book Status: {{ data.Book_Status }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section top side>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">Return Date :</span>
                      <span class="text-grey-8"> {{ data.Borrow_Date }}</span>
                    </q-item-label>
                    <q-item-label caption lines="1">
                      Due Date : {{ data.Due_Date }}
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

<script lang="ts">
import { exportFile } from "quasar";
import {
  BookDto,
  BookFinesDto,
  BorrowerDto,
  IssuedBookDto,
} from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapState, mapActions, mapGetters } from "vuex";
import { date } from "quasar";

const timeStamp = Date.now();
const currentDate = date.formatDate(timeStamp, "YYYY-MM-DD");

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
    ...mapState("issuedbook", ["allIssuedBook"]),
    ...mapState("book", ["allBook"]),
    ...mapState("borrower", ["allBorrower"]),
    ...mapState("bookfines", ["allBookFines"]),

    ...mapGetters("issuedbook", ["returnBook", "lostBook", "issuedBook"]),
  },
  methods: {
    ...mapActions("issuedbook", [
      "addIssuedBook",
      "editIssuedBook",
      "deleteIssuedBook",
      "getAllIssuedBook",
    ]),
  },
})
export default class ManageIssuedBooks extends Vue {
  allIssuedBook!: IssuedBookDto[];
  allBook!: BookDto[];
  allBorrower!: BorrowerDto[];
  allBookFines!: BookFinesDto[];

  returnBook!: IssuedBookDto[];
  lostBook!: IssuedBookDto[];
  issuedBook!: IssuedBookDto[];

  options: BookDto[] = [];
  OptionBorrow: BorrowerDto[] = [];

  addIssuedBook!: (payload: IssuedBookDto) => Promise<void>;
  editIssuedBook!: (payload: IssuedBookDto) => Promise<void>;
  deleteIssuedBook!: (payload: IssuedBookDto) => Promise<void>;
  getAllIssuedBook!: () => Promise<void>;

  async mounted() {
    await this.getAllIssuedBook();
  }

  pagination = {};
  confirmDelete = false;
  cancelEnabled = true;
  addNewIssuedBook = false;
  editRowIssuedBook = false;
  issuedStatus = false;
  filter = "";
  search = "";
  dialog = false;
  Details = false;
  viewTable = false;

  issuedstatusOpt = ["Issued", "Lost", "Return"];

  columns = [
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },

    {
      name: "issuedbookID",
      align: "center",
      label: "IssuedBook ID",
      field: "IssuedBook_ID",
      sortable: true,
    },

    {
      name: "borrowername",
      label: "Borrower Name",
      align: "left",
      field: "Borrower_Name",
    },
    {
      name: "borrowdate",
      label: "Borrow Date",
      align: "left",
      field: "Borrow_Date",
    },
    { name: "duedate ", label: "Due Date", align: "left", field: "Due_Date" },

    {
      name: "issuedbookstatus",
      label: "IssuedBook Status",
      align: "center",
      field: "IssuedBook_Status",
    },
  ];

  // ----------------------------- E X P O R T TABLE-------------------------------------
  exportTable() {
    // naive encoding to csv format
    const header = [
      wrapCsvValue("IssuedBook ID"),
      wrapCsvValue("Title"),
      wrapCsvValue("Borrower Name"),
      wrapCsvValue("Borrow Date"),
      wrapCsvValue("Due Date"),
      wrapCsvValue("Book Status"),
      wrapCsvValue("IssuedBook Status"),
    ];
    const rows = [header.join(",")].concat(
      this.allIssuedBook.map((c) =>
        [
          wrapCsvValue(String(c.IssuedBook_ID)),
          wrapCsvValue(c.Title),
          wrapCsvValue(c.Borrower_Name),
          wrapCsvValue(c.Borrow_Date),
          wrapCsvValue(c.Due_Date),
          wrapCsvValue(c.Book_Status),
          wrapCsvValue(c.IssuedBook_Status),
        ].join(",")
      )
    );

    const status = exportFile(
      "List of IssuedBooks_ MSU ISED LIBRARY-export.csv",
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

  inputIssuedBook: any = {
    Title: "",
    Borrower_Name: "",
    Borrow_Date: currentDate,
    Due_Date: "",
    Book_Status: "",
    IssuedBook_Status: "Issued",
  };

  searchAction(books: any) {
    this.inputIssuedBook.Title = books.Title;
    this.inputIssuedBook.Book_Status = books.Book_Status;
  }

  clearSearch() {
    this.search = "";
  }
  onSelectBook(books: any) {
    this.inputIssuedBook.Title = this.allBook.find(
      (i) => i.Book_ID === books
    )?.Title;

    this.inputIssuedBook.Book_Status = this.allBook.find(
      (i) => i.Book_ID === books
    )?.Book_Status;
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

  onSelectBorrower(borrowerss: any) {
    this.inputIssuedBook.Borrower_Name =
      this.allBorrower.find((s) => s.Borrower_ID === borrowerss)?.B_First_Name +
      " " +
      this.allBorrower.find((s) => s.Borrower_ID === borrowerss)?.B_Last_Name;
  }

  openIssuedStatus(val: IssuedBookDto) {
    this.issuedStatus = true;
    this.inputIssuedBook = { ...val };
  }
  openEditDialog(val: IssuedBookDto) {
    this.editRowIssuedBook = true;
    this.inputIssuedBook = { ...val };
  }
  openDialog(val: IssuedBookDto) {
    this.Details = true;
    this.inputIssuedBook = { ...val };
  }
  async onaddIssuedBook() {
    try {
      await this.addIssuedBook(this.inputIssuedBook);
      this.$q.notify({
        type: "positive",
        message: "Successfully Added.",
      });
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: "Something went wrong!",
      });
    }
    this.addNewIssuedBook = false;
    this.resetModel();
  }

  async oneditIssuedBook() {
    await this.editIssuedBook(this.inputIssuedBook);
    this.issuedStatus = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Update.",
    });
  }

  // deleteSpecificIssuedBook(val: IssuedBookDto) {
  //   this.$q
  //     .dialog({
  //       message: "Confirm to delete?",
  //       cancel: true,
  //       persistent: true,
  //     })
  //     .onOk(async () => {
  //       await this.deleteIssuedBook(val.IssuedBook_ID as any);
  //       this.$q.notify({
  //         type: "warning",
  //         message: "Successfully removed",
  //       });
  //     });
  // }

  resetModel() {
    this.inputIssuedBook = {
      Title: "",
      Borrower_Name: "",
      Borrow_Date: currentDate,
      Due_Date: "",
      Book_Status: "",
      IssuedBook_Status: "",
    };
  }

  colorManipulation(IssuedBook_Status: string) {
    if (IssuedBook_Status === "Issued") {
      return "warning";
    }
    if (IssuedBook_Status === "Return") {
      return "positive";
    }
    if (IssuedBook_Status === "Lost") {
      return "negative";
    }
  }
  labelManipulation(IssuedBook_Status: string) {
    if (IssuedBook_Status === "Issued") {
      return "Issued";
    }
    if (IssuedBook_Status === "Return") {
      return "Return";
    }
    if (IssuedBook_Status === "Lost") {
      return "Lost";
    }
  }
}
</script>
