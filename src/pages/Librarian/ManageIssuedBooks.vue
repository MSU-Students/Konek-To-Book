<template>
  <q-page class="bg-image1">
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
          @click="addNewIssuedBook = true"
        />
        <q-dialog v-model="addNewIssuedBook" persistent>
          <q-card style="width: 1150px; max-width: 250vw" class="q-pa-md">
            <q-card-section class="row q-pa-md">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="local_library" />
                </q-avatar>
                <div class="text-h6">Add IssuedBook</div>
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
              <q-form @submit="onaddIssuedBook()" class="q-px-md">
                <div class="q-gutter-md row q-pb-md">
                  <div class="col-md-3">
                    <q-select
                      autofocus
                      outlined
                      dense
                      :options="options1"
                      label="Book_ID"
                      lazy-rules
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputIssuedBook.Title"
                      readonly
                      label="Title"
                    />
                  </div>
                </div>

                <div class="q-gutter-md row q-pb-md">
                  <div class="col-md-2">
                    <q-select
                      dense
                      outlined
                      :options="options2"
                      label="Borrower ID"
                      lazy-rules
                    />
                  </div>
                  <div class="col-md-4">
                    <q-input
                      dense
                      outlined
                      v-model="inputIssuedBook.Borrower_Name"
                      readonly
                      label="Borrower Name"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputIssuedBook.Borrow_Date"
                      type="date"
                      hint="Borrow Date"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the borrow date',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputIssuedBook.Due_Date"
                      type="date"
                      hint="Due Date"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the due date',
                      ]"
                    />
                  </div>
                </div>

                <div class="q-gutter-md row q-pb-md">
                  <div class="col">
                    <q-input
                      outlined
                      dense
                      v-model="inputIssuedBook.Book_Status"
                      readonly
                      label="Book Status"
                    />
                  </div>
                  <div class="col">
                    <q-select
                      outlined
                      dense
                      v-model="inputIssuedBook.IssuedBook_Status"
                      :options="options3"
                      label="IssuedBook Status"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Select the issuedbook status',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-select
                      outlined
                      dense
                      :options="options4"
                      label="BookFines ID"
                    />
                  </div>
                </div>

                <div align="right">
                  <q-btn
                    flat
                    label="Cancel"
                    color="red-10"
                    @click="resetModel()"
                    v-close-popup
                  />
                  <q-btn
                    flat
                    label="Save"
                    color="primary"
                    v-close-popup
                    type="submit"
                  />
                </div>
              </q-form>
            </q-card-section>
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
        :rows="allIssuedBook"
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
        <!------------------------------------- EDIT ISSUEDBOOK BUTTON   ------------------------------------------    --->
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
                @click="editRowIssuedBook = true"
              />
              <q-dialog v-model="editRowIssuedBook" persistent>
                <q-card style="width: 1150px; max-width: 250vw" class="q-pa-lg">
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

                  <q-card-section>
                    <q-form @submit="oneditIssuedBook()" class="q-px-sm">
                      <div class="q-gutter-md row q-pb-sm">
                        <div class="col-md-3">
                          <q-input
                            dense
                            outlined
                            readonly
                            label="IssuedBook ID"
                          />
                        </div>
                        <div class="col-md-3">
                          <q-select
                            autofocus
                            outlined
                            dense
                            :options="options1"
                            label="Book_ID"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Select the Book ID',
                            ]"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputIssuedBook.Title"
                            readonly
                            label="Title"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row">
                        <div class="col-md-2">
                          <q-select
                            dense
                            outlined
                            :options="options2"
                            label="Borrower ID"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Select the Borrower ID',
                            ]"
                          />
                        </div>
                        <div class="col-md-4">
                          <q-input
                            dense
                            outlined
                            v-model="inputIssuedBook.Borrower_Name"
                            readonly
                            label="Borrower Name"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputIssuedBook.Borrow_Date"
                            type="date"
                            hint="Borrow Date"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the borrow date',
                            ]"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputIssuedBook.Due_Date"
                            type="date"
                            hint="Due Date"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Input the due date',
                            ]"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row">
                        <div class="col">
                          <q-input
                            outlined
                            dense
                            v-model="inputIssuedBook.Book_Status"
                            readonly
                            label="Book Status"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            v-model="inputIssuedBook.IssuedBook_Status"
                            :options="options3"
                            label="IssuedBook Status"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Select the issuedbook status',
                            ]"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            dense
                            :options="options4"
                            label="BookFines ID"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Select the BookFines ID',
                            ]"
                          />
                        </div>
                      </div>

                      <div align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-10"
                          @click="resetModel()"
                          v-close-popup
                        />
                        <q-btn
                          flat
                          label="Save"
                          color="primary"
                          v-close-popup
                          type="submit"
                        />
                      </div>
                    </q-form>
                  </q-card-section>
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
                @click="deleteSpecificIssuedBook(props.row)"
              />
              <q-dialog v-model="deleteSpecificIssuedBook" persistent>
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

<!--------------------------------------- Information OF ISSUEDBOOK    ------------------------------------------    --->
<script lang="ts">
import {
  BookDto,
  BookFinesDto,
  BorrowerDto,
  IssuedBookDto,
} from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapState, mapActions } from "vuex";

@Options({
  computed: {
    ...mapState("issuedbook", ["allIssuedBook"]),
    ...mapState("book", ["allBook"]),
    ...mapState("borrower", ["allBorrower"]),
    ...mapState("book-fines", ["allBookFines"]),
  },
  methods: {
    ...mapActions("issuedbook", [
      "addIssuedBook",
      "editIssuedBook",
      "deleteIssuedBook",
      "getAllIssuedBook",
    ]),
  },
})
export default class ManageIssuedBooks extends Vue {
  allIssuedBook!: IssuedBookDto[];
  allBook!: BookDto[];
  allBorrower!: BorrowerDto[];
  allBookFines!: BookFinesDto[];

  addIssuedBook!: (payload: IssuedBookDto) => Promise<void>;
  editIssuedBook!: (payload: IssuedBookDto) => Promise<void>;
  deleteIssuedBook!: (payload: IssuedBookDto) => Promise<void>;
  getAllIssuedBook!: () => Promise<void>;

  async mounted() {
    await this.getAllIssuedBook();
    console.log(this.allIssuedBook);
  }

  pagination = {};
  confirmDelete = false;
  cancelEnabled = true;
  addNewIssuedBook = false;
  editRowIssuedBook = false;
  filter = '';
  dialog = false;

  options1 = ["001", "02", "003", "006", "078", "0672", "0898", "04332"];
  options2 = ["01", "02", "03", "04", "05", "06", "021", "034"];
  options3 = ["Issued/Borrowed", "Lost", "Return"];
  options4 = ["001", "002", "003", "004", "005", "021", "034"];

  columns = [
    {
      name: "issuedbookID",
      align: "center",
      label: "IssuedBook ID",
      field: "IssuedBook_ID",
      sortable: true,
    },
    {
      name: "bookID",
      align: "center",
      label: "Book ID",
      field: "Book_ID",
      sortable: true,
    },
    {
      name: "borrowerID",
      align: "center",
      label: "Borrower ID",
      field: "Borrower_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "Title",
      align: "center",
      field: (row: IssuedBookDto) => row.Title,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "borrowname",
      label: "Borrower Name",
      align: "center",
      field: "Borrower_Name",
    },
    {
      name: "borrowdate",
      label: "Borrow Date",
      align: "center",
      field: "Borrow_Date",
    },
    { name: "duedate ", label: "Due Date", align: "center", field: "Due_Date" },
    {
      name: "bookstatus",
      label: "Book Status",
      align: "center",
      field: "Book_Status",
    },
    {
      name: "issuedbookstatus",
      label: "IssuedBook Status",
      align: "center",
      field: "IssuedBook_Status",
    },
    {
      name: "bookfinesid",
      label: "BookFines ID",
      align: "center",
      field: "BookFines_ID",
    },
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
  ];

  inputIssuedBook: IssuedBookDto = {
    Title: "",
    Borrower_Name: "",
    Borrow_Date: "",
    Due_Date: "",
    Book_Status: "",
    IssuedBook_Status: "",
  };

  async onaddIssuedBook() {
    await this.addIssuedBook(this.inputIssuedBook);
    this.addNewIssuedBook = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
  }

  async oneditIssuedBook() {
    await this.editIssuedBook(this.inputIssuedBook);
    this.editRowIssuedBook = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Edit.",
    });
  }

  deleteSpecificIssuedBook(val: IssuedBookDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteIssuedBook(val.IssuedBook_ID as any);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: IssuedBookDto) {
    this.editRowIssuedBook = true;
    this.inputIssuedBook = { ...val };
  }

  resetModel() {
    this.inputIssuedBook = {
      Title: "",
      Borrower_Name: "",
      Borrow_Date: "",
      Due_Date: "",
      Book_Status: "",
      IssuedBook_Status: "",
    };
  }
}
</script>
