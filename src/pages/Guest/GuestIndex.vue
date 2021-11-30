<template>
  <q-page class="bg-image1">
    <!--------------------------------  TABLE_ LISTS OF BOOKS  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        ref="tableRef"

        tabindex="0"
        title="BOOKS"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="pagination"

      >
        <template v-slot:top-right>
          <div class="search">
            <q-input
              outlined
              rounded
              dense
              debounce="300"

              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

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
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
interface IRow {
  name: string;
}
Options({});

export default class GuestIndex extends Vue {
  tableRef = '';
  navigationActive = false;
  pagination = {};
  filters = "";

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
