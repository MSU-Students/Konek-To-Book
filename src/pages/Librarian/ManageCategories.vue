<template>
  <q-page class="bg-image1">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_CATEGORY ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-teal-8 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW CATEGORY BUTTON  ------------------------------------------    --->
        <q-tab
          name="addCategory"
          label="Add Category"
          icon="library_add"
          @click="addNewCategory = true"
        />
        <q-dialog v-model="addNewCategory">
          <q-card style="width: 400px">
            <q-card-section class="row">
              <div class="text-h6">Add Category</div>
              <q-space />
              <q-btn flat round dense icon="close" v-close-popup />
            </q-card-section>

            <q-card-section class="q-gutter-md">
              <q-input outlined v-model="categoryname" label="Category Name" />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="red-10" v-close-popup />
              <q-btn flat label="Save" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!--------------------------------  Print CATEGORIES  ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!-------------------------------  TABLE_ LISTS OF CATEGORIES  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        ref="tableRef"
        tabindex="0"
        title="List of Categories"
        :rows="allCategory"
        :columns="columns"
        row-key="name"
        :pagination="pagination"
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

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <div>
              <q-td>
                <!------------------------------------- EDIT Categrory BUTTON   ------------------------------------------    --->
                <q-btn
                  round
                  color="teal-8"
                  icon="edit"
                  size="sm"
                  flat
                  dense
                  @click="editRowCategory = true"
                />
                <q-dialog v-model="editRowCategory">
                  <q-card style="width: 400px">
                    <q-card-section class="row">
                      <div class="text-h6">Edit Category</div>
                      <q-space />
                      <q-btn flat round dense icon="close" v-close-popup />
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                      <q-input
                        outlined
                        v-model="categoryid"
                        readonly
                        label="Category ID"
                      />
                      <q-input
                        outlined
                        v-model="categoryname"
                        label="Category Name"
                      />
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="Cancel" color="red-10" v-close-popup />
                      <q-btn flat label="Save" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
                <!--------------------------------------- DELETE CATEGORY BUTTON   ------------------------------------------    --->
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
                        v-close-popup="cancelEnabled"
                        :disable="!cancelEnabled"
                      />
                      <q-btn
                        flat
                        label="Confirm"
                        color="primary"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </q-td>
            </div>

            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
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
  categoryid = "";
  categoryname = "";
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
