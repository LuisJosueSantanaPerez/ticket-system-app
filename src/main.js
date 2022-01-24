import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
import { VERIFY_AUTH } from "@/core/services/store/auth/auth.module";

// plugins
import "@/core/plugins/bootstrap-vue.js";

Vue.config.productionTip = false;

ApiService.init();

router.beforeEach((to, from, next) => {
  // checked auth before each page load.
  Promise.all([store.dispatch(`auth/${VERIFY_AUTH}`)])
    .then(next)
    .catch(() => {});

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
