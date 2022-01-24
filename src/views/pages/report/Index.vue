<template>
  <b-card class="my-3">
    <b-card-header class="d-flex justify-content-between">
      <h3>Reports</h3>
      <div>
        <b-button
          type="button"
          variant="outline-primary"
          @click="generateReport"
          class="mx-1"
          >{{ "Generate report" }}</b-button
        >
      </div>
    </b-card-header>
    <TableListOfReports ref="TableListOfReports" />
  </b-card>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Report",
  components: {
    TableListOfReports: () =>
      import("@/components/tables/table-list-of-reports/TableListOfReports"),
  },
  methods: {
    generateReport() {
      this.$refs.TableListOfReports.generateReport();
    },
  },
};
</script>

<style scoped></style>
