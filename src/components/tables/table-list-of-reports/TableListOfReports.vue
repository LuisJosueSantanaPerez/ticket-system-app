<template>
  <div>
    <!-- Begin::Row  -->
    <b-row>
      <!-- Begin::Col  -->
      <b-col xl="12">
        <!-- Begin::Card -->
        <b-card class="mt-1">
          <!-- Begin::Row  -->
          <b-row>
            <!-- Begin::Col -->
            <b-col xl="12" class="d-flex justify-content-between">
              <!-- Begin::Button for show filter -->
              <b-icon
                class="mx-2"
                icon="filter-left"
                font-scale="1.4"
                style="cursor: pointer"
                aria-controls="show-filter"
                @click="showFilter = !showFilter"
              ></b-icon>
              <!-- End::Button for show filter -->
            </b-col>
            <!-- End::Col -->

            <!-- Begin::Filter  -->
            <b-col xl="12">
              <b-collapse id="show-filter" v-model="showFilter" class="mt-2">
                <!-- Begin::Row  -->
                <b-row>
                  <b-col xl="3">
                    <b-form-group
                      label="Date From:"
                      label-for="date-from"
                      invalid-feedback="Date from is required"
                    >
                      <b-form-input
                        type="datetime-local"
                        v-model="$v.filters.dateFrom.$model"
                        :state="validateState({ name: 'dateFrom' })"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col xl="3">
                    <b-form-group
                      label="Date To:"
                      label-for="date-to"
                      invalid-feedback="Date to is required"
                    >
                      <b-form-input
                        type="datetime-local"
                        v-model="$v.filters.dateTo.$model"
                        :state="validateState({ name: 'dateTo' })"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <!-- Begin::Row  -->
              </b-collapse>
              <!-- Begin::Filter  -->
            </b-col>
            <!-- Begin::Filter  -->
          </b-row>
          <!-- End::Row  -->
          <!-- Begin::Table -->
          <div class="overflow-auto">
            <b-table
              id="table-employees"
              striped
              hover
              show-empty
              sticky-header
              :fields="fields"
              :items="reports"
              :busy="busy"
            >
              <!-- Begin::Busy -->
              <template #table-busy>
                <div class="text-center my-2">
                  <b-spinner class="align-middle" variant="primary"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <!-- End::Busy -->
              <!-- Begin::empty -->
              <template #empty>
                <div class="text-center">
                  <strong>{{ "No Data" }}</strong>
                </div>
              </template>
              <!-- End::empty -->

              <template #cell(tickets)="{ item }">
                <pre>{{ item.tickets[0].ticket_number }}</pre>
              </template>
              <!-- End::empty -->

              <!-- Begin::date from -->
              <template #cell(date_from)="{ item }">
                <span class="text-truncate">{{ item.date_from }}</span>
              </template>
              <!-- End::date from -->

              <!-- Begin::date from -->
              <template #cell(date_to)="{ item }">
                <span class="text-truncate">{{ item.date_to }}</span>
              </template>
              <!-- End::date from -->

              <!-- Begin::Employee -->
              <template #cell(employee)="{ item }">
                {{ item.employee.first_name }}
              </template>
              <!-- End::Employee -->

              <!-- Begin:: Quantity hours -->
              <template #cell(hours)="{ item }">
                {{ item.time }}
              </template>
              <!-- End:: Quantity hours -->
            </b-table>
            <div class="d-flex justify-content-end mx-5">
              <span class="text-black-38"
                >Total: {{ this.accumulatedTime }}</span
              >
            </div>
          </div>
          <!-- End::Table  -->
        </b-card>
        <!-- End::Card -->
      </b-col>
      <!-- End::Col  -->
    </b-row>
    <!-- End::Row  -->
  </div>
</template>

<script>
import moment from "moment";
import configMessage from "@/core/config/config-message-swall";
import globalMixin from "@/core/mixins/global-mixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  name: "TableListOfReports",
  mixins: [validationMixin, globalMixin],
  validations() {
    return {
      filters: {
        dateFrom: {
          required,
        },
        dateTo: {
          required,
        },
      },
    };
  },
  computed: {
    ...mapState("report", {
      reports: (state) => state.reports,
    }),
  },
  data() {
    return {
      fields: [
        {
          key: "tickets",
          label: "ID",
        },
        {
          key: "employee",
          label: "Employee",
        },
        {
          key: "date_from",
          label: "Date From",
        },
        {
          key: "date_to",
          label: "Date End",
        },
        {
          key: "note",
          label: "Note",
        },
        {
          key: "hours",
          label: "Hours",
        },
      ],
      filters: {
        dateFrom: "",
        dateTo: "",
      },
      showFilter: true,
      busy: false,
      accumulatedTime: 0,
    };
  },
  methods: {
    validateState({ name }) {
      const { $dirty, $error } = this.$v.filters[name];
      return $dirty ? !$error : null;
    },
    async generateReport() {
      try {
        // valid form
        this.$v.filters.$touch();
        if (this.$v.filters.$anyError) {
          return null;
        }
        this.busy = true;
        const dateFrom = moment(this.filters.dateFrom).format(
          "YYYY-MM-DD hh:mm:ss"
        );
        const dateTo = moment(this.filters.dateTo).format(
          "YYYY-MM-DD hh:mm:ss"
        );
        await this.$store.dispatch("report/generateReport", {
          dateFrom,
          dateTo,
        });
        this.accumulatedTime = this.calculatingTotalHours();
        this.busy = false;
      } catch (e) {
        this.busy = false;
        await this.$swal(configMessage.error);
      }
    },
    calculatingTotalHours() {
      let sumHours = 0;
      this.reports.forEach(({ time }) => (sumHours += time));
      return sumHours;
    },
  },
};
</script>

<style scoped></style>
