<template>
  <q-page class="bg-image">
     <!--------------------------------  TAB_MENU ------------------------------------------    --->
  <q-tabs
        key=""
        v-model="tab"
        inline-label
        dense
        width = "100px"
        :breakpoint="0"
        align="left"
        class="bg-orange-9 text-white shadow-2"
      >
     <q-tab
          name="back"
          icon="reply"
          @click="() => $router.replace('/')"
        />
        <q-tab
          name="book"
          icon="collections_bookmark"
          label="Books"
          @click="() => $router.replace('/GuestIndex')"
        />
        <q-tab name="categories" icon="book" label="Categories"  @click="() => $router.replace('/GuestCategories')" />
         <q-space />
        <q-tab
          v-if="$q.screen.gt.sm"
          name="login"
          icon="logout"
          label="Login"
          @click="() => $router.replace('/LoginForm')" />
        </q-tabs>
 <!--------------------------------  TABLE_ LISTS OF BOOKS  ------------------------------------------    --->
  <div class="q-pa-md">
    <q-table
      grid
      card-class="bg-blue-grey-8 text-white"
      title="Lists of Available Categories"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header

    >
      <template v-slot:top-right>
        <div class="search">
        <q-input rounded dense bg-color= "white" outlined color="light-green-9" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        </div>
         <q-page-scroller
           position="bottom-right"
           :scroll-offset="150"
           :offset="[18,18]" >
            <q-btn fab icon="keyboard_arrow_up"  color="orange-9" text-color="white"  />
         </q-page-scroller>
      </template>
    </q-table>
  </div>

  </q-page>
</template>

<script lang = 'ts'>
import { ref } from 'vue'
interface IRow {
  name: string;
}
const columns = [
  { name: 'categoryid', align: 'center', label: 'Category ID', field: 'categoryid', sortable: true },
  {
    name: 'desc',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: IRow) => row.name,
    format: (val: string) => `${val}`,
    sortable: true
  },
]

const rows = [
   {
    categoryid: '001',
    name: 'Circulation',
  },
  {
    categoryid: '002',
    name: 'Reference',
  },
  {
    categoryid: '003',
    name: 'New Arrivals',
  },
  {
    categoryid: '004',
    name: 'Theses',
  },
  {
    categoryid: '005',
    name: 'Filipiniana-000',
  },
  {
    categoryid:'006'  ,
    name: 'Capstone Project',
  },
  {
    categoryid: '009',
    name: 'Filipiniana-1',
  },
  {
    categoryid:'010'  ,
    name: 'Capstone Project-009',
  },
   {
    categoryid: '009',
    name: 'Filipiniana-2',
  },
  {
    categoryid:'010'  ,
    name: 'Capstone Project-989',
  },
]

export default {
  setup () {
    return {
      filter: ref(''),
      columns,
      rows
    }
  }
}
</script>
