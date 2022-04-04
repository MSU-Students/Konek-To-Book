<template>
  <q-page class="bg-image1">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_Author ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-teal-8 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW Author BUTTON  ------------------------------------------    --->
        <q-tab
          name="addCategory"
          icon="library_add"
          label="Add Category"
          @click="addNewCategory = true"
        />
        <q-dialog v-model="addNewCategory" persistent>
          <q-card style="width: 750px; max-width: 100vw">
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
        <!--------------------------------  Print Author ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE LIST OF CATEGORIES  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of Categories"
        :rows="allCategory"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
        :filter="filter"
      >
        <template v-slot:top-right>
          <div class="q-pa-md q-gutter-sm row">
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
          </div>
        </template>

        <!--------------------------------  EDIT CATEGORY   ------------------------------------------    --->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="blue"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowCategory" persistent>
                <q-card style="width: 500px; max-width: 100vw" class="q-pa-md">
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
                      <div class="q-gutter-md q-pb-lg">
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
import { CategoryDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";

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
    debugger;
  }

  async oneditCategory() {
    await this.editCategory(this.inputCategory);
    this.editRowCategory = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Edit.",
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
        await this.deleteCategory(val);
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
