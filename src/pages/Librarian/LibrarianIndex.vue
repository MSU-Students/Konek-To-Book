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
                <div class="q-gutter-md q-pb-sm">
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

                <div class="q-gutter-md row q-pb-sm">
                  <div class="col">
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
                    <q-select
                      dense
                      outlined
                      label="Author"
                      :options="allAuthor"
                      option-label="A_First_Name"
                      optine-value="Author_ID"
                      map-options
                      emit-value
                      v-model="inputBook.authors"
                    />
                  </div>
                  <div class="col">
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
                </div>

                <div class="q-gutter-md row q-pb-sm">
                  <div class="col">
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
                  <div class="col">
                    <q-select
                      dense
                      outlined
                      label="Category"
                      :options="allCategory"
                      option-label="C_Description"
                      optine-value="C_Description"
                      map-options
                      emit-value
                      v-model="inputBook.categories"
                    />
                  </div>
                </div>

                <div class="q-gutter-md row q-pb-lg">
                  <div class="col">
                    <q-select
                      dense
                      outlined
                      label="Publisher"
                      :options="allPublisher"
                      option-label="Publisher"
                      optine-value="Publisher"
                      map-options
                      emit-value
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

                <div class="q-gutter-md row q-pb-lg">
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

        <!--------------------------------  -------------Print BOOK ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
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
                @click="Details = true"
              />

              <q-dialog v-model="Details">
                <q-card style="width: 500px; max-width: 90vw" flat bordered>
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
                      <div
                        class="text-h6 text-center text-orange-10 q-ma-mp q-mb-xs"
                      >
                        Data Structures and Algorithms
                      </div>
                      <q-space />
                      <div class="text-center q-ma-mp q-mb-xs">
                        ISBN: 9865-865
                      </div>
                      <div class="text-center q-ma-mp q-mb-xs">CallNo: 906</div>
                      <div class="text-center q-ma-mp q-mb-xs">
                        Author: Sarah Jay
                      </div>
                      <div class="text-center q-ma-mp q-mb-xs">
                        Edition: 2nd Ed
                      </div>
                      <div class="text-center q-ma-mp q-mb-xs">
                        Category: Reference
                      </div>
                      <div class="text-center q-ma-mp q-mb-xs">
                        Publisher: 2026-2029
                      </div>
                      <div class="text-center q-ma-mp q-mb-xs">
                        Date 0f Publication: 567890
                      </div>
                      <div class="text-center q-ma-mp q-mb-xs">Pages: ii</div>
                      <div class="text-center q-ma-mp q-mb-xs">
                        Series: 2nd Ed
                      </div>
                      <div class="text-center q-ma-mp q-mb-xs">Status: New</div>
                      <div class="text-center q-ma-mp q-mb-xs">
                        Notes: From California
                      </div>
                      <div class="text-center q-ma-mp q-mb-xs">
                        Availability: YES
                      </div>
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="col-8 text-italic flex flex-center">
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
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowBook" persistent>
                <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
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
                    <q-form @submit="oneditBook()" class="q-px-sm">
                      <div class="q-gutter-md row q-pb-sm">
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

                      <div class="q-gutter-md row q-pb-sm">
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
                            :options="allAuthor"
                            option-label="A_First_Name"
                            optine-value="A_First_Name"
                            map-options
                            emit-value
                            v-model="inputBook.authors"
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

                      <div class="q-gutter-md row q-pb-sm">
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
                            optine-value="C_Description"
                            map-options
                            emit-value
                            v-model="inputBook.categories"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-sm">
                        <div class="col">
                          <q-select
                            dense
                            outlined
                            label="Publisher"
                            :options="allPublisher"
                            option-label="Publisher"
                            optine-value="Publisher"
                            map-options
                            emit-value
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

                      <div class="q-gutter-md row q-pb-lg">
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
                      @click="resetModel()"
                      v-close-popup="cancelEnabled"
                      :disable="!cancelEnabled"
                    />
                    <q-btn flat label="Confirm" color="primary" v-close-popup />
                  </q-card-actions>
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
    ...mapActions("book", ["addBook", "editBook", "deleteBook", "getAllBook"]),
  },
})
export default class LibrarianIndex extends Vue {
  allBook!: BookDto[];
  allAuthor!: AuthorDto[];
  allCategory!: CategoryDto[];
  allPublisher!: PublisherDto[];

  addBook!: (payload: BookDto) => Promise<void>;
  editBook!: (payload: BookDto) => Promise<void>;
  deleteBook!: (payload: BookDto) => Promise<void>;
  getAllBook!: () => Promise<void>;

  async mounted() {
    await this.getAllBook();
    console.log(this.allBook);
  }

  pagination = {};
  cancelEnabled = true;
  addNewBook = false;
  editRowBook = false;
  filter = "";
  dialog = false;
  Details = false;

  options1 = ["New", "Damage", "Lost", "Outdated", "Obsolete"];
  options2 = ["YES", "NO"];

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
      field: "DateOfPublication",
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

  resetModel() {
    this.inputBook = {
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
  }
}
</script>
