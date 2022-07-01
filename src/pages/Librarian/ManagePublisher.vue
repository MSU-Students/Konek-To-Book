<template>
  <q-page class="bg-image1">
    <div class="text-h4 text-teal-9 q-pb-lg q-pt-lg text-bold flex flex-center">
      <q-icon
        class="q-pr-sm"
        name="publish"
        color="teal-9"
        style="font-size: 3rem"
      />
      Manage Publisher
    </div>

    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_PUBLISHER ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-teal-9 text-white shadow-2"
      >
        <!--------------------------------  ADD NEW PUBLISHER BUTTON  ------------------------------------------    --->
        <q-tab
          name="Publisher"
          icon="person_add"
          label="Add Publisher"
          @click="addNewPublisher = true"
        />
        <q-dialog v-model="addNewPublisher" persistent>
          <q-card style="width: 750px; max-width: 100vw">
            <q-card-section class="row">
              <q-toolbar>
                <q-avatar size="50px">
                  <q-icon name="person" />
                </q-avatar>
                <div class="text-h6">Add New Publisher</div>
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
              <q-form @submit="onaddPublisher()" class="q-px-md">
                <div class="q-gutter-md row q-pb-md">
                  <div class="col">
                    <q-input
                      autofocus
                      dense
                      outlined
                      v-model="inputPublisher.Publisher"
                      label="Publisher"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Input the publisher',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputPublisher.DateOfPublication"
                      type="date"
                      hint="Date Of Publication"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Input the date of publication',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="inputPublisher.PlaceOfPublication"
                      label="Place Of Publication"
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
        <!--------------------------------  Export CSV _ Publisher ------------------------------------------    --->
        <q-tab
          name="Export"
          icon="archive"
          label="Export to csv"
          @click="exportTable"
        />
      </q-tabs>
    </div>

    <!--------------------------------  TABLE_ LISTS OF Publisher  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="Publisher List"
        :rows="allPublisher"
        :columns="columns"
        row-key="name"
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

        <!--------------------------------  EDIT Publisher  ------------------------------------------    --->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="teal-7"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
                ><q-tooltip class="bg-teal-7" :offset="[10, 10]">
                  Edit
                </q-tooltip></q-btn
              >
              <q-dialog v-model="editRowPublisher" persistent>
                <q-card style="width: 750px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <q-toolbar>
                      <q-avatar size="50px">
                        <q-icon name="person" />
                      </q-avatar>
                      <div class="text-h6">Edit Publisher</div>
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
                    <q-form @submit="oneditPublisher()" class="q-px-md">
                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            readonly
                            label="Publisher ID"
                            v-model="inputPublisher.Publisher_ID"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            autofocus
                            dense
                            outlined
                            v-model="inputPublisher.Publisher"
                            label="Publisher"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the publisher',
                            ]"
                          />
                        </div>
                      </div>

                      <div class="q-gutter-md row q-pb-md">
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputPublisher.DateOfPublication"
                            type="date"
                            hint="Date Of Publication"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="inputPublisher.PlaceOfPublication"
                            label="Place Of Publication"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Input the place of publication',
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
                @click="deleteSpecificPublisher(props.row)"
                ><q-tooltip class="bg-red-10" :offset="[10, 10]">
                  Delete
                </q-tooltip></q-btn
              >
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { exportFile } from "quasar";
import { PublisherDto } from "src/services/rest-api";
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
    ...mapState("publisher", ["allPublisher"]),
  },
  methods: {
    ...mapActions("publisher", [
      "addPublisher",
      "editPublisher",
      "deletePublisher",
      "getAllPublisher",
    ]),
  },
})
export default class ManagePublisher extends Vue {
  allPublisher!: PublisherDto[];
  addPublisher!: (payload: PublisherDto) => Promise<void>;
  editPublisher!: (payload: PublisherDto) => Promise<void>;
  deletePublisher!: (payload: PublisherDto) => Promise<void>;
  getAllPublisher!: () => Promise<void>;

  async mounted() {
    await this.getAllPublisher();
  }

  pagination = {};
  filter = "";
  dialog = false;
  addNewPublisher = false;
  cancelEnabled = true;
  editRowPublisher = false;
  PublisherDetails = "";

  columns = [
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
    {
      name: "publisherid",
      required: true,
      align: "center",
      label: "Publisher",
      field: "Publisher_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "Publisher",
      align: "center",
      field: (row: PublisherDto) => row.Publisher,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "dateOfPublication ",
      label: "Date Of Publication ",
      align: "center",
      field: "DateOfPublication",
    },
    {
      name: "placeOfPublication",
      label: "Place Of Publication",
      align: "center",
      field: "PlaceOfPublication",
      sortable: true,
    },
  ];

  // ------------------E X P O R T TABLE-------------------------------------
  exportTable() {
    // naive encoding to csv format
    const header = [
      wrapCsvValue("Publisher ID"),
      wrapCsvValue("Publisher"),
      wrapCsvValue("Date Of Publication"),
      wrapCsvValue("Place of Publication"),
    ];
    const rows = [header.join(",")].concat(
      this.allPublisher.map((c) =>
        [
          wrapCsvValue(String(c.Publisher_ID)),
          wrapCsvValue(String(c.Publisher)),
          wrapCsvValue(String(c.DateOfPublication)),
          wrapCsvValue(String(c.PlaceOfPublication)),
        ].join(",")
      )
    );

    const status = exportFile(
      "List of Publishers_MSU ISED LIBRARY-export.csv",
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

  // -------------------------------------------------------------------

  inputPublisher: PublisherDto = {
    Publisher: "",
    DateOfPublication: "",
    PlaceOfPublication: "",
  };

  async onaddPublisher() {
    await this.addPublisher(this.inputPublisher);
    this.addNewPublisher = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Added.",
    });
  }

  async oneditPublisher() {
    await this.editPublisher(this.inputPublisher);
    this.editRowPublisher = false;
    this.resetModel();
    this.$q.notify({
      type: "positive",
      message: "Successfully Edit.",
    });
  }

  deleteSpecificPublisher(val: PublisherDto) {
    this.$q
      .dialog({
        message: "Confirm to delete?",
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deletePublisher(val.Publisher_ID as any);
        this.$q.notify({
          type: "warning",
          message: "Successfully removed",
        });
      });
  }

  openEditDialog(val: PublisherDto) {
    this.editRowPublisher = true;
    this.inputPublisher = { ...val };
  }

  resetModel() {
    this.inputPublisher = {
      Publisher: "",
      DateOfPublication: "",
      PlaceOfPublication: "",
    };
  }
}
</script>
<style>
.publisher_bgcolor {
  background-image: linear-gradient(to right, #0c5874, #0c5874);
}
</style>
