<template>
  <q-page class = "bg-image1">
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'teal_dark' : 'bg-teal-8'"
            class="text-white"
          >
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total of Books</div>
                <div class="text-h5">356</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="auto_stories" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'red_dark' : 'bg-red-8'"
            class="text-white"
          >
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Issued Books</div>
                <div class="text-h5">45</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="local_library" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'orange_dark' : 'bg-orange-9 '"
            class="text-white"
          >
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Borrowers</div>
                <div class="text-h5">
                  <q-icon name="people" />
                  Second Semester
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-------------------------------- --------------------- TAB_MENU_BOOK------------------------------------------   --------- --->
    <div class="q-ma-md">
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-primary text-white shadow-2"
      >
        <!-------------------------------- ------------------- ADD NEW BOOK BUTTON  ------------------------------------------    --->
        <q-tab
          name="book"
          icon="library_add"
          label="Add Book"
          @click="addBook = true"
        />
        <q-dialog v-model="addBook" persistent>
          <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="auto_stories" />
                </q-avatar>
                <div class="text-h6">Add New Book</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>
            </q-card-section>

            <q-card-section class="q-gutter-md">
              <q-input dense outlined v-model="title" label="Title" />
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-input dense outlined v-model="isbn" label="ISBN" />
              </div>
              <div class="col">
                <q-input dense outlined v-model="authors" label="Author" />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="callnumber"
                  label="Call Number"
                />
              </div>
              <div class="col">
                <q-input dense outlined v-model="edition" label="Edition" />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-select
                  dense
                  outlined
                  v-model="category"
                  :options="options"
                  label="Category"
                />
              </div>
              <div class="col">
                <q-input dense outlined v-model="publisher" label="Publisher" />
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md row">
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="datepublication"
                  type="date"
                  label="Date of Publication"
                />
              </div>
              <div class="col">
                <q-input dense outlined v-model="pages" label="Pages" />
              </div>
            </q-card-section>


          <q-card-section class="q-gutter-md row">
            <div class="col">
                <q-input dense outlined v-model="series" label="Series" />
              </div>
              <div class="col">
                <q-select
                  outlined
                  dense
                  v-model="status"
                  :options="options1"
                  label="Status"
                />
              </div>
         </q-card-section>

           <q-card-section class="q-gutter-md row">
             <div class="col">
                <q-input dense outlined v-model="notes" label="Notes" />
              </div>
            <div class="col">
                <q-select
                  outlined
                  dense
                  v-model="availablity"
                  :options="options2"
                  label="Availability"
                />
              </div>
         </q-card-section>

            <q-card-actions align="right">
                <q-btn  flat label="Cancel" color="red-8" v-close-popup />
                <q-btn flat label="Save" color="primary" v-close-popup />
             </q-card-actions>

          </q-card>
        </q-dialog>
        <!--------------------------------  -------------Print BOOK ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF BOOKS  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        ref="tableRef"
        title="List of Books"
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
        <!------------------------------------------ DETAILS BOOK Button ------------------------------------------ ------------------------->
        <template v-slot:body="props">
          <q-tr :props="props">
            <div>
              <q-td>
                <q-btn
                  round
                  color="blue"
                  icon="more_vert"
                  size="md"
                  flat
                  dense
                  @click="Details = true"
                />


                <q-dialog v-model="Details">
                  <q-card style="width: 500px; max-width: 90vw"  flat bordered>
                    <q-card-section>
                      <div class="text-h9 text-left">
                        BOOK DETAILS
                        <q-btn
                          round
                          flat
                          dense
                          icon="close"
                          class="float-right"
                          color="grey-8"
                          v-close-popup
                        ></q-btn>
                      </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>

                      <q-card-section class="q-pt-xs col">
                        <div class="text-overline text-orange-9">01</div>
                        <div class="text-h6 text-center text-orange-10 q-ma-mp q-mb-xs "> Data Structures and Algorithms </div>
                        <q-space/>
                        <div class = "text-center q-ma-mp q-mb-xs">ISBN: 9865-865</div>
                        <div class = "text-center  q-ma-mp q-mb-xs">CallNo: 906</div>
                        <div class = "text-center  q-ma-mp q-mb-xs">Author: Sarah Jay</div>
                        <div class = "text-center  q-ma-mp q-mb-xs" >Edition: 2nd Ed </div>
                        <div class = "text-center  q-ma-mp q-mb-xs">Category: Reference</div>
                        <div class = "text-center  q-ma-mp q-mb-xs"> Publisher: 2026-2029 </div>
                        <div class = "text-center  q-ma-mp q-mb-xs">Date 0f Publication: 567890</div>
                        <div class = "text-center  q-ma-mp q-mb-xs">Pages: ii</div>
                        <div class = "text-center  q-ma-mp q-mb-xs">Series: 2nd Ed</div>
                        <div class = "text-center  q-ma-mp q-mb-xs">Status: New</div>
                        <div class = "text-center  q-ma-mp q-mb-xs">Notes: From California</div>
                        <div class = "text-center  q-ma-mp q-mb-xs">Availability: YES</div>
                      </q-card-section>
                    </q-card-section>

                    <q-separator />

                    <q-card-section
                      class="col-8 text-italic flex flex-center"
                    >
                      MSU-ISED library management system
                    </q-card-section>
                  </q-card>
                </q-dialog>
                <!-------------------------------------------------- EDIT BOOK BUTTON   -------------------------------------------------------------->
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
                          <q-icon name="auto_stories" />
                        </q-avatar>
                        <div class="text-h6">Edit Book</div>
                        <q-space />
                        <q-btn flat round dense icon="close" v-close-popup />
                      </q-toolbar>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col-md-3">
                        <q-input
                          dense
                          outlined
                          v-model="bookid"
                          readonly
                          label="Book ID"
                        />
                      </div>
                      <div class="col">
                        <q-input dense outlined v-model="title" label="Title" />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input dense outlined v-model="isbn" label="ISBN" />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="authors"
                          label="Author"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="callnumber"
                          label="Call Number"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="edition"
                          label="Edition"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-select
                          outlined
                          dense
                          v-model="category"
                          :options="options"
                          label="category"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="publisher"
                          label="Publisher"
                        />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="datepublication"
                          type="date"
                          label="Date of Publication"
                        />
                      </div>
                      <div class="col">
                        <q-input dense outlined v-model="pages" label="Pages" />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                          <q-input dense outlined v-model="series" label="Series" />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="status"
                            :options="options1"
                            label="Status"
                          />
                        </div>
                  </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                          <q-input dense outlined v-model="notes" label="Notes" />
                        </div>
                      <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="availablity"
                            :options="options2"
                            label="Availability"
                          />
                        </div>
                  </q-card-section>

                    <q-card-actions align="right">
                     <q-btn  flat label="Cancel" color="red-8" v-close-popup />
                     <q-btn flat label="Save" color="primary" v-close-popup />
                    </q-card-actions>

                  </q-card>
                </q-dialog>
                <!------------------------------------------------------------- DELETE BOOK BUTTON   -----------------------------------------------------------------    --->
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
@Options({})
export default class LibrarianIndex extends Vue {
  tableRef = null;
  navigationActive = false;
  pagination = {};
  cancelEnabled = true;
  addBook = false;
  editRow = false;
  filter = "";
  dialog = false;
  Details = false;
  bookid = "";
  title = "";
  isbn = "";
  callnumber = "";
  authors = "";
  edition = "";
  category = "";
  publisher = "";
  datepublication = "";
  pages = "";
  series = "";
  status = "";
  notes = "";
  availablity = "";

  options = [
    "Circulation",
    "Capstone",
    "Filipiniana",
    "New Arrivals",
    "Reference",
    "Theses",
  ];
  options1 = [
    "New",
    "Damage",
    "Lost",
    "Outdated",
    "Obsolete"

    ];
  options2 = ["YES", "NO"];

  columns = [
    {
      name: "bookID",
      align: "center",
      label: "Book ID",
      field: "bookID",
      sortable: true,
    },
    {
      name: "name",
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
      name: "notes",
      label: "Notes",
      align: "center",
      field: "notes",
    },

    {
      name: "availability",
      label: "Availability",
      align: "center",
      field: "availability",
    },
  ];

  rows = [
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
      notes: "Donation",
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
      notes: "Donation",
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
      notes: "From California",
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
      notes: "From California",
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
      notes: "From California",
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
      notes: "From California",
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
      notes: "From California",
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
      notes: "From California",
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
      notes: "No comment",
      availability: "YES",
    },
    {
      bookID: "10",
      name: "Robotics",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "xi",
      series: "tvhj",
      status: "New",
      notes: "From California",
      availability: "YES",
    },
    {
      bookID: "11",
      name: "Cinderella",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "x",
      series: "tvhj",
      status: "New",
      notes: "From California",
      availability: "YES",
    },
    {
      bookID: "15",
      name: "Github",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "xii",
      series: "tvhj",
      status: "New",
      notes: "Donation",
      availability: "YES",
    },
    {
      bookID: "13",
      name: "Integrated",
      isbn: "9865-865",
      callnumber: "906",
      authors: "Lady ",
      edition: "3rd ed",
      category: "Reference",
      publisher: "2026-2029",
      dateofpublication: "567890",
      pages: "vi",
      series: "tvhj",
      status: "New",
      notes: "Donation",
      availability: "YES",
    },
  ];
}
</script>
