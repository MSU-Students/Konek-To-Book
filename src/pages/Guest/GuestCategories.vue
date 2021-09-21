<template>
  <div class="q-pa-md">
    <q-table
      grid
      card-class="bg-primary text-white"
      title="Lists of Available Categories"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <div class="search">
        <q-input outlined  dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'
const columns = [
  { name: 'categoryid', align: 'center', label: 'Category ID', field: 'categoryid', sortable: true },
  {
    name: 'desc',
    required: true,
    label: 'Name',
    field: 'name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
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
