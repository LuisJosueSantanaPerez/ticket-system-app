<template>
  <b-card class="my-3">
    <b-card-header class="d-flex justify-content-between">
      <h3>Tickets</h3>
      <div class="d-flex justify-content-between">
        <!-- Begin:: Button Entry  -->
        <div v-if="isTimeEntryForm">
          <b-button
            type="button"
            v-b-tooltip.hover
            :title="isEditFormTimeEntry ? 'Edit time entry' : 'Save time entry'"
            :variant="
              isEditFormTimeEntry ? 'outline-warning' : 'outline-primary'
            "
            @click="onSubmitTimeEntry"
            class="mx-1"
            >{{ isEditFormTimeEntry ? "Edit" : "Save" }}</b-button
          >
        </div>
        <!-- end:: Button Entry  -->
        <!-- Begin:: Button ticket form  -->
        <div v-else>
          <b-button
            v-if="isAdd"
            type="button"
            variant="outline-success"
            v-b-tooltip.hover
            title="Add a new ticket"
            @click="add()"
            class="mx-1"
            >Add</b-button
          >
          <b-button
            v-else
            type="button"
            v-b-tooltip.hover
            :title="isEditForm ? 'Edit ticket' : 'Save ticket'"
            :variant="isEditForm ? 'outline-warning' : 'outline-primary'"
            @click="onSubmit"
            class="mx-1"
            >{{ isEditForm ? "Edit" : "Save" }}</b-button
          >
        </div>
        <div>
          <b-button
            type="button"
            variant="outline-danger"
            v-b-tooltip.hover
            title="Cancel"
            @click="onCancel"
          >
            Cancel
          </b-button>
        </div>
        <!-- end:: Button ticket form  -->
      </div>
    </b-card-header>
    <!-- Begin:: Time Entry Form -->
    <div v-if="isTimeEntryForm">
      <TimeEntryForm
        ref="TimeEntryForm"
        :ticket="ticketInformation"
        :isEditFormTimeEntry="isEditFormTimeEntry"
      />
    </div>
    <!-- End:: Time Entry Form -->

    <!-- Begin:: Form Ticket -->
    <div v-else>
      <fieldset class="m-1 border-dark" v-if="!isAdd">
        <legend>Form Ticket</legend>
        <!-- begin:: form   -->
        <form ref="formEmployee" @submit.stop.prevent="onSubmit" class="my-2">
          <b-row>
            <b-col xl="3">
              <b-form-group
                label="Subject:"
                label-for="title"
                invalid-feedback="Subject is required"
              >
                <b-form-input
                  id="title"
                  v-model="$v.form.title.$model"
                  @input="$v.form.title.$reset()"
                  @blur="$v.form.title.$touch()"
                  :state="validateState({ name: 'title' })"
                >
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col xl="3">
              <b-form-group
                label="Date From:"
                label-for="date"
                invalid-feedback="Date is required"
              >
                <b-form-input
                  type="datetime-local"
                  v-model="$v.form.date.$model"
                  :state="validateState({ name: 'date' })"
                >
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col xl="6">
              <b-form-group label="Employee(s):" label-for="employees">
                <Multiselect
                  v-model="$v.form.employees.$model"
                  :options="employees"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  placeholder="Pick some"
                  label="name"
                  track-by="name"
                  :preselect-first="false"
                  @input="$v.form.employees.$reset()"
                  @blur="$v.form.employees.$touch()"
                >
                  <template slot="selection" slot-scope="{ values, isOpen }">
                    <span
                      class="multiselect__single"
                      v-if="values.length &amp;&amp; !isOpen"
                    >
                      {{ values.length }} options selected
                    </span>
                  </template>
                </Multiselect>
                <b-form-invalid-feedback
                  :state="validateState({ name: 'employees' })"
                >
                  Select employees is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="3">
              <b-form-group label="Category:" label-for="category">
                <b-form-select
                  id="category"
                  class="mr-2"
                  v-model="$v.form.selectedCategories.$model"
                  :options="categories"
                  :state="validateState({ name: 'selectedCategories' })"
                  aria-describedby="category-live-feedback"
                >
                  <template #first>
                    <b-form-select-option value="" disabled
                      >--
                      {{ " Please select one of the options " }}
                      --</b-form-select-option
                    >
                  </template>
                </b-form-select>
                <b-form-invalid-feedback id="category-live-feedback">
                  {{ "Category is required" }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col xl="3">
              <b-form-group label="Status:" label-for="status">
                <b-form-select
                  id="status"
                  class="mr-2"
                  v-model="$v.form.selectedStatus.$model"
                  :options="statuses"
                  :state="validateState({ name: 'selectedStatus' })"
                  aria-describedby="status-live-feedback"
                >
                  <template #first>
                    <b-form-select-option value="" disabled
                      >--
                      {{ " Please select one of the options " }}
                      --</b-form-select-option
                    >
                  </template>
                </b-form-select>
                <b-form-invalid-feedback id="status-live-feedback">
                  {{ "Status is required" }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col xl="3">
              <b-form-group label="Priority:" label-for="priority">
                <b-form-select
                  id="priority"
                  class="mr-2"
                  v-model="$v.form.selectedPriorities.$model"
                  :options="priorities"
                  :state="validateState({ name: 'selectedPriorities' })"
                  aria-describedby="priority-live-feedback"
                >
                  <template #first>
                    <b-form-select-option value="" disabled
                      >--
                      {{ " Please select one of the options " }}
                      --</b-form-select-option
                    >
                  </template>
                </b-form-select>
                <b-form-invalid-feedback id="priority-live-feedback">
                  {{ "Priority is required" }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col xl="3">
              <b-form-group label="Kind:" label-for="kind">
                <b-form-select
                  id="kind"
                  class="mr-2"
                  v-model="$v.form.selectedKind.$model"
                  :options="kinds"
                  :state="validateState({ name: 'selectedKind' })"
                  aria-describedby="kind-live-feedback"
                >
                  <template #first>
                    <b-form-select-option value="" disabled
                      >--
                      {{ " Please select one of the options " }}
                      --</b-form-select-option
                    >
                  </template>
                </b-form-select>
                <b-form-invalid-feedback id="kind-live-feedback">
                  {{ "kind is required" }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-textarea
                id="description"
                v-model="form.description"
                placeholder="Description"
                rows="3"
              ></b-form-textarea>
            </b-col>
          </b-row>
        </form>
        <!-- end:: form   -->
      </fieldset>
    </div>
    <!-- End:: Form Ticket -->

    <!-- begin::Table List Of Tickets -->
    <TableListOfTickets
      @showTicketInformation="showTicketInformation"
      @showTimeEntryForm="showTimeEntryForm"
      class="my-2"
      @editTicket="editTicket"
      ref="TableListOfTickets"
      :tickets="tickets"
    />
    <!-- end::Table List Of Tickets -->

    <!-- begin::Modal Ticket Information -->
    <ModalTicketInformation
      @freshDataTimeEntryAndAssignedEmployee="
        freshDataTimeEntryAndAssignedEmployee
      "
      @editTimeEntry="editTimeEntry"
      :ticket="ticketInformation"
      ref="ModalTicketInformation"
    />
    <!-- end:: Modal Ticket Information -->
  </b-card>
</template>

<script>
import globalMixin from "@/core/mixins/global-mixin";
import moment from "moment";
import configMessage from "@/core/config/config-message-swall";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Ticket",
  mixins: [validationMixin, globalMixin],
  components: {
    TableListOfTickets: () =>
      import("@/components/tables/table-list-of-tickets/TableListOfTickets"),
    Multiselect: () => import("vue-multiselect"),
    ModalTicketInformation: () =>
      import("@/components/modals/ModalTicketInformation"),
    TimeEntryForm: () => import("@/components/form/TimeEntryForm"),
  },
  created() {
    this.$store.dispatch("ticket/getListOfTickets");
    this.$store.dispatch("employee/getListOfEmployees");
    this.$store.dispatch("category/getListOfCategories");
    this.$store.dispatch("status/getListOfStatuses");
    this.$store.dispatch("priority/getListOfPriorities");
    this.$store.dispatch("kind/getListOfKinds");
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
    ...mapState("ticket", {
      tickets: (state) => state.tickets,
    }),
    ...mapState("employee", {
      employees: (state) =>
        state.employees.map((item) =>
          Object.assign(
            {},
            { id: item.id, name: `${item.first_name} ${item.last_name}` }
          )
        ),
    }),
  },
  validations() {
    if (this.isEditForm) {
      return {
        form: {
          date: {
            required,
          },
          title: {
            required,
          },
          employees: {
            required,
          },
          selectedCategories: {
            required,
          },
          selectedStatus: {
            required,
          },
          selectedPriorities: {
            required,
          },
          selectedKind: {
            required,
          },
        },
      };
    }
    return {
      form: {
        date: {
          required,
        },
        title: {
          required,
        },
        employees: {
          required,
        },
        selectedCategories: {
          required,
        },
        selectedStatus: {
          required,
        },
        selectedPriorities: {
          required,
        },
        selectedKind: {
          required,
        },
      },
    };
  },
  data() {
    return {
      isEditForm: false,
      isAdd: true,
      ticketInformation: {},
      isTimeEntryForm: false,
      isEditFormTimeEntry: false,
      form: {
        date: "",
        title: "",
        description: "",
        employees: [],
        selectedCategories: "",
        selectedStatus: "",
        selectedPriorities: "",
        selectedKind: "",
      },
    };
  },
  methods: {
    validateState({ name }) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onReset() {
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.form = {
        date: "",
        title: "",
        description: "",
        selectedCategories: "",
        selectedStatus: "",
        selectedPriorities: "",
        selectedKind: "",
      };
      this.isAdd = true;
      this.isEditForm = false;
      this.$refs.TableListOfTickets.refreshData();
      if (this.isTimeEntryForm || this.isEditFormTimeEntry) {
        this.$refs.TimeEntryForm.onReset();
        this.isTimeEntryForm = false;
        this.isEditFormTimeEntry = false;
      }
    },
    onCancel() {
      this.$swal(configMessage.confirm_cancel).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          this.onReset();
          await this.$swal(configMessage.success);
        }
      });
    },
    add() {
      this.isAdd = false;
    },
    async getAssignedTicketsEmployees({ id }) {
      try {
        const { data } = await this.$store.dispatch(
          "ticket/getAssignedTicketsEmployees",
          id
        );
        return data;
      } catch (e) {}
    },
    async getTicketTimeEntry({ id }) {
      try {
        const { data } = await this.$store.dispatch("ticket/getATicket", id);
        return data.entries;
      } catch (e) {}
    },
    async showTicketInformation({ item }) {
      try {
        this.ticketInformation = {};
        const { id } = item;
        this.ticketInformation = await this.getAssignedTicketsEmployees({ id });
        this.ticketInformation.entries = await this.getTicketTimeEntry({ id });
        this.$refs.ModalTicketInformation.modalHandler();
      } catch (e) {
        await this.$swal(configMessage.error);
      }
    },
    async showTimeEntryForm({ item }) {
      try {
        this.ticketInformation = {};
        const { id } = item;
        this.ticketInformation = await this.getAssignedTicketsEmployees({ id });
        this.ticketInformation.employees = this.ticketInformation.employees.map(
          (item) =>
            Object.assign(
              {},
              { id: item.id, name: `${item.first_name} ${item.last_name}` }
            )
        );
        if (!this.isEditFormTimeEntry) {
          this.isTimeEntryForm = true;
        }
      } catch (e) {}
    },
    async onSubmit() {
      try {
        // valid form
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return null;
        }
        // edit
        if (this.isEditForm) {
          this.$swal(configMessage.confirm_edit).then(
            async ({ isConfirmed }) => {
              if (isConfirmed) {
                try {
                  // this.form.date = moment(this.form.date).format();
                  await this.$store.dispatch("ticket/updateATicket", this.form);
                  await this.$swal(configMessage.update);
                  this.onReset();
                  this.$refs.TableListOfTickets.refreshData();
                  return;
                } catch (e) {
                  await this.$swal(configMessage.error);
                }
              }
            }
          );
          return;
        }
        // save
        await this.$store.dispatch("ticket/createATicket", this.form);
        await this.$swal(configMessage.success);
        this.onReset();
        this.$refs.TableListOfTickets.refreshData();
      } catch (e) {
        await this.$swal(configMessage.error);
      }
    },
    onSubmitTimeEntry() {
      try {
        this.$refs.TimeEntryForm.onSubmit();
        this.isTimeEntryForm = false;
        this.isEditFormTimeEntry = false;
      } catch (e) {
        this.$swal(configMessage.error);
      }
    },
    async editTicket(ticket) {
      await this.$swal(configMessage.confirm_edit).then(async () => {
        const { item } = ticket;
        const { id } = item;
        this.isEditForm = true;
        try {
          const { data } = await this.$store.dispatch(
            "ticket/getAssignedTicketsEmployees",
            id
          );
          this.$nextTick(() => {
            this.isAdd = false;
            this.form.id = data.id;
            this.form.date = moment(data.date, "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            );
            this.form.title = data.title;
            this.form.description = data.description;
            this.form.employees = data.employees.map((item) =>
              Object.assign(
                {},
                { id: item.id, name: `${item.first_name} ${item.last_name}` }
              )
            );
            this.form.selectedCategories = data.category.id;
            this.form.selectedStatus = data.status.id;
            this.form.selectedPriorities = data.priority.id;
            this.form.selectedKind = data.kind.id;
          });
        } catch (e) {
          await this.$swal(configMessage.error);
        }
      });
    },
    freshDataTimeEntryAndAssignedEmployee() {
      this.showTicketInformation({ item: this.ticketInformation });
    },
    editTimeEntry(id) {
      this.isEditFormTimeEntry = true;
      this.isTimeEntryForm = true;
      this.showTimeEntryForm({ item: { id } });
    },
  },
};
</script>

<style scoped></style>
