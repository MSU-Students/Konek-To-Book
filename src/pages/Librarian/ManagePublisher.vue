<template>
  <q-page class="bg-image1">
    <div class="q-ma-md">
      <!--------------------------------  TAB_MENU_PUBLISHER ------------------------------------------    --->
      <q-tabs
        inline-label
        dense
        width="50px"
        align="right"
        class="bg-brown-9 text-white shadow-2"
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
                  <q-btn flat label="Save" color="primary" type="submit" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!--------------------------------  Print Publisher ------------------------------------------    --->
        <q-tab name="Print" icon="print" label="Print" />
      </q-tabs>
    </div>
    <!--------------------------------  TABLE_ LISTS OF Publisher  ------------------------------------------    --->
    <div class="q-ma-md">
      <q-table
        title="List of Publishers"
        :rows="allPublisher"
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

        <!--------------------------------  EDIT Publisher  ------------------------------------------    --->
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
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { PublisherDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";
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
    {
      name: "action",
      align: "center",
      label: "Action",
      field: "action",
    },
  ];

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
