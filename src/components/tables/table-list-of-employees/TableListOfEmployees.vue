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
                v-b-tooltip.hover
                title="Show filters"
                style="cursor: pointer"
                aria-controls="show-filter"
                @click="showFilter = !showFilter"
              ></b-icon>
              <!-- End::Button for show filter -->

              <div>
                <!-- Begin::Reset Filter -->
                <b-icon
                  style="cursor: pointer"
                  icon="arrow-clockwise"
                  :animation="busyFilter ? 'spin-pulse' : ''"
                  font-scale="1.4"
                  v-b-tooltip.hover
                  title="Reset Filter"
                  @click="resetFilters"
                  class="mx-2"
                ></b-icon>
                <!-- End::Reset Filter -->

                <!-- Begin::Refresh Data -->
                <b-icon
                  style="cursor: pointer"
                  icon="arrow-repeat"
                  v-b-tooltip.hover
                  title="Refresh Data"
                  :animation="busy ? 'spin-pulse' : ''"
                  font-scale="1.4"
                  @click="refreshData"
                ></b-icon>
                <!-- End::Refresh Data -->
              </div>
            </b-col>
            <!-- End::Col -->

            <!-- Begin::Filter  -->
            <b-col xl="12">
              <b-collapse id="show-filter" v-model="showFilter" class="mt-2">
                <!-- Begin::Row  -->
                <b-row>
                  <!-- Begin::employee status -->
                  <b-col xl="4">
                    <b-form-group label="Employee:" label-for="activated">
                      <b-form-select
                        class="form-control"
                        v-model="filters.selectedActivated"
                        :options="filters.activated"
                        id="activated"
                        name="activated"
                      >
                        <template #first>
                          <b-form-select-option value="" disabled
                            >-- Please select an option --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                  <!-- End::employee status  -->
                </b-row>
                <!-- Begin::Row  -->
              </b-collapse>
              <!-- Begin::Filter  -->
            </b-col>
            <!-- Begin::Filter  -->
          </b-row>
          <!-- End::Row  -->

          <!-- Begin::Row  -->
          <b-row class="my-2">
            <b-col xl="12">
              <!-- Begin:: search -->
              <b-input-group>
                <b-form-input
                  id="search"
                  v-model.trim="filters.search"
                  type="text"
                  placeholder="Search..."
                  debounce="1000"
                ></b-form-input>
              </b-input-group>
              <!-- End::search  -->
              <hr />
            </b-col>
          </b-row>
          <!-- End::Row  -->

          <!-- Begin::Table -->
          <div class="overflow-auto">
            <b-table
              id="table-employees"
              striped
              hover
              show-empty
              :fields="fields"
              :items="employees"
              :busy="busy"
              :per-page="perPage"
              :current-page="currentPage"
            >
              <!-- Begin::Busy -->
              <template #table-busy>
                <div class="text-center my-2">
                  <b-spinner class="align-middle" variant="primary"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <!-- End::Busy -->
              <!-- Begin::Is activated -->
              <template #cell(activated)="{ item }">
                {{ item.activated ? "Active" : "inactive" }}
              </template>
              <!-- End::Is activated -->

              <!-- Begin::Action  -->
              <template #cell(actions)="{ item }">
                <div>
                  <!-- Begin::Edit  -->
                  <b-icon
                    class="cursor-pointer mr-2"
                    icon="pencil-square"
                    style="cursor: pointer; color: #ffc107"
                    @click="edit({ item: item })"
                  ></b-icon>
                  <!-- End::Edit  -->
                  <!-- Begin::Delete  -->
                  <b-icon
                    class="cursor-pointer"
                    icon="trash"
                    style="cursor: pointer; color: #dc3545"
                    @click="del({ item: item })"
                  ></b-icon>
                  <!-- End::Delete  -->
                </div>
              </template>
              <!--  End::Action    -->

              <!-- Begin::empty -->
              <template #empty>
                <div class="text-center">
                  <strong>{{ "No Data" }}</strong>
                </div>
              </template>
              <!-- Begin::empty -->
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="employees.length"
              :per-page="perPage"
              aria-controls="table-list-of-employees"
            ></b-pagination>
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
// Libs
import globalMixin from "@/core/mixins/global-mixin";
import configMessage from "@/core/config/config-message-swall";

export default {
  name: "TableCurrencies",
  mixins: [globalMixin],
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.getListOfEmployees();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    "filters.selectedActivated": async function () {
      try {
        this.busy = true;
        await this.getListOfEmployees();
        this.busy = false;
      } catch (e) {
        this.busy = false;
      }
    },
    // eslint-disable-next-line no-unused-vars
    "filters.search": async function () {
      try {
        this.busy = true;
        await this.getListOfEmployees();
        this.busy = false;
      } catch (e) {
        this.busy = false;
      }
    },
  },
  data() {
    return {
      fields: [
        {
          key: "code",
          label: "ID",
        },
        {
          key: "created_at",
          label: "Date Created",
        },
        {
          key: "first_name",
          label: "First Name",
        },
        {
          key: "last_name",
          label: "Last Name",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "activated",
          label: "Status",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
      filters: {
        search: "",
        selectedActivated: 1,
        activated: [
          { value: 1, text: "Active" },
          { value: 0, text: "Inactive" },
        ],
      },
      perPage: 20,
      currentPage: 1,
      showFilter: false,
      busy: false,
      busyFilter: false,
    };
  },
  methods: {
    resetFilters() {
      this.busyFilter = true;
      setTimeout(() => {
        this.filters = {
          search: "",
          selectedActivated: 1,
          activated: [
            { value: 1, text: "Active" },
            { value: 0, text: "Inactive" },
          ],
        };
        this.busyFilter = false;
      }, 200);
    },
    refreshData() {
      try {
        this.busy = true;
        setTimeout(() => {
          this.$store.dispatch("employee/getListOfEmployees");
          this.$router
            .replace({
              name: "employees",
              query: { q: "", activated: 1, page: 1, per_page: 10 },
            })
            .catch(() => {});
          this.busy = false;
        }, 500);
      } catch (e) {
        this.busy = true;
      }
    },
    async getListOfEmployees() {
      const query = {
        q: this.filters.search,
        activated: this.filters.selectedActivated,
        page: 1,
        per_page: 10,
      };
      await this.$store.dispatch("employee/getListOfEmployees", query);
      await this.$router
        .replace({ name: "employees", query: query })
        .catch(() => {});
    },
    edit({ item = {} }) {
      this.$emit("editEmployee", { item });
    },
    del({ item = {} }) {
      const { id } = item;
      this.$swal(configMessage.confirm_delete).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            await this.$store.dispatch("employee/deleteAEmployee", id);
            await this.$swal(configMessage.success);
          } catch (e) {
            await this.$swal(configMessage.delete_auth_credentials);
          }
          this.refreshData();
        }
      });
    },
  },
};
</script>

<style scoped>
tbody[role="rowgroup"] {
  height: 200px !important;
  background-color: red;
}
</style>
