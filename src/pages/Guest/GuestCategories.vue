<template>
  <q-page class="bg-image2">
    <div class="q-pl-lg">
      <div class="text-h5 q-pa-lg text-bold">
        <q-icon name="ballot" color="orange-6" style="font-size: 5rem" />
        Categories List
      </div>
    </div>
    <!--------------------------------  TABLE_ LISTS OF BOOKS  ------------------------------------------    --->
    <div class="q-pl-lg">
      <q-table
        grid
        card-class="bg-teal-7 text-white"
        :rows="allCategory"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
      >
        <template v-slot:top-right>
          <div class="search">
            <q-input
              autofocus
              rounded
              dense
              bg-color="white"
              outlined
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
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
    ...mapActions("category", ["getAllCategory"]),
  },
})
export default class GuestCategories extends Vue {
  allCategory!: CategoryDto[];
  getAllCategory!: () => Promise<void>;

  async mounted() {
    await this.getAllCategory();
  }

  filter = "";

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
}
</script>
