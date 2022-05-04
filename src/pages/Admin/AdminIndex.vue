<template>
  <q-page class="bg-image3">
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
                    <div class="text-h5">Borrowers</div>
                    <div class="text-h4 text-bold"> {{ allBorrower.length }}</div>
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
                      <div class="text-h4 text-bold">
                        {{ allAccount.length }}
                      </div>
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
                      <div class="text-h6">Total of Books</div>
                      <div class="text-h5">
                        <q-icon name="book" />
                        {{ allBook.length }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { BookDto, BorrowerDto, UserDto } from "src/services/rest-api";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  computed: {
    ...mapState("account", ["allAccount"]),
    ...mapState("book", ["allBook"]),
     ...mapState("borrower", ["allBorrower"]),
  },
  methods: {
    ...mapActions("account", ["getAllUser"]),
  },
})
export default class AdminIndex extends Vue {
  allAccount!: UserDto[];
  allBook!: BookDto[];
  allBorrower!: BorrowerDto[];

  getAllUser!: () => Promise<void>;

  async mounted() {
    await this.getAllUser();
    console.log(this.allAccount);
  }

  date = "2021/09/17";
  time = "10:56";
}
</script>
