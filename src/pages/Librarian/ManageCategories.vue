<template>
  <q-page class="bg-image1">
    <div class="text-h4 text-teal-9 q-pb-lg q-pt-lg text-bold flex flex-center">
      <q-icon
        class="q-pr-sm"
        name="book"
        color="teal-9"
        style="font-size: 3rem"
      />
      Manage Categories
    </div>
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_CATEGORIES ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-teal-9 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW CATEGORIES BUTTON  ------------------------------------------    --->
        <q-tab
          name="addCategory"
          icon="library_add"
          label="Add Category"
          @click="addNewCategory = true"
        />
        <q-dialog v-model="addNewCategory" persistent>
          <q-card style="width: 600px; max-width: 70vw" class="q-pa-md">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="person" />
                </q-avatar>
                <div class="text-h6">Add Category</div>
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
              <q-form @submit="onaddCategory()" class="q-px-md">
                <div class="q-gutter-md q-pb-lg">
                  <q-input
                    autofocus
                    dense
                    outlined
                    v-model="inputCategory.C_Description"
                    label="Category Name"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Input the category name',
                    ]"
                  />
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
        <!--------------------------------  Export CSV _ CATEGORIES ------------------------------------------    --->
        <q-tab
          name="Export"
          icon="archive"
          label="Export to csv"
          @click="exportTable"
        />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE LIST OF CATEGORIES  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="Category List"
        :rows="allCategory"
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
          <div class="q-pa-md q-gutter-sm row">
            <q-page-scroller
              position="bottom-right"
              :scroll-offset="150"
              :offset="[15, 15]"
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

        <!--------------------------------  EDIT CATEGORY   ------------------------------------------    --->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-md">
              <q-btn
                round
                color="teal-7"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowCategory" persistent>
                <q-card style="width: 600px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <q-toolbar>
                      <q-avatar size="50px">
                        <q-icon name="person" />
                      </q-avatar>
                      <div class="text-h6">Edit Category</div>
                      <q-space />
                      <q-btn
                        flat
                        round
                        icon="close"
                        v-close-popup
                        @click="resetModel()"
                      />
                    </q-toolbar>
                  </q-card-section>

                  <q-card-section>
                    <q-form @submit="oneditCategory()" class="q-px-md">
                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            readonly
                            label="Category ID"
                            v-model="inputCategory.Category_ID"
                          />
                        </div>

                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputCategory.C_Description"
                            label="Category Name"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the category name',
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
              <!----------------------------- DELETE BUTTON ----------------------------->
              <q-btn
                color="red-8"
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                round
                dense
                @click="deleteSpecificCategory(props.row)"
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
import { CategoryDto } from "src/services/rest-api";
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
    ...mapState("category", ["allCategory"]),
  },
  methods: {
    ...mapActions("category", [
      "addCategory",
      "editCategory",
      "deleteCategory",
      "getAllCategory",
    ]),
  },
})
export default class ManageCategories extends Vue {
  allCategory!: CategoryDto[];
  addCategory!: (payload: CategoryDto) => Promise<void>;
  editCategory!: (payload: CategoryDto) => Promise<void>;
  deleteCategory!: (payload: CategoryDto) => Promise<void>;
  getAllCategory!: () => Promise<void>;

  async mounted() {
    await this.getAllCategory();
  }

  cancelEnabled = true;
  addNewCategory = false;
  editRowCategory = false;

  filter = "";
  dialog = false;
  pagination = {};

  columns = [
    {
      name: "categoryid",
      align: "center",
      label: "Category ID",
      field: "Category_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "Name",
      align: "left",
      field: (row: CategoryDto) => row.C_Description,
      format: (val: string) => `${val}`,
      sortable: true,
    },

    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
  ];

  // ------------------E X P O R T TABLE-------------------------------------
  exportTable() {
    // naive encoding to csv format
    const header = [wrapCsvValue("Category ID"), wrapCsvValue("Name")];
    const rows = [header.join(",")].concat(
      this.allCategory.map((c) =>
        [
          wrapCsvValue(String(c.Category_ID)),
          wrapCsvValue(c.C_Description),
        ].join(",")
      )
    );

    const status = exportFile(
      "List of Categories_MSU ISED LIBRARY-export.csv",
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

  // -------------------------------------------------------------------------

  inputCategory: CategoryDto = {
    C_Description: "",
  };

  async onaddCategory() {
    await this.addCategory(this.inputCategory);
    this.addNewCategory = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
  }

  async oneditCategory() {
    await this.editCategory(this.inputCategory);
    this.editRowCategory = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Update.",
    });
  }

  deleteSpecificCategory(val: CategoryDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteCategory(val.Category_ID as any);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: CategoryDto) {
    this.editRowCategory = true;
    this.inputCategory = { ...val };
  }

  resetModel() {
    this.inputCategory = {
      C_Description: "",
    };
  }
}
</script>
