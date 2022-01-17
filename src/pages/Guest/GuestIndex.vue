<template>
  <q-page class="bg-image1">
    <!--------------------------------  TABLE_ LISTS OF BOOKS  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        ref="tableRef"
        title="BOOKS"
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
export default class GuestIndex extends Vue {
  tableRef = '';
  navigationActive = false;
  pagination = {};
  filter = "";
  Details = false;
  dialog = false;
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
  availablity = "";

  columns = [
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
      availability: "YES",
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
      availability: "NO",
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
      pages: "ii",
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
      availability: "NO",
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
      pages: "ii",
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
      pages: "ii",
      series: "tvhj",
      status: "New",
      availability: "YES",
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
      pages: "ii",
      series: "tvhj",
      status: "New",
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
      pages: "ii",
      series: "tvhj",
      status: "New",
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
      pages: "ii",
      series: "tvhj",
      status: "New",
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
      pages: "ii",
      series: "tvhj",
      status: "New",
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
      pages: "ii",
      series: "tvhj",
      status: "New",
      availability: "YES",
    },
  ];
}
</script>
