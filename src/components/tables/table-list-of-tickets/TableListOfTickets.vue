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
                v-b-tooltip.hover
                title="Show Filters"
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
                  :animation="busy ? 'spin-pulse' : ''"
                  font-scale="1.4"
                  v-b-tooltip.hover
                  title="Refresh data"
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
                  <b-col xl="3">
                    <b-form-group label="Category:" label-for="category">
                      <b-form-select
                        id="category"
                        class="mr-2"
                        v-model="filters.selectedCategories"
                        :options="categories"
                      >
                        <template #first>
                          <b-form-select-option value="" disabled
                            >-- Please select an option --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>

                  <b-col xl="3">
                    <b-form-group label="Status:" label-for="status">
                      <b-form-select
                        id="status"
                        class="mr-2"
                        v-model="filters.selectedStatus"
                        :options="statuses"
                      >
                        <template #first>
                          <b-form-select-option value="" disabled
                            >-- Please select an option --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>

                  <b-col xl="3">
                    <b-form-group label="Priority:" label-for="priority">
                      <b-form-select
                        id="priority"
                        class="mr-2"
                        v-model="filters.selectedPriorities"
                        :options="priorities"
                      >
                        <template #first>
                          <b-form-select-option value="" disabled
                            >-- Please select an option --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>

                  <b-col xl="3">
                    <b-form-group label="Kind:" label-for="kind">
                      <b-form-select
                        id="kind"
                        class="mr-2"
                        v-model="filters.selectedKind"
                        :options="kinds"
                      >
                        <template #first>
                          <b-form-select-option value="" disabled
                            >-- Please select an option --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
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
              id="table-tickets"
              striped
              hover
              show-empty
              :fields="fields"
              :items="tickets"
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

              <!-- Begin:: kind -->
              <template #cell(kind)="{ item }">
                {{ item.kind.name }}
              </template>
              <!-- End:: kind -->

              <!-- Begin:: category -->
              <template #cell(category)="{ item }">
                {{ item.category.name }}
              </template>
              <!-- End:: category -->

              <!-- Begin:: priority -->
              <!-- Begin:: priority -->
              <template #cell(priority)="{ item }">
                {{ item.priority.name }}
              </template>
              <!-- End:: priority -->

              <!-- Begin:: status -->
              <template #cell(status)="{ item }">
                {{ item.status.name }}
              </template>
              <!-- End:: status -->

              <!-- Begin::Action  -->
              <template #cell(actions)="{ item }">
                <div class="text-truncate">
                  <!-- Begin::Entry Time -->
                  <b-icon
                    class="cursor-pointer mr-2"
                    icon="eye"
                    style="cursor: pointer; color: #000000"
                    v-b-tooltip.hover
                    title="Ticket information"
                    @click="showTicketInformation({ item: item })"
                  ></b-icon>
                  <!-- End::Entry Time -->

                  <!-- Begin::Entry Time -->
                  <b-icon
                    class="cursor-pointer mr-2"
                    icon="clock"
                    style="cursor: pointer; color: #000000"
                    v-b-tooltip.hover
                    title="Time Entry Form"
                    @click="showTimeEntryForm({ item: item })"
                  ></b-icon>
                  <!-- End::Entry Time -->

                  <!-- Begin::Edit  -->
                  <b-icon
                    class="cursor-pointer mr-2"
                    icon="pencil-square"
                    style="cursor: pointer; color: #ffc107"
                    @click="edit({ item: item })"
                    v-b-tooltip.hover
                    title="Edit the ticket"
                  ></b-icon>
                  <!-- End::Edit  -->
                  <!-- Begin::Delete  -->
                  <b-icon
                    class="cursor-pointer"
                    icon="trash"
                    style="cursor: pointer; color: #dc3545"
                    @click="del({ item: item })"
                    v-b-tooltip.hover
                    title="Delete the ticket"
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
              :total-rows="tickets.length"
              :per-page="perPage"
              aria-controls="table-list-of-tickets"
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
import { mapState } from "vuex";
import configMessage from "@/core/config/config-message-swall";

export default {
  name: "TableCurrencies",
  mixins: [globalMixin],
  props: {
    tickets: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.getListOfTickets();
  },
  watch: {
    "filters.search": async function () {
      try {
        this.busy = true;
        await this.getListOfTickets();
        this.busy = false;
      } catch (e) {
        this.busy = false;
      }
    },
    "filters.selectedCategories": async function () {
      try {
        this.busy = true;
        await this.getListOfTickets();
        this.busy = false;
      } catch (e) {
        this.busy = false;
      }
    },
    "filters.selectedStatus": async function () {
      try {
        this.busy = true;
        await this.getListOfTickets();
        this.busy = false;
      } catch (e) {
        this.busy = false;
      }
    },
    "filters.selectedPriorities": async function () {
      try {
        this.busy = true;
        await this.getListOfTickets();
        this.busy = false;
      } catch (e) {
        this.busy = false;
      }
    },
    "filters.selectedKind": async function () {
      try {
        this.busy = true;
        await this.getListOfTickets();
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
          key: "ticket_number",
          label: "ID",
        },
        {
          key: "date",
          label: "Date Created",
        },
        {
          key: "title",
          label: "Description",
        },
        {
          key: "created_by",
          label: "Employee",
        },
        {
          key: "kind",
          label: "Kind",
        },
        {
          key: "category",
          label: "Categories",
        },
        {
          key: "priority",
          label: "Priorities",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
      filters: {
        search: "",
        selectedCategories: "",
        selectedStatus: "",
        selectedPriorities: "",
        selectedKind: "",
      },
      perPage: 10,
      currentPage: 1,
      showFilter: false,
      busy: false,
      busyFilter: false,
    };
  },
  computed: {
    ...mapState("category", {
      categories: (state) =>
        state.categories.map((item) =>
          Object.assign({}, { value: item.id, text: item.name })
        ),
    }),
    ...mapState("status", {
      statuses: (state) =>
        state.statues.map((item) =>
          Object.assign({}, { value: item.id, text: item.name })
        ),
    }),
    ...mapState("priority", {
      priorities: (state) =>
        state.priorities.map((item) =>
          Object.assign({}, { value: item.id, text: item.name })
        ),
    }),
    ...mapState("kind", {
      kinds: (state) =>
        state.kinds.map((item) =>
          Object.assign({}, { value: item.id, text: item.name })
        ),
    }),
  },
  methods: {
    refreshData() {
      try {
        this.busy = true;
        setTimeout(() => {
          this.getListOfTickets();
          this.busy = false;
        }, 500);
      } catch (e) {
        this.busy = true;
      }
    },
    showTicketInformation({ item }) {
      this.$emit("showTicketInformation", { item });
    },
    showTimeEntryForm({ item }) {
      this.$emit("showTimeEntryForm", { item });
    },
    resetFilters() {
      this.busyFilter = true;
      setTimeout(() => {
        this.filters = {
          search: "",
          selectedCategories: "",
          selectedStatus: "",
          selectedPriorities: "",
          selectedKind: "",
        };
        this.busyFilter = false;
      }, 200);
    },
    edit({ item }) {
      this.$emit("editTicket", { item });
    },
    del({ item }) {
      const { id } = item;
      this.$swal(configMessage.confirm_delete).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            await this.$store.dispatch("ticket/deleteATicket", id);
            await this.$swal(configMessage.success_delete);
          } catch (e) {
            await this.$swal(configMessage.error_delete_credentials);
          }
          this.refreshData();
        }
      });
    },
    async getListOfTickets() {
      const query = {
        q: this.filters.search,
        category: this.filters.selectedCategories,
        kind: this.filters.selectedKind,
        status: this.filters.selectedStatus,
        priority: this.filters.selectedPriorities,
        page: 1,
        per_page: 10,
      };
      try {
        await this.$store.dispatch("ticket/getListOfTickets", query);
        await this.$router
          .replace({ name: "tickets", query: query })
          .catch(() => {});
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
