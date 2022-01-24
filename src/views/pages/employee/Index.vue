<template>
  <b-card class="my-3">
    <b-card-header class="d-flex justify-content-between">
      <h3>Employees</h3>
      <div>
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
          :title="isEditForm ? 'Edit ticket' : 'Save ticket'"
          :variant="isEditForm ? 'outline-warning' : 'outline-primary'"
          @click="onSubmit"
          class="mx-1"
          >{{ isEditForm ? "Edit" : "Save" }}</b-button
        >
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
    </b-card-header>
    <!-- begin:: form   -->
    <form
      ref="formEmployee"
      @submit.stop.prevent="onSubmit"
      class="my-2"
      v-if="!isAdd"
    >
      <b-row>
        <b-col xl="3">
          <b-form-group
            ref="firstNameInput"
            label="First Name:"
            label-for="first-name"
            invalid-feedback="First name is required"
          >
            <b-form-input
              id="first-name"
              v-model="$v.form.firstName.$model"
              @input="$v.form.firstName.$reset()"
              @blur="$v.form.firstName.$touch()"
              :state="validateState({ name: 'firstName' })"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col xl="3">
          <b-form-group
            label="Last Name:"
            label-for="last-name"
            invalid-feedback="Last name is required"
          >
            <b-form-input
              id="last-name"
              v-model="$v.form.lastName.$model"
              @input="$v.form.lastName.$reset()"
              @blur="$v.form.lastName.$touch()"
              :state="validateState({ name: 'lastName' })"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col xl="3">
          <b-form-group
            label="Email:"
            label-for="email"
            invalid-feedback="Email is required"
          >
            <b-form-input
              id="email"
              v-model="$v.form.email.$model"
              @input="$v.form.email.$reset()"
              @blur="$v.form.email.$touch()"
              :state="validateState({ name: 'email' })"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col xl="3">
          <!-- begin:: status   -->

          <b-form-group
            label="Status:"
            label-for="status"
            invalid-feedback="Status is required"
          >
            <b-checkbox
              id="status"
              invalid-feedback="Status is required"
              @input="$v.form.activated.$reset()"
              @blur="$v.form.activated.$touch()"
              :state="validateState({ name: 'activated' })"
              v-model="$v.form.activated.$model"
              >{{ $v.form.activated.$model ? "Active" : "Inactive" }}
            </b-checkbox>
          </b-form-group>
          <!-- end:: status   -->
        </b-col>
      </b-row>
      <b-row>
        <!-- begin:: password   -->
        <b-col xl="3">
          <b-form-group label="Password:" label-for="password">
            <b-form-input
              id="password"
              type="password"
              autocomplete="false"
              @input="$v.form.password.$reset()"
              @blur="$v.form.password.$touch()"
              v-model="$v.form.password.$model"
              :state="validateState({ name: 'password' })"
            >
            </b-form-input>
            <b-form-invalid-feedback>
              <div v-if="!$v.form.password.required">Password is required.</div>
              <div v-if="!$v.form.password.minLength">
                Password must have at least
                {{ $v.form.password.$params.minLength.min }} letters.
              </div>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <!-- end:: password    -->

        <!-- begin:: Repeat Password    -->
        <b-col xl="3">
          <b-form-group
            label="Confirm password:"
            label-for="confirm-password"
            invalid-feedback="Passwords must be identical."
          >
            <b-form-input
              id="confirm-password"
              type="password"
              autocomplete="false"
              @input="$v.form.repeatPassword.$reset()"
              @blur="$v.form.repeatPassword.$touch()"
              v-model.trim="$v.form.repeatPassword.$model"
              :state="validateState({ name: 'repeatPassword' })"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <!-- end:: Repeat Password    -->
      </b-row>
    </form>
    <!-- end:: form   -->
    <TableListOfEmployees
      @editEmployee="({ item }) => editEmployee(item)"
      ref="TableListOfEmployees"
      :employees="employees"
    />
  </b-card>
</template>

<script>
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import globalMixin from "@/core/mixins/global-mixin";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import configMessage from "@/core/config/config-message-swall";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Employee",
  mixins: [validationMixin, globalMixin],
  validations() {
    if (this.isEditForm) {
      return {
        form: {
          firstName: {
            required,
          },
          lastName: {
            required,
          },
          email: {
            required,
          },
          activated: {
            required,
          },
          password: {
            minLength: minLength(8),
          },
          repeatPassword: {
            sameAsPassword: sameAs("password"),
          },
        },
      };
    }
    return {
      form: {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        email: {
          required,
          email,
        },
        activated: {
          required,
        },
        password: {
          required,
          minLength: minLength(8),
        },
        repeatPassword: {
          sameAsPassword: sameAs("password"),
        },
      },
    };
  },
  components: {
    TableListOfEmployees: () =>
      import(
        "@/components/tables/table-list-of-employees/TableListOfEmployees"
      ),
  },
  created() {
    this.$store.dispatch("employee/getListOfEmployees", {
      q: "",
      activated: 1,
      page: 1,
      per_page: 10,
    });
  },
  computed: {
    ...mapState("employee", {
      employees: (state) => state.employees,
    }),
  },
  data() {
    return {
      isEditForm: false,
      isAdd: true,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        activated: true,
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        activated: true,
      };
      this.isAdd = true;
      this.isEditForm = false;
    },
    onCancel() {
      this.$swal(configMessage.confirm_cancel).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            await this.$swal(configMessage.success);
            this.onReset();
            this.$refs.TableListOfEmployees.refreshData();
          } catch (e) {}
        }
      });
    },
    add() {
      this.isAdd = false;
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
                  await this.$store.dispatch(
                    "employee/updateAEmployee",
                    this.form
                  );
                  await this.$swal(configMessage.update);
                  this.onReset();
                  this.$refs.TableListOfEmployees.refreshData();
                } catch (e) {
                  await this.$swal(configMessage.error);
                }
              }
            }
          );
          return;
        }
        // save
        const { data } = await this.$store.dispatch(
          "employee/createAEmployee",
          this.form
        );
        await this.$swal(configMessage.success);
        this.onReset();
        this.$refs.TableListOfEmployees.refreshData();
      } catch (e) {
        await this.$swal(configMessage.error);
      }
    },
    async editEmployee(employee) {
      await this.$swal(configMessage.confirm_edit).then(
        async ({ isConfirmed }) => {
          if (isConfirmed) {
            this.isAdd = false;
            this.isEditForm = true;
            const { id } = employee;
            try {
              const { data } = await this.$store.dispatch(
                "employee/getAEmployee",
                id
              );
              this.$nextTick(() => {
                this.form.id = data.id;
                this.form.firstName = data.first_name;
                this.form.lastName = data.last_name;
                this.form.email = data.email;
                this.form.activated = data.activated;
              });
            } catch (e) {}
          }
        }
      );
    },
  },
};
</script>

<style scoped></style>
