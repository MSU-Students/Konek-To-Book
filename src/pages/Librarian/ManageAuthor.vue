<template>
  <q-page class="bg-image1">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_Author ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-deep-purple-9 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW Author BUTTON  ------------------------------------------    --->
        <q-tab
          name="Author"
          icon="person_add"
          label="Add Author"
          @click="addNewAuthor = true"
        />
        <q-dialog v-model="addNewAuthor" persistent>
          <q-card style="width: 750px; max-width: 100vw">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="person" />
                </q-avatar>
                <div class="text-h6">Add New Author</div>
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
              <q-form @submit="onaddAuthor()" class="q-px-md">
                <div class="q-gutter-md row q-pb-md">
                  <div class="col">
                    <q-input
                      autofocus
                      dense
                      outlined
                      v-model="inputAuthor.A_First_Name"
                      label="First Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the first name',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAuthor.A_Middle_Name"
                      label="Middle Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the middle name',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputAuthor.A_Last_Name"
                      label="Last Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the last name',
                      ]"
                    />
                  </div>
                </div>
                <div class="q-gutter-md q-pb-md">
                  <q-input
                    dense
                    outlined
                    v-model="inputAuthor.Location"
                    label="Location"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'Input the location',
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
    <!--------------------------------  TABLE_ LISTS OF Author  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of Authors"
        :rows="allAuthor"
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

        <!--------------------------------  EDIT AUTHOR  ------------------------------------------    --->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              round
              color="blue"
              icon="edit"
              size="sm"
              flat
              dense
              @click="openEditDialog(props.row)"
            />
            <q-dialog v-model="editRowAuthor" persistent>
              <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
                <q-card-section class="row">
                  <q-toolbar>
                    <q-avatar size="50px">
                      <q-icon name="person" />
                    </q-avatar>
                    <div class="text-h6">Edit Author</div>
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      v-close-popup
                      @click="resetModel()"
                    />
                  </q-toolbar>
                </q-card-section>

                <q-card-section>
                  <q-form @submit="oneditAuthor()" class="q-px-md">
                    <div class="q-gutter-md row q-pb-md">
                      <div class="col-md-2">
                        <q-input
                          dense
                          outlined
                          readonly
                          label="Author ID"
                          v-model="inputAuthor.Author_ID"
                        />
                      </div>

                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAuthor.A_First_Name"
                          label="First Name"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Input the first name',
                          ]"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAuthor.A_Middle_Name"
                          label="Middle Name"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Input the middle name',
                          ]"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          dense
                          outlined
                          v-model="inputAuthor.A_Last_Name"
                          label="Last Name"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Input the last name',
                          ]"
                        />
                      </div>
                    </div>
                    <div class="q-gutter-md q-pb-lg">
                      <q-input
                        dense
                        outlined
                        v-model="inputAuthor.Location"
                        label="Location"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Input the location',
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
            <!----------------------------- DELETE BUTTON ----------------------------->
            <q-btn
              color="red-8"
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              round
              dense
              @click="deleteSpecificAuthor(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { AuthorDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";
@Options({
  computed: {
    ...mapState("author", ["allAuthor"]),
  },
  methods: {
    ...mapActions("author", [
      "addAuthor",
      "editAuthor",
      "deleteAuthor",
      "getAllAuthor",
    ]),
  },
})
export default class ManageAuthor extends Vue {
  allAuthor!: AuthorDto[];
  addAuthor!: (payload: AuthorDto) => Promise<void>;
  editAuthor!: (payload: AuthorDto) => Promise<void>;
  deleteAuthor!: (payload: AuthorDto) => Promise<void>;
  getAllAuthor!: () => Promise<void>;

  async mounted() {
    await this.getAllAuthor();
  }

  pagination = {};
  filter = "";
  dialog = false;

  showAuthorDetails = false;
  addNewAuthor = false;
  cancelEnabled = true;
  editRowAuthor = false;
  AuthorDetails = "";

  columns = [
    {
      name: "Authorid",
      required: true,
      align: "center",
      label: "Author ID",
      field: "Author_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "First Name",
      align: "center",
      field: (row: AuthorDto) => row.A_First_Name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "middlename ",
      label: "Middle name",
      align: "center",
      field: "A_Middle_Name",
    },
    {
      name: "lastname",
      label: "Last Name",
      align: "center",
      field: "A_Last_Name",
      sortable: true,
    },
    {
      name: "location",
      label: "Location",
      align: "center",
      field: "Location",
      sortable: true,
    },

    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
  ];

  inputAuthor: AuthorDto = {
    A_First_Name: "",
    A_Middle_Name: "",
    A_Last_Name: "",
    Location: "",
  };

  async onaddAuthor() {
    await this.addAuthor(this.inputAuthor);
    this.addNewAuthor = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
  }

  async oneditAuthor() {
    await this.editAuthor(this.inputAuthor);
    this.editRowAuthor = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Edit.",
    });
  }

  deleteSpecificAuthor(val: AuthorDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteAuthor(val.Author_ID as any);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: AuthorDto) {
    this.editRowAuthor = true;
    this.inputAuthor = { ...val };
  }

  resetModel() {
    this.inputAuthor = {
      A_First_Name: "",
      A_Middle_Name: "",
      A_Last_Name: "",
      Location: "",
    };
  }
}
</script>
