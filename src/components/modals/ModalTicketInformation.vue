<template>
  <!-- begin:: modal   -->
  <b-modal
    v-model="modalShow"
    id="modal-employee"
    :title="`Ticket ${ticket.ticket_number}`"
    size="lg"
  >
    <b-row>
      <b-col xl="12">
        <b-row class="mb-3">
          <b-col xl="2">
            <h5>Ticket #:</h5>
          </b-col>
          <b-col xl="8">
            <span>{{ ticket.ticket_number | replaceTheNumeral }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="2" class="mb-3">
            <h5>Subject:</h5>
          </b-col>
          <b-col xl="8" class="">
            <span>{{ ticket.title }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="2" class="mb-3">
            <h5>Date:</h5>
          </b-col>
          <b-col xl="3" clas>
            <span>{{ ticket.date }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="2" class="mb-3">
            <h5>Create by:</h5>
          </b-col>
          <b-col xl="2" clas>
            <span>{{ ticket.created_by }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="2">
            <h5>Description:</h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="8">
            <span class="text-black-45">{{ ticket.description }}</span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-card no-body class="mt-2">
      <b-tabs pills card vertical>
        <b-tab title="Time Entry" active>
          <TableListTimeEntryTicket
            @editTimeEntry="editTimeEntry"
            @refreshTimeEntry="freshDataTimeEntryAndAssignedEmployee"
            :timeEntry="ticket.entries"
          />
        </b-tab>
        <b-tab title="Employee Assigned">
          <TableListAssignedEmployeeTicket
            @refreshAssignedEmployee="freshDataTimeEntryAndAssignedEmployee"
            :employees="ticket.employees"
          />
        </b-tab>
      </b-tabs>
    </b-card>
  </b-modal>
  <!-- end::modal   -->
</template>

<script>
import globalMixin from "@/core/mixins/global-mixin";

export default {
  name: "ModalTicketInformation",
  mixins: [globalMixin],
  props: {
    ticket: {
      type: Object,
      default: () => {
        return {
          id: 0,
          ticket_number: "",
          date: "",
          title: "",
          description: "",
          created_by: "",
        };
      },
    },
  },
  components: {
    TableListAssignedEmployeeTicket: () =>
      import(
        "@/components/tables/table-list-assigned-employee-ticket/TableListAssignedEmployeeTicket"
      ),
    TableListTimeEntryTicket: () =>
      import(
        "@/components/tables/table-list-time-entry-ticket/TableListTimeEntryTicket"
      ),
  },
  created() {},
  data() {
    return {
      modalShow: false,
      busy: false,
    };
  },
  methods: {
    modalHandler() {
      this.modalShow = !this.modalShow;
    },
    freshDataTimeEntryAndAssignedEmployee() {
      this.$emit("freshDataTimeEntryAndAssignedEmployee");
    },
    editTimeEntry(id) {
      this.$emit("editTimeEntry", id);
      this.modalHandler();
    },
  },
};
</script>

<style scoped></style>
