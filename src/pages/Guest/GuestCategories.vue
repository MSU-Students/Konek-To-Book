<template>
  <q-page class="bg-image2">
    <!--------------------------------  TABLE_ LISTS OF BOOKS  ------------------------------------------    --->
    <div class="q-pa-md">
      <q-table
        grid
        card-class="bg-white text-black"
        title="Lists of Available Categories"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
      >
        <template v-slot:top-right>
          <div class="search">
            <q-input
              rounded
              dense
              bg-color="white"
              outlined
              color="light-green-9"
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
import { Vue, Options } from "vue-class-component";
interface IRow {
  name: string;
}
Options({});

export default class GuestCategories extends Vue {
  filter = "";

  columns = [
    {
      name: "categoryid",
      align: "center",
      label: "Category ID",
      field: "categoryid",
      sortable: true,
    },
    {
      name: "desc",
      required: true,
      label: "Name",
      align: "left",
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
      sortable: true,
    },
  ];

  rows = [
    {
      categoryid: "001",
      name: "Circulation",
    },
    {
      categoryid: "002",
      name: "Reference",
    },
    {
      categoryid: "003",
      name: "New Arrivals",
    },
    {
      categoryid: "004",
      name: "Theses",
    },
    {
      categoryid: "005",
      name: "Filipiniana-000",
    },
    {
      categoryid: "006",
      name: "Capstone Project",
    },
    {
      categoryid: "009",
      name: "Filipiniana-1",
    },
    {
      categoryid: "010",
      name: "Capstone Project-009",
    },
    {
      categoryid: "009",
      name: "Filipiniana-2",
    },
    {
      categoryid: "010",
      name: "Capstone Project-989",
    },
  ];
}
</script>
