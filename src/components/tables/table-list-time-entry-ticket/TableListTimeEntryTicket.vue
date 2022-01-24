<template>
  <b-table
    id="table-time-entry"
    striped
    hover
    show-empty
    :fields="fields"
    :items="timeEntry"
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

    <!-- Begin::Action  -->
    <template #cell(actions)="{ item }">
      <div>
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
</template>

<script>
import globalMixin from "@/core/mixins/global-mixin";
import configMessage from "@/core/config/config-message-swall";
export default {
  name: "TableListTimeEntryTicket",
  mixins: [globalMixin],
  props: {
    timeEntry: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: [
        {
          key: "employee",
          label: "Employee",
        },
        {
          key: "date_to",
          label: "Date",
        },
        {
          key: "note",
          label: "note",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
      busy: false,
    };
  },
  methods: {
    async getTicketTimeEntry({ id }) {
      try {
        const { data } = await this.$store.dispatch("timeEntry/getATicket", id);
        return data.entries;
      } catch (e) {
        console.log(e);
      }
    },
    async edit({ item }) {
      const { id } = item;
      console.log("table List Time Entry", item);
      this.$emit("editTimeEntry", id);
    },
    async del({ item }) {
      try {
        await this.$swal(configMessage.confirm_delete).then(
          async ({ isConfirmed }) => {
            if (isConfirmed) {
              this.busy = true;
              await this.$store.dispatch("timeEntry/deleteATimeEntry", item);
              this.$emit("refreshTimeEntry");
            }
          }
        );
        this.busy = false;
      } catch (e) {
        await this.$swal(configMessage.error);
        this.busy = false;
      }
    },
  },
};
</script>

<style scoped></style>
