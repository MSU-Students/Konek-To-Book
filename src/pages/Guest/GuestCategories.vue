<template>
  <q-page class="bg-image2">
    <div class="text-h4 text-teal-9 q-pb-lg q-pt-lg text-bold flex flex-center">
      <q-icon
        class="q-pr-sm"
        name="ballot"
        color="orange-6"
        style="font-size: 4rem"
      />
      Category List
    </div>

    <!--------------------------------  TABLE_ LISTS OF BOOKS  ------------------------------------------    --->
    <div class="q-pl-lg">
      <q-table
        grid
        card-class="bg-teal-9 text-white"
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
      label: "",
      field: "Category_ID",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "",
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
