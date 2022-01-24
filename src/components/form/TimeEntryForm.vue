<template>
  <div>
    <!-- Begin:: Ticket information    -->
    <fieldset class="mx-2 mt-3 border-dark">
      <legend>Ticket Information</legend>
      <b-row>
        <b-col xl="12">
          <b-row class="mb-3 text-truncate">
            <b-col xl="2">
              <h5>Ticket #:</h5>
            </b-col>
            <b-col xl="3">
              <span>{{ ticket.ticket_number | replaceTheNumeral }}</span>
            </b-col>
            <b-col xl="2">
              <h5>Status:</h5>
            </b-col>
            <b-col xl="3">
              <span>{{ ticket.status.name }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="2" class="mb-3">
              <h5>Subject:</h5>
            </b-col>
            <b-col xl="3" class="">
              <span>{{ ticket.title }}</span>
            </b-col>
            <b-col xl="2">
              <h5>Category:</h5>
            </b-col>
            <b-col xl="3">
              <span>{{ ticket.category.name }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="2" class="mb-3">
              <h5>Date:</h5>
            </b-col>
            <b-col xl="3" clas>
              <span>{{ ticket.date }}</span>
            </b-col>
            <b-col xl="2">
              <h5>Priority:</h5>
            </b-col>
            <b-col xl="3">
              <span>{{ ticket.priority.name }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="5">
              <h5>Description:</h5>
            </b-col>
            <b-col xl="2">
              <h5>Kind:</h5>
            </b-col>
            <b-col xl="3">
              <span>{{ ticket.kind.name }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="8">
              <span class="text-black-45">{{ ticket.description }}</span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </fieldset>
    <!-- End:: Ticket information    -->

    <!-- begin:: form time entry  -->
    <fieldset class="mx-2 mt-3 border-dark">
      <legend>Time Entry Form</legend>
      <form ref="TimeEntryForm" @submit.stop.prevent="onSubmit" class="my-2">
        <b-row>
          <b-col xl="6">
            <b-form-group label="Employee(s):" label-for="employees">
              <Multiselect
                v-model="$v.form.employee.$model"
                :options="ticket.employees"
                :multiple="false"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Pick some"
                label="name"
                track-by="name"
                :preselect-first="false"
                @input="$v.form.employee.$reset()"
                @blur="$v.form.employee.$touch()"
              >
                <template slot="selection" slot-scope="{ values, isOpen }">
                  <span
                    class="multiselect__single"
                    v-if="values.length &amp;&amp; !isOpen"
                  >
                    {{ values.length }} options selected
                  </span>
                </template>
              </Multiselect>
              <b-form-invalid-feedback
                :state="validateState({ name: 'employee' })"
              >
                Select employees is required
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col xl="3">
            <b-form-group
              label="Date From:"
              label-for="date-from"
              invalid-feedback="Date from is required"
            >
              <b-form-input
                type="datetime-local"
                v-model="$v.form.dateFrom.$model"
                :state="validateState({ name: 'dateFrom' })"
              >
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col xl="3">
            <b-form-group
              label="Date to:"
              label-for="date-to"
              invalid-feedback="Date to is required"
            >
              <b-form-input
                type="datetime-local"
                v-model="$v.form.dateTo.$model"
                :state="validateState({ name: 'dateTo' })"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="8">
            <b-form-group
              label="Note:"
              label-for="description"
              invalid-feedback="Note to is required"
            >
              <b-form-textarea
                id="note"
                v-model="$v.form.note.$model"
                placeholder="Note"
                rows="3"
                :state="validateState({ name: 'note' })"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
    </fieldset>
    <!-- end:: form time entry  -->
  </div>
</template>

<script>
import globalMixin from "@/core/mixins/global-mixin";
import moment from "moment";
import configMessage from "@/core/config/config-message-swall";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "TimeEntryForm",
  mixins: [validationMixin, globalMixin],
  props: {
    isEditFormTimeEntry: {
      type: Boolean,
      default: false,
    },
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
          employees: [],
        };
      },
    },
  },
  components: {
    Multiselect: () => import("vue-multiselect"),
  },
  validations() {
    return {
      form: {
        dateFrom: {
          required,
        },
        dateTo: {
          required,
        },
        employee: {
          required,
        },
        note: {
          required,
        },
      },
    };
  },
  data() {
    return {
      form: {
        dateFrom: "",
        dateTo: "",
        employee: [],
        note: "",
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
      this.form = { dateFrom: "", dateTo: "", employee: [], note: "" };
    },
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return null;
      }
      // edit
      if (this.isEditFormTimeEntry) {
      }
      // save
      try {
        this.form.id = this.ticket.id;
        this.form.employee = this.form.employee.id;
        this.form.dateFrom = moment(this.form.dateFrom).format(
          "YYYY-MM-DD HH:MM:ss"
        );
        this.form.dateTo = moment(this.form.dateTo).format(
          "YYYY-MM-DD HH:MM:ss"
        );
        await this.$store.dispatch("timeEntry/createTimeEntry", this.form);
        await this.$swal(configMessage.success);
      } catch (e) { await this.$swal(configMessage.error);}
    },
  },
};
</script>

<style scoped></style>
