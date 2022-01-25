<template>
  <div class="body">
    <!-- begin:: card  -->
    <b-card
      header-bg-variant="dark"
      header-text-variant="white"
      header="Please sign in"
      align="center"
      class="form-sign-in"
      style="max-width: 25rem; min-height: 20rem"
    >
      <!-- begin:: form-->
      <b-form @submit.stop.prevent="onSubmit">
        <!-- begin:: email-->
        <b-form-group
          label="Email"
          label-for="merchant-account-code"
          class="my-5"
        >
          <b-form-input
            id="email"
            name="email"
            type="email"
            v-model.trim="$v.form.email.$model"
            @input="$v.form.email.$reset()"
            @blur="$v.form.email.$touch()"
            :state="validateState({ name: 'email' })"
          ></b-form-input>
          <b-form-invalid-feedback id="email-live-feedback">
            {{ "Email is required" }}
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- end:: email-->
        <!-- begin:: password-->
        <b-form-group
          label="Password"
          label-for="merchant-account-code"
          class="my-5"
        >
          <b-form-input
            id="password"
            name="password"
            type="password"
            v-model.trim="$v.form.password.$model"
            @input="$v.form.password.$reset()"
            @blur="$v.form.password.$touch()"
            autocomplete="false"
            :state="validateState({ name: 'password' })"
          ></b-form-input>
          <b-form-invalid-feedback id="password-live-feedback">
            <div v-if="!$v.form.password.required">Password is required.</div>
            <div v-if="!$v.form.password.minLength">
              Password must have at least
              {{ $v.form.password.$params.minLength.min }} letters.
            </div>
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- end:: password-->
        <b-button block variant="outline-primary" type="submit">
          <div v-if="isBusy">
            <b-spinner small></b-spinner>
            <span class="sr-only">Loading...</span>
          </div>
          <div v-else>
            <span>Login</span>
          </div>
        </b-button>
      </b-form>
      <p class="mt-3 mb-3 text-muted text-center">
        © 2007–{{ new Date().getFullYear() }}
      </p>
      <!-- form:: password-->
    </b-card>
    <!-- end:: card  -->
  </div>
</template>

<script>
// mixins
import { validationMixin } from "vuelidate";
// libs
import { required, minLength } from "vuelidate/lib/validators";
import globalMixin from "@/core/mixins/global-mixin";
import configMessage from "@/core/config/config-message-swall";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  mixins: [validationMixin, globalMixin],
  validations: {
    form: {
      email: {
        required,
        minLength: minLength(5),
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isBusy: false,
    };
  },
  methods: {
    /**
     * Validate form
     * @param name
     * @returns {boolean|null}
     */
    validateState({ name }) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    /**
     * Reset form
     */
    onReset() {
      this.form = {
        email: "",
        password: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    /**
     * Save information
     */
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;
      this.isBusy = true;
      // clear existing errors
      this.$store.dispatch("auth/logout");
      const { email, password } = this.form;
      setTimeout(() => {
        this.$store
          .dispatch("auth/login", {
            email,
            password,
            device: "web",
          })
          .then(() => this.$router.push({ name: "tickets" }))
          .catch(() => {
            this.$swal(configMessage.auth_error_credentials);
            this.isBusy = false;
          });
        this.isBusy = false;
      }, 2000);
    },
  },
};
</script>

<style scoped lang="stylus">
.body
  display: flex;
  padding-top: 60px;
  padding-bottom: 60px;
  align-items: center;
  background-color: #f6f6f6;
.form-sign-in
  width: 100%;
  max-width: 450px;
  margin: auto;
</style>
