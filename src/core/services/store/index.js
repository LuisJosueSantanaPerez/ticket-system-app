import Vue from "vue";
import Vuex from "vuex";

// module
import auth from "./auth/auth.module";
import ticket from "./ticket/ticket.module";
import employee from "./employee/employee.module";
import report from "./report/report.module";
import category from "./category/category.module";
import status from "./status/status.module";
import priority from "./priority/priority.module";
import kind from "./kind/kind.module";
import timeEntry from "./time-entry/timeentry.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    ticket,
    employee,
    report,
    category,
    status,
    priority,
    kind,
    timeEntry,
  },
});
