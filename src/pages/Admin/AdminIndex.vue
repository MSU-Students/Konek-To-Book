<template>
  <q-page class="bg-image">
    <div class="col q-col-gutter-md q-ma-sm absolute-right"></div>
    <div class="q-ma-xl">
      <div class="q-ma-xl">
        <div class="q-pl-lg">
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">

            <q-card style="width: 500px">
              <q-card-section
                :class="$q.dark.isActive ? 'brown-6_dark' : 'bg-brown-7'"
                class="text-white"
                style="height: 150px"
              >
               <div class="row">
              <div class="col-10">
                <div class="text-h5">Librarians</div>
                <div class="text-h4 text-bold">04</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="people" />
              </div>
            </div>
          </q-card-section>
            </q-card>
          </div>
        </div>

    <div class="q-pt-md">
      <div class="q-pl-lg">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card style="width: 500px">
            <q-card-section
              :class="$q.dark.isActive ? 'red-7_dark' : 'bg-red-7'"
              class="text-white"
              style="height: 150px"
            >
               <div class="row">
              <div class="col-10">
                <div class="text-h5">Total of Accounts</div>
                <div class="text-h4 text-bold">06</div>
              </div>
              <div class="col-2">
               <q-icon size="62px" name="trending_up" />
              </div>
            </div>
          </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="q-pt-md">
      <div class="q-pl-lg">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card style="width: 500px">
            <q-card-section
              :class="$q.dark.isActive ? 'warning' : 'bg-teal-8'"
              class="text-white"
              style="height: 150px"
            >
              <div class="row">
              <div class="col-10">
                <div class="text-h6">Admins</div>
                <div class="text-h5">
                  <q-icon name="arrow_downward" />
                  year 2020-2021
                </div>
              </div>
            </div>
          </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="absolute-right q-pa-md">
      <div class="q-pr-xl">
       <div class="q-pa-xl">
         <div class="q-pt-xl q-pt-md " height = '480px'
              width= '2000px'>
           <q-date
              v-model="date"
              landscape
              color="lime-9"

            />
       </div>
       </div>
      </div>
    </div>
    </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
     const date = ref('2021/09/17')

    return {
       date,
      time: ref('10:56'),
    }
    }
  }
</script>
