<template>
  <div v-if="isAuthenticated">
    <!-- begin:: Header -->
    <Header />
    <!-- end:: Header -->
    <!-- begin:: Body -->
    <div class="container">
      <transition name="fade-in-up">
        <router-view />
      </transition>
    </div>
    <!-- begin:: Body -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  components: {
    Header: () => import("@/views/layout/header/Header"),
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    ...mapGetters({ isAuthenticated: "auth/isAuthenticated" }),
  },
};
</script>

<style scoped></style>
