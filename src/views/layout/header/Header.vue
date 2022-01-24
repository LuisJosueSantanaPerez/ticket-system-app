<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <router-link to="/tickets" v-slot="{ href, navigate }" custom>
        <b-navbar-brand :href="href" @click="navigate"
          >Ticket Sys</b-navbar-brand
        >
      </router-link>
      <div class="container-" style="width: 100%">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <!-- begin::navigation collapse -->
        <b-collapse id="nav-collapse" is-nav>
          <!-- begin:: menu -->
          <b-navbar-nav>
            <router-link to="/tickets" v-slot="{ href, navigate }" custom>
              <b-nav-item :href="href" @click="navigate">Tickets</b-nav-item>
            </router-link>

            <router-link to="/employees" v-slot="{ href, navigate }"
              ><b-nav-item :href="href" @click="navigate">Employees</b-nav-item>
            </router-link>

            <router-link to="/reports" v-slot="{ href, navigate }"
              ><b-nav-item :href="href" @click="navigate">Reports</b-nav-item>
            </router-link>
          </b-navbar-nav>
          <!-- end:: menu -->

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-avatar class="mx-2" size="2rem"></b-avatar>
                <span>{{ $store.state.auth.user.first_name }}</span>
              </template>
              <b-dropdown-item @click="onLogout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
        <!-- end::navigation collapse -->
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  methods: {
    onLogout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => this.$router.push({ name: "login" }));
    },
  },
};
</script>

<style scoped></style>
