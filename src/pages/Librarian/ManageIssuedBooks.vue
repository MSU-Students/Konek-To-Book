<template>
  <q-page class="bg-image">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_ISSUEBOOK ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-red-8 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW ISSUEDBOOK BUTTON  ------------------------------------------    --->
        <q-tab
          name="issuedbook"
          icon="library_add"
          label="Add Issued Book"
          @click="addIssuedBook = true"
        />
        <q-dialog v-model="addIssuedBook" persistent full-width>
          <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="local_library" />
                </q-avatar>
                <div class="text-h6">Add IssuedBook</div>
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
                <q-input
                  dense
                  outlined
                  v-model="title"
                  readonly
                  label="Title"
                />
              </div>
            </q-card-section>

            <!------------------------------ Table for List Of Books --------------------->
            <q-card-section>
              <q-table
                class="my-sticky-header-column-table"
                title="List of Books"
                :rows="Brows"
                :columns="Bcolumns"
                :filter="filter"
                row-key="Bname"
              />
            </q-card-section>
            <!------------------------------        TEXTFIELD                 --------------------->

            <q-card-section class="q-gutter-md row">
              <div class="col-md-2">
                <q-select
                  dense
                  outlined
                  v-model="borrowerid"
                  :options="options2"
                  label="Borrower ID"
                />
              </div>
              <div class="col-md-4">
                <q-input
                  dense
                  outlined
                  v-model="borrowername"
                  readonly
                  label="Borrower Name"
                />
              </div>
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="borrowdate"
                  type="date"
                  label="Borrow Date"
                />
              </div>
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="duedate"
                  type="date"
                  label="Due Date"
                />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-input
                  outlined
                  dense
                  v-model="bookstatus"
                  readonly
                  label="Book Status"
                />
              </div>
              <div class="col">
                <q-select
                  outlined
                  dense
                  v-model="issuedbookstatus"
                  :options="options3"
                  label="IssuedBook Status"
                />
              </div>
              <div class="col">
                <q-select
                  outlined
                  dense
                  v-model="bookfinesid"
                  :options="options4"
                  label="BookFines ID"
                />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="red-10" v-close-popup />
              <q-btn flat label="Add" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!--------------------------------  Print ISSUEDBOOK ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF ISSUEDBOOK  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of IssuedBooks"
        :rows="rows"
        :columns="columns"
        row-key="name"
        ref="tableRef"
        tabindex="0"
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
                <!------------------------------------- EDIT ISSUEDBOOK BUTTON   ------------------------------------------    --->
                <q-btn
                  round
                  color="teal-8"
                  icon="edit"
                  size="sm"
                  flat
                  dense
                  @click="editRow = true"
                />
                <q-dialog v-model="editRow" persistent full-width>
                  <q-card
                    style="width: 800px; max-width: 100vw"
                    class="q-pa-md"
                  >
                    <q-card-section class="row">
                      <q-toolbar>
                        <q-avatar size="50px">
                          <q-icon name="local_library" />
                        </q-avatar>
                        <div class="text-h6">Edit Issued Book</div>
                        <q-space />
                        <q-btn flat round dense icon="close" v-close-popup />
                      </q-toolbar>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col-md-3">
                        <q-input
                          dense
                          outlined
                          v-model="issuedbookid"
                          readonly
                          label="IssuedBook ID"
                        />
                      </div>
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
                        <q-input
                          dense
                          outlined
                          v-model="title"
                          readonly
                          label="Title"
                        />
                      </div>
                    </q-card-section>

                    <!------------------------------ Table for List Of Books --------------------->
                    <q-card-section>
                      <q-table
                        class="my-sticky-header-column-table"
                        title="List of Books"
                        :rows="Brows"
                        :columns="Bcolumns"
                        :filter="filter"
                        row-key="Bname"
                      />
                    </q-card-section>
                    <!------------------------------        TEXTFIELD                 --------------------->
                    <q-card-section class="q-gutter-md row">
                      <div class="col-md-2">
                        <q-select
                          dense
                          outlined
                          v-model="borrowerid"
                          :options="options2"
                          label="Borrower ID"
                        />
                      </div>
                      <div class="col-md-4">
                        <q-input
                          dense
                          outlined
                          readonly
                          label="Borrower Name"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="borrowdate"
                          type="date"
                          label="Borrow Date"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="duedate"
                          type="date"
                          label="Due Date"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input
                          outlined
                          dense
                          v-model="bookstatus"
                          readonly
                          label="Book Status"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          outlined
                          dense
                          v-model="issuedbookstatus"
                          :options="options3"
                          label="IssuedBook Status"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          outlined
                          dense
                          v-model="bookfinesid"
                          :options="options4"
                          label="BookFines ID"
                        />
                      </div>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="Cancel" color="red-10" v-close-popup />
                      <q-btn flat label="Save" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
                <!--------------------------------------- DELETE ISSUEDBOOK BUTTON   ------------------------------------------    --->
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

<!--------------------------------------- Information OF ISSUEDBOOK    ------------------------------------------    --->
<script lang="ts">
import { Vue, Options } from "vue-class-component";
interface IRow {
  name: string;
}

Options({});

interface Brows {
  Bname: string;
}

Options({});
export default class ManageIssueBooks extends Vue {
  tableRef = null;
  navigationActive = false;
  pagination = {};
  cancelEnabled = true;
  addIssuedBook = false;
  editRow = false;
  filter = "";
  dialog = false;

  issuedbookid = "";
  bookid = "";
  borrowerid = "";
  title = "";
  borrowdate = "";
  duedate = "";
  bookstatus = "";
  issuedbookstatus = "";
  bookfinesid = "";

  options1 = ["001", "02", "003", "006", "078", "0672", "0898", "04332"];
  options2 = ["01", "02", "03", "04", "05", "06", "021", "034"];
  options3 = ["Lost", "Issued/Borrow", "Return"];
  options4 = ["001", "002", "003", "004", "005", "021", "034"];

  columns = [
    {
      name: "issuedbookID",
      align: "center",
      label: "IssuedBook ID",
      field: "issuedbookID",
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
      label: "Title",
      align: "center",
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "borrowdate",
      label: "Borrow Date",
      align: "center",
      field: "borrowdate",
    },
    { name: "duedate ", label: "Due Date", align: "center", field: "duedate" },
    {
      name: "bookstatus",
      label: "Book Status",
      align: "center",
      field: "bookstatus",
    },
    {
      name: "issuedbookstatus",
      label: "IssuedBook Status",
      align: "center",
      field: "issuedbookstatus",
    },
    {
      name: "bookfinesid",
      label: "BookFines ID",
      align: "center",
      field: "bookfinesid",
    },
  ];

  rows = [
    {
      issuedbookID: "001",
      bookID: "01",
      borrowerID: "01",
      name: "Data Structures and Algorithms",
      borrowdate: "03-02-21",
      duedate: "03-04-21",
      bookstatus: "New",
      issuedbookstatus: "Return",
      bookfinesid: "001",
    },
    {
      issuedbookID: "002",
      bookID: "02",
      borrowerID: "02",
      name: "Algorithms",
      borrowdate: "05-21-21",
      duedate: "05-23-21",
      bookstatus: "New",
      issuedbookstatus: "Borrow",
      bookfinesid: "003",
    },
    {
      issuedbookID: "003",
      bookID: "03",
      borrowerID: "03",
      name: "Integrating",
      borrowdate: "05-22-21",
      duedate: "05-24-21",
      bookstatus: "New",
      issuedbookstatus: "Lost",
      bookfinesid: "005",
    },
    {
      issuedbookID: "005",
      bookID: "04",
      borrowerID: "06",
      name: "Robotics",
      borrowdate: "07-18-21",
      duedate: "07-20-21",
      bookstatus: "Old",
      issuedbookstatus: "Return",
      bookfinesid: "006",
    },
    {
      issuedbookID: "011",
      bookID: "06",
      borrowerID: "11",
      name: "Oracles",
      borrowdate: "07-27-21",
      duedate: "07-29-21",
      bookstatus: "Old",
      issuedbookstatus: "Return",
      bookfinesid: "007",
    },
    {
      issuedbookID: "0019",
      bookID: "08",
      borrowerID: "07",
      name: "Java Language",
      borrowdate: "08-01-21",
      duedate: "08-03-21",
      bookstatus: "New",
      issuedbookstatus: "Borrow",
      bookfinesid: "008",
    },
  ];

  Bcolumns = [
    {
      name: "bookID",
      align: "center",
      label: "Book ID",
      field: "bookID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "Title",
      align: "center",
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
      sortable: true,
    },

    { name: "isbn", label: "ISBN", align: "center", field: "isbn" },
    {
      name: "callnumber ",
      label: "Call Number",
      align: "center",
      field: "callnumber",
    },
    {
      name: "authors",
      label: "Author/s",
      align: "center",
      field: "authors",
      sortable: true,
    },
    { name: "edition", label: "Edition", align: "center", field: "edition" },

    {
      name: "category",
      label: "Category",
      field: "category",
      align: "center",
      sortable: true,
    },
    {
      name: "publisher",
      label: "Publisher",
      field: "publisher",
      align: "center",
      sortable: true,
    },

    {
      name: "dateofpublication",
      label: "Date of Publication",
      field: "dateofpublication",
      align: "center",
      sortable: true,
    },
    {
      name: "pages",
      label: "Pages",
      align: "center",
      field: "pages",
    },

    {
      name: "series",
      label: "Series",
      align: "center",
      field: "series",
    },

    {
      name: "status",
      label: "Status",
      align: "center",
      field: "status",
    },
    {
      name: "availability",
      label: "Availability",
      align: "center",
      field: "availability",
    },
  ];

  Brows = [
    {
      bookID: "01",
      name: "Data Structures and Algorithms",
      isbn: "9865-865",
      callnumber: "906",
      authors: "sarah jay",
      edition: "2nd ed",
      category: "reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "ii",
      series: "tvhj",
      status: "New",
      availability: "YES",
    },
    {
      bookID: "02",
      name: "Algorithms",
      isbn: "9865-865",
      callnumber: "906",
      authors: "sarah jay",
      edition: "2nd ed",
      category: "Capstone",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "ii",
      series: "tvhj",
      status: "New",
      availability: "NO",
    },

    {
      bookID: "03",
      name: "Integrating",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Jyasa",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "ii",
      series: "tvhj",
      status: "New",
      availability: "NO",
    },
    {
      bookID: "04",
      name: "Robotics",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady gerry",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "ii",
      series: "tvhj",
      status: "Old",
      availability: "YES",
    },
    {
      bookID: "05",
      name: "Robotics and systematic system",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "iii",
      series: "tvhj",
      status: "Old",
      availability: "NO",
    },
    {
      bookID: "06",
      name: "Oracles",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "ii",
      series: "tvhj",
      status: "Old",
      availability: "YES",
    },
    {
      bookID: "07",
      name: "Programming Language",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "iii",
      series: "tvhj",
      status: "New",
      availability: "YES",
    },
    {
      bookID: "08",
      name: "Java Language",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "iv",
      series: "yuio",
      status: "New",
      availability: "NO",
    },
    {
      bookID: "09",
      name: "Programming Languages",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "i",
      series: "tvhj",
      status: "New",
      availability: "YES",
    },
  ];
}
</script>
