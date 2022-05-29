<template>
  <q-page class="bg-image1">
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
                <div class="text-h5">{{ allBook.length }}</div>
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
                <div class="text-h5">{{ allIssuedBook.length }}</div>
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
                  {{ allBorrower.length }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-------------------------------- --------------------- TAB_MENU_BOOK------------------------------------------  --------- --------- --->
    <div class="q-ma-md">
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-primary text-white shadow-2"
      >
        <!-------------------------------- ------------------- ADD NEW BOOK BUTTON  ------------------------------------------   --------------- --->
        <q-tab
          name="book"
          icon="library_add"
          label="Add Book"
          @click="addNewBook = true"
        />
        <q-dialog v-model="addNewBook" persistent>
          <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="auto_stories" />
                </q-avatar>
                <div class="text-h6">Add New Book</div>
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
              <q-form @submit="onaddBook()" class="q-px-sm">
                <div class="q-gutter-xs row">
                  <div class="col">
                    <q-input
                      autofocus
                      dense
                      outlined
                      color="primary"
                      v-model="inputBook.Title"
                      label="Title"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Input the title of the book',
                      ]"
                    />
                  </div>
                </div>

                <div class="q-gutter-xs row">
                  <div class="col-12 col-md">
                    <q-input
                      dense
                      outlined
                      v-model="inputBook.ISBN"
                      label="ISBN"
                      type="number"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Input the ISBN',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBook.Author"
                      label="Author/s Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the Author/s Name',
                      ]"
                    />
                  </div>
                </div>

                <div class="q-gutter-x-xs row">
                  <div class="col-12 col-md">
                    <q-input
                      dense
                      outlined
                      v-model="inputBook.Call_Number"
                      label="Call Number"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Input the call number of the book',
                      ]"
                    />
                  </div>
                  <div class="col-12 col-md">
                    <q-input
                      dense
                      outlined
                      v-model="inputBook.Edition"
                      label="Edition"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Input the edition',
                      ]"
                    />
                  </div>
                  <div class="col-12 col-md">
                    <q-select
                      dense
                      outlined
                      label="Category"
                      :options="allCategory"
                      option-label="C_Description"
                      optine-value="Category_ID"
                      map-options
                      emit-value
                      v-model="inputBook.categories"
                      lazy-rules
                      :rules="[(val) => val || 'Select Category']"
                    />
                  </div>
                </div>

                <div class="q-gutter-sm row">
                  <div class="col-12 col-md">
                    <q-select
                      dense
                      outlined
                      label="Publisher"
                      :options="allPublisher"
                      option-label="Publisher"
                      optine-value="Publisher_ID"
                      map-options
                      emit-value
                      @update:model-value="onSelectPublisher"
                      v-model="inputBook.publishers"
                      lazy-rules
                      :rules="[(val) => val || 'Select Publisher']"
                    />
                  </div>
                  <div class="col-12 col-md">
                    <q-input
                      dense
                      outlined
                      readonly
                      v-model="inputBook.DateOfPublication"
                      label="Date of Publication"
                    />
                  </div>
                </div>

                <div class="q-gutter-sm row">
                  <div class="col-12 col-md">
                    <q-input
                      dense
                      outlined
                      v-model="inputBook.Pages"
                      label="Pages"
                    />
                  </div>
                  <div class="col-12 col-md">
                    <q-input
                      dense
                      outlined
                      v-model="inputBook.Series"
                      label="Series"
                    />
                  </div>
                  <div class="col-12 col-md">
                    <q-select
                      outlined
                      dense
                      v-model="inputBook.Book_Status"
                      :options="options1"
                      label="Status"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Select the status of the book',
                      ]"
                    />
                  </div>
                </div>

                <div class="q-gutter-sm row">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputBook.Notes"
                      label="Notes"
                    />
                  </div>
                  <div class="col">
                    <q-select
                      outlined
                      dense
                      v-model="inputBook.Availability"
                      :options="options2"
                      label="Availability"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Select the availability of the book',
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

        <!--------------------------------  ------------- EXPORT CSV _ LIST OF BOOK ------------------------------------------ --------   --->
        <q-tab
          name="Export"
          icon="archive"
          label="Export to csv"
          @click="exportTable"
        />
      </q-tabs>
    </div>
    <!--------------------------------  ---------  --- TABLE LISTS OF BOOKS  ------------------------------------------   ------ --->
    <div class="q-ma-md">
      <q-table
        title="Book List"
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

        <!------------------------------------------  ----------    DETAILS BOOK Button ------------------------------------------ ------------------------->

        <template v-slot:body-cell-Details="props">
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
                  <q-card-section class="bg-grey-1">
                    <div>{{ inputBook.Book_ID }}</div>
                    <div class="text-h6 text-center">{{ inputBook.Title }}</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="bg-grey-1">
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
                      {{ inputBook.Author }}
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
        <!-------------------------------------------------- EDIT BOOK BUTTON   -------------------------------------------------------------->
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
              <q-dialog v-model="editRowBook" persistent>
                <q-card style="width: 800px; max-width: 110vw" class="q-pa-md">
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

                  <q-card-section>
                    <q-form @submit="oneditBook()" class="q-px-md">
                      <div class="q-gutter-md row q-pb-md">
                        <div class="col-md-2">
                          <q-input
                            dense
                            outlined
                            readonly
                            label="Book ID"
                            v-model="inputBook.Book_ID"
                          />
                        </div>

                        <div class="col">
                          <q-input
                            autofocus
                            dense
                            outlined
                            color="primary"
                            v-model="inputBook.Title"
                            label="Title"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBook.ISBN"
                            label="ISBN"
                            type="number"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            dense
                            outlined
                            label="Author"
                            v-model="inputBook.Author"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBook.Call_Number"
                            label="Call Number"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBook.Edition"
                            label="Edition"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            dense
                            outlined
                            label="Category"
                            :options="allCategory"
                            option-label="C_Description"
                            option-value="Category_ID"
                            map-options
                            emit-value
                            v-model="inputBook.categories"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-select
                            dense
                            outlined
                            label="Publisher"
                            :options="allPublisher"
                            option-label="Publisher"
                            option-value="Publisher_ID"
                            map-options
                            @update:model-value="onSelectPublisher"
                            v-model="inputBook.publishers"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            readonly
                            v-model="inputBook.DateOfPublication"
                            label="Date of Publication"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-lg">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBook.Pages"
                            label="Pages"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBook.Series"
                            label="Series"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-sm">
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="inputBook.Book_Status"
                            :options="options1"
                            label="Status"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputBook.Notes"
                            label="Notes"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="inputBook.Availability"
                            :options="options2"
                            label="Availability"
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
              <!------------------------------------------------------------- DELETE BOOK BUTTON   -----------------------------------------------------------------    --->
              <q-btn
                color="red-8"
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                round
                dense
                @click="deleteSpecificBook(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { exportFile } from "quasar";
import {
  BookDto,
  BorrowerDto,
  CategoryDto,
  IssuedBookDto,
  PublisherDto,
} from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";

function wrapCsvValue(
  val: string,
  formatFn?: (v: string, r: any) => string,
  row?: any
) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

@Options({
  computed: {
    ...mapState("book", ["allBook"]),
    ...mapState("category", ["allCategory"]),
    ...mapState("publisher", ["allPublisher"]),

    ...mapState("issuedbook", ["allIssuedBook"]),
    ...mapState("borrower", ["allBorrower"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("book", ["addBook", "editBook", "deleteBook", "getAllBook"]),
    ...mapActions("auth", ["authUser"]),
  },
})
export default class LibrarianIndex extends Vue {
  allBook!: BookDto[];
  allCategory!: CategoryDto[];
  allPublisher!: PublisherDto[];

  allBorrower!: BorrowerDto[];
  allIssuedBook!: IssuedBookDto[];

  addBook!: (payload: BookDto) => Promise<void>;
  editBook!: (payload: BookDto) => Promise<void>;
  deleteBook!: (payload: BookDto) => Promise<void>;
  getAllBook!: () => Promise<void>;

  async mounted() {
    await this.getAllBook();
  }

  pagination = {};
  cancelEnabled = true;
  addNewBook = false;
  editRowBook = false;
  filter = "";
  dialog = false;
  Details = false;

  options1 = ["New Arrival", "Damaged", "Lost", "Outdated"];
  options2 = ["YES", "NO"];

  columns = [
    {
      name: "Details",
      align: "center",
      field: "Details",
    },
    {
      name: "action",
      align: "center",
      label: "Action",
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
      name: "author",
      label: "Author/s",
      align: "left",
      field: (row: any) => row.Author,
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
      name: "availability",
      label: "Availability",
      align: "center",
      field: "Availability",
    },
  ];

  // ----------------------------- E X P O R T TABLE-------------------------------------
  exportTable() {
    // naive encoding to csv format
    const header = [
      wrapCsvValue("Book ID"),
      wrapCsvValue("Title"),
      wrapCsvValue("ISBN"),
      wrapCsvValue("Call Number"),
      wrapCsvValue("Author/s"),
      wrapCsvValue("Edition"),
      wrapCsvValue("Category"),
      wrapCsvValue("Publisher"),
      wrapCsvValue("Date Of Publication"),
      wrapCsvValue("Pages"),
      wrapCsvValue("Series"),
      wrapCsvValue("Status"),
      wrapCsvValue("Notes"),
      wrapCsvValue("Availability"),
    ];
    const rows = [header.join(",")].concat(
      this.allBook.map((c) =>
        [
          wrapCsvValue(String(c.Book_ID)),
          wrapCsvValue(c.Title),
          wrapCsvValue(c.ISBN),
          wrapCsvValue(String(c.Call_Number)),
          wrapCsvValue(c.Author),
          wrapCsvValue(String(c.Edition)),
          wrapCsvValue(String(c.categories?.C_Description)),
          wrapCsvValue(String(c.publishers?.Publisher)),
          wrapCsvValue(String(c.DateOfPublication)),
          wrapCsvValue(String(c.Pages)),
          wrapCsvValue(String(c.Series)),
          wrapCsvValue(c.Book_Status),
          wrapCsvValue(String(c.Notes)),
          wrapCsvValue(c.Availability),
        ].join(",")
      )
    );

    const status = exportFile(
      "List of Books_ MSU ISED LIBRARY-export.csv",
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

  // -----------------------------------------------------------------------

  inputBook: BookDto = {
    ISBN: "",
    Call_Number: "",
    Title: "",
    Author: "",
    Edition: "",
    DateOfPublication: "",
    Pages: "",
    Series: "",
    Notes: "",
    Book_Status: "New Arrival",
    Availability: "YES",
  };
  onSelectPublisher(publisher: any) {
    this.inputBook.DateOfPublication = publisher.DateOfPublication;
  }
  async onaddBook() {
    await this.addBook(this.inputBook);
    this.addNewBook = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
  }

  async oneditBook() {
    await this.editBook(this.inputBook);
    this.editRowBook = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Edit.",
    });
  }

  deleteSpecificBook(val: BookDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteBook(val.Book_ID as any);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: BookDto) {
    this.editRowBook = true;
    this.inputBook = { ...val };
  }

  openDialog(val: BookDto) {
    this.Details = true;
    this.inputBook = { ...val };
  }

  resetModel() {
    this.inputBook = {
      ISBN: "",
      Call_Number: "",
      Title: "",
      Author: "",
      Edition: "",
      DateOfPublication: "",
      Pages: "",
      Series: "",
      Notes: "",
      Book_Status: "New Arrival",
      Availability: "YES",
    };
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
