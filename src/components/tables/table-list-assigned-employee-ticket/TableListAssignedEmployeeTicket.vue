<template>
  <b-table
    id="table-employees"
    striped
    hover
    show-empty
    :fields="fields"
    :items="employees"
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
import configMessage from "@/core/config/config-message-swall";

export default {
  name: "TableListAssignedEmployeeTicket",
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: [
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
          key: "actions",
          label: "Actions",
        },
      ],
      busy: false,
    };
  },
  methods: {
    async del({ item }) {
      try {
        await this.$swal(configMessage.confirm_delete).then(
          async ({ isConfirmed }) => {
            if (isConfirmed) {
              this.busy = true;
              await this.$store.dispatch("timeEntry/deleteATimeEntry", item);
              this.$emit("refreshAssignedEmployee");
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
