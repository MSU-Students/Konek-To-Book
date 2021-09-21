<template>
  <div class="q-pa-md">
    <q-table
      title="BOOKS"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:top-right>
        <div class="search">
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

         <q-page-scroller
           position="bottom-right"
           :scroll-offset="150"
           :offset="[18,18]"
    >
            <q-btn fab icon="keyboard_arrow_up"  color="orange-9" text-color="white"  />
         </q-page-scroller>

      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

const columns = [

  { name: 'bookID',
    required: true,
    label: 'Book ID',
    field:'bookID',
    align: 'center',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Title',
    align: 'center',
    field: (row) => row.name ,
    format: (val) => `${val}`,
    sortable: true,
  },

  { name: 'isbn', label: 'ISBN', align: 'center',field:'isbn', sortable: true },
  { name:  'callnumber ', label: 'Call Number', align: 'center',field: 'callnumber', sortable: true },
  { name: 'authors', label: 'Author/s', align: 'center', field: 'authors', sortable: true },
  { name: 'edition', label: 'Edition', align: 'center', field: 'edition', sortable: true },
  {
    name: 'category',
    label: 'Category',
    field:'category',
    align: 'center',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'publisher',
    label: 'Publisher',
    field: 'publisher',
    align: 'center',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },

  {
    name: 'dateofpublication',
    label: 'Date of Publication',
    field:'dateofpublication',
    align: 'center',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'pages',
    label: 'Pages',
    align: 'center',
    field: 'pages',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },

  {
    name: 'series',
    label: 'Series',
    align: 'center',
    field:'series',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },

  {
    name: 'status',
    label: 'Status',
    align: 'center',
    field:'status',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'availability',
    label: 'Availability',
    align: 'center',
    field: 'availability',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const originalRows = [
  {
    bookID: '01',
    name: 'Data Structures and Algorithms',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'sarah jay',
    edition: '2nd ed',
    category: 'reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },
  {
    bookID: '02',
    name: 'Algorithms',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'sarah jay',
    edition: '2nd ed',
    category: 'Capstone',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },

  {
    bookID: '03',
    name: 'Integrating',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Jyasa',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'NO',
  },
  {
    bookID: '04',
    name: 'Robotics',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady gerry',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'Old',
    availability: 'NO',
  },
  {
    bookID: '05',
    name: 'Robotics and systematic system',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'Old',
    availability: 'NO',
  },
  {
    bookID: '06',
    name: 'Oracles',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'Old',
    availability: 'NO',
  },
  {
    bookID: '07',
    name: 'Programming Language',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },
  {
    bookID: '08',
    name: 'Java Language',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },
  {
    bookID: '09',
    name: 'Programming Languages',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },
  {
    bookID: '10',
    name: 'Robotics',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },
  {
    bookID: '11',
    name: 'Cinderella',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },
  {
    bookID: '15',
    name: 'Github',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },
  {
    bookID: '13',
    name: 'Integrated',
    isbn: '9865-865',
    callnumber: '906',
    authors: 'Lady ',
    edition: '3rd ed',
    category: 'Reference',
    publisher: '2026-2029',
    dateofpublication: '567890',
    pages: 'ii',
    series: 'tvhj',
    status: 'New',
    availability: 'YES',
  },
];

export default {
  setup() {
    const rows = ref([]);
    const filter = ref('');
    const loading = ref(false);
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10
    })


    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    function fetchFromServer(startRow, count, filter, sortBy, descending) {
      const data = filter
        ? originalRows.filter((row) => row.name.includes(filter))
        : originalRows.slice();

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy ==='desc'
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }

      return data.slice(startRow, startRow + count);
    }

    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount(filter) {
      if (!filter) {
        return originalRows.length;
      }
      let count = 0;
      originalRows.forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count;
        }
      });
      return count;
    }

    function onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        pagination.value.rowsNumber = getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        const returnedData = fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData)

        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // ...and turn of loading indicator
        loading.value = false
      }, 1500)
    }

    onMounted(() => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value,
        filter: undefined
      })
    })

    return {
      filter,
      loading,
      pagination,
      columns,
      rows,

      onRequest
    }
  }
}
</script>
