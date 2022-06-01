<template>
  <q-page class="bg-image2">
    <div class="q-pl-md bg-image flex flex-center">
      <div>
        <div>
          <q-card flat class="bg-transparent">
            <div class="text-h5 q-pa-lg text-bold flex flex-center text-white">
              <q-icon name="auto_stories" style="font-size: 2rem" />
              WELCOME TO OUR
              <div
                class="text-h5 q-pa-xs text-bold flex flex-center text-orange-6"
              >
                ISED LIBRARY
              </div>
              <q-separator color="red-9 " width="60%" />
            </div>

            <div class="text-h9 q-gutter-lg flex flex-center text-white">
              We stand behind your success
            </div>
          </q-card>
        </div>

        <div class="q-pa-md q-gutter-sm row">
          <q-input
            outlined
            rounded
            dense
            bg-color="white"
            debounce="500"
            v-model="filter"
            placeholder="Search"
            style="width: 50rem"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <q-separator inset />

    <div>
      <div style="width:100%, max-width: 1200px">
        <q-tabs
          v-model="tab"
          align="justify"
          narrow-indicator
          active-color="white"
          active-bg-color="primary"
        >
          <q-tab
            class="text-caption text-primary"
            name="ListBooks"
            label="All Books"
            icon="library_books"
          />
          <q-tab
            class="text-caption text-primary"
            name="available"
            label="Available Books"
            icon="bookmark_added"
          />
          <q-tab
            class="text-caption text-primary"
            name="notavail"
            label="Not Available Books"
            icon="not_interested"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-white text-center">
          <q-tab-panel name="ListBooks">
            <!--  ------------------------------------------ TABLE OF ALL BOOKS------------------------------------------ ------------------------->
            <div class="q-gutter-lg">
              <q-table
                :rows="allBook"
                :columns="columns"
                row-key="name"
                :rows-per-page-options="[0]"
                :filter="filter"
              >
                <!-- <template v-slot:body-cell-name="props">
                  <q-td :props="props">
                    <div>
                      <q-badge color="orange-5" :label="props.value" />
                    </div>
                    <div class="my-table-details">
                      {{ props.row.details }}
                    </div>
                  </q-td>
                </template> -->

                <template v-slot:top-right>
                  <div class="q-pa-md q-gutter-sm row">
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
                  </div>
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
                        <q-card style="width: 500px; max-width: 100vw" my-card>
                          <q-card-section class="bg-grey-1">
                            <div class="text-subtitle2">
                              {{ inputBook.Book_ID }}
                            </div>
                            <div class="text-h6 text-center">
                              {{ inputBook.Title }}
                            </div>
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
              </q-table>
            </div>
          </q-tab-panel>

          <!------------------------------------------AVAILABLE BOOKS Panel--------------------------------------------------->
          <q-tab-panel name="available" class="bg-white">
            <available />
          </q-tab-panel>

          <!---------------------------------------NOT AVAILABLE BOOKS Panel-------------------------------->
          <q-tab-panel name="notavail" class="bg-white">
            <notavail />
          </q-tab-panel>
        </q-tab-panels>
        <br />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { BookDto, CategoryDto, PublisherDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";
import available from "src/components/Books/available.vue";
import notavail from "src/components/Books/notavail.vue";

@Options({
  components: {
    available,
    notavail,
  },

  computed: {
    ...mapState("book", ["allBook"]),
    ...mapState("category", ["allCategory"]),
    ...mapState("publisher", ["allPublisher"]),
  },
  methods: {
    ...mapActions("book", ["getAllBook"]),
  },
})
export default class GuestIndex extends Vue {
  allBook!: BookDto[];
  allCategory!: CategoryDto[];
  allPublisher!: PublisherDto[];

  getAllBook!: () => Promise<void>;

  async mounted() {
    await this.getAllBook();
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
      font: "bold",
    },

    {
      name: "author",
      label: "Author/s",
      align: "left",
      field: (row: any) => row.Author || "None",
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
    Author: "",
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

<style>
.my-table-details {
  font-size: 0.95em;
  font-style: bold;
  max-width: 500px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
