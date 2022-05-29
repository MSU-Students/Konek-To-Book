<template>
  <div>
    <!--  ------------------------------------------ TABLE OF ALL AVAILABLE BOOKS------------------------------------------ ------------------------->
    <q-table
      class="my-sticky-header-column-table"
      :grid="$q.screen.xs"
      :columns="columns"
      :rows="allBook"
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
      <!--  ------------------------------------------ DETAILS BOOK Button ------------------------------------------ ------------------------->
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="blue"
              icon="more_vert"
              size="md"
              flat
              dense
              @click="openDialog(props.row)"
            />

            <q-dialog v-model="Details">
              <q-card style="width: 500px; max-width: 90vw" my-card>
                <q-card-section>
                  <div class="text-subtitle2">
                    {{ inputBook.Book_ID }}
                  </div>
                  <div class="text-h6 text-center">
                    {{ inputBook.Title }}
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong> ISBN:</strong>
                    {{ inputBook.ISBN }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>CallNo: </strong>
                    {{ inputBook.Call_Number }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>Author:</strong>
                    {{
                      inputBook.authors?.A_Last_Name +
                      ", " +
                      inputBook.authors?.A_First_Name
                    }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>Edition:</strong>
                    {{ inputBook.Edition }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>Category:</strong>
                    {{ inputBook.categories?.C_Description }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>Publisher:</strong>
                    {{ inputBook.publishers?.Publisher }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>Date 0f Publication:</strong>
                    {{ inputBook.publishers?.DateOfPublication }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>Pages:</strong>
                    {{ inputBook.Pages }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong> Series:</strong>
                    {{ inputBook.Series }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong> Status:</strong>
                    {{ inputBook.Book_Status }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>Notes:</strong>
                    {{ inputBook.Notes }}
                  </div>
                  <div class="text-left q-ma-mp q-mb-xs">
                    <strong>Availability:</strong>
                    {{ inputBook.Availability }}
                  </div>
                </q-card-section>

                <q-card-section
                  class="bg-primary text-center text-caption text-white"
                >
                  Mindanao State University - Marawi City
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import {
  AuthorDto,
  BookDto,
  CategoryDto,
  PublisherDto,
} from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  computed: {
    ...mapState("book", ["allBook"]),
    ...mapState("author", ["allAuthor"]),
    ...mapState("category", ["allCategory"]),
    ...mapState("publisher", ["allPublisher"]),
  },
  methods: {
    ...mapActions("book", ["getAllBook"]),
  },
})
export default class GuestIndex extends Vue {
  allBook!: BookDto[];
  allAuthor!: AuthorDto[];
  allCategory!: CategoryDto[];
  allPublisher!: PublisherDto[];

  getAllBook!: () => Promise<void>;

  async mounted() {
    await this.getAllBook();
    console.log(this.allBook);
  }

  pagination = {};
  cancelEnabled = true;
  filter = "";
  Details = false;
  dialog = false;
  tab = "ListBooks";

  columns = [
    {
      name: "action",
      align: "center",
      field: "action",
    },
    {
      name: "bookID",
      align: "center",
      label: "Book ID",
      field: "Book_ID",
      sortable: true,
    },
    {
      name: "name",
      required: true,
      label: "Title",
      align: "left",
      field: (row: BookDto) => row.Title,
      format: (val: string) => `${val}`,
      sortable: true,
    },

    {
      name: "authors",
      label: "Author/s",
      align: "center",
      field: (row: any) =>
        row.authors?.A_Last_Name + ", " + row.authors?.A_First_Name || "None",
      sortable: true,
    },
    { name: "edition", label: "Edition", align: "center", field: "Edition" },

    {
      name: "category",
      label: "Category",
      field: (row: any) => row.categories?.C_Description || "None",
      align: "center",
      sortable: true,
    },

    {
      name: "status",
      label: "Status",
      align: "center",
      field: "Book_Status",
    },
  ];

  inputBook: BookDto = {
    ISBN: "",
    Call_Number: "",
    Title: "",
    Edition: "",
    DateOfPublication: "",
    Pages: "",
    Series: "",
    Notes: "",
    Book_Status: "New",
    Availability: "Yes",
  };

  openDialog(val: BookDto) {
    this.Details = true;
    this.inputBook = { ...val };
  }
}
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */

  max-height: 800px
  width: 1000%
  max-width: 1500px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #fff !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 4
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 500px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
