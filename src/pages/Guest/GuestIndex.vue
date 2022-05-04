<template>
  <q-page class="bg-image2">
    <!--------------------------------  TABLE_ LISTS OF BOOKS  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of Books"
        :rows="allBook"
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

        <!------------------------------------------ DETAILS BOOK Button ------------------------------------------ ------------------------->
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
                <q-card style="width: 500px; max-width: 90vw" flat bordered>
                  <q-card-section>
                    <div class="text-subtitle2">01</div>
                    <div class="text-h6">{{ inputBook.Title }}</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section>
                    <div class="text-left q-ma-mp q-mb-xs">
                      ISBN: {{ inputBook.ISBN }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      CallNo: {{ inputBook.Call_Number }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Author:
                      {{
                        inputBook.authors?.A_Last_Name +
                        ", " +
                        inputBook.authors?.A_First_Name
                      }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Edition: {{ inputBook.Edition }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Category: {{ inputBook.categories?.C_Description }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Publisher: {{ inputBook.publishers?.Publisher }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Date 0f Publication:
                      {{ inputBook.publishers?.DateOfPublication }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">Pages: ii</div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Series: {{ inputBook.Series }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Status: {{ inputBook.Book_Status }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Notes: {{ inputBook.Notes }}
                    </div>
                    <div class="text-left q-ma-mp q-mb-xs">
                      Availability: {{ inputBook.Availability }}
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
  </q-page>
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

  columns = [
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
      align: "center",
      field: (row: BookDto) => row.Title,
      format: (val: string) => `${val}`,
      sortable: true,
    },

    { name: "isbn", label: "ISBN", align: "center", field: "ISBN" },
    {
      name: "callnumber ",
      label: "Call Number",
      align: "center",
      field: "Call_Number",
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
      name: "publisher",
      label: "Publisher",
      field: (row: any) => row.publishers?.Publisher || "None",
      align: "center",
      sortable: true,
    },

    {
      name: "dateofpublication",
      label: "Date of Publication",
      field: (row: any) => row.publishers?.DateOfPublication || "None",
      align: "center",
      sortable: true,
    },
    {
      name: "pages",
      label: "Pages",
      align: "center",
      field: "Pages",
    },

    {
      name: "series",
      label: "Series",
      align: "center",
      field: "Series",
    },

    {
      name: "status",
      label: "Status",
      align: "center",
      field: "Book_Status",
    },

    {
      name: "notes",
      label: "Notes",
      align: "center",
      field: "Notes",
    },

    {
      name: "availability",
      label: "Availability",
      align: "center",
      field: "Availability",
    },
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
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
