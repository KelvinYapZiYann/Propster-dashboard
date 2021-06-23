<template>
  <card>
    <template slot="header">
      <h5 class="title">Profile</h5>
    </template>
    <div class="row">
      <div class="col-md-6 ">
        <base-input label="First Name"
                    placeholder="First Name"
                    v-model="model.first_name">
        </base-input>
        <validation-error :errors="apiValidationErrors.first_name"/>
      </div>
      <div class="col-md-6">
        <base-input label="Last Name"
                    placeholder="Last Name"
                    v-model="model.last_name">
        </base-input>
        <validation-error :errors="apiValidationErrors.last_name"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <base-input label="Email address"
                    type="email"
                    disabled="true"
                    placeholder="email"
                    v-model="model.email">
        </base-input>
        <validation-error :errors="apiValidationErrors.email"/>
      </div>
      <div class="col-md-6">
        <base-input label="Phone Number"
                    type="text"
                    placeholder="Phone Number"
                    v-model="model.phone_number">
        </base-input>
        <validation-error :errors="apiValidationErrors.phone_number"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <base-input label="Date Of Birth"
                    type="date"
                    v-model="model.date_of_birth">
        </base-input>
        <validation-error :errors="apiValidationErrors.date_of_birth"/>
      </div>
      <div class="col-md-6 pr-md-1">
        <base-input label="Is Business?"
                    type="checkbox"
                    v-model="model.is_business"
        >
        </base-input>
        <validation-error :errors="apiValidationErrors.is_business"/>
      </div>
    </div>
    <template slot="footer">
      <base-button type="success" fill>Save</base-button>
    </template>
  </card>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import BaseButton from "@/components/BaseButton";

export default {
  mixins: [formMixin],
  components: {
    Card,
    BaseInput,
    BaseButton,
    ValidationError
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    },
    userId: {
      type: String,
      default: () => {
        return null;
      }
    }
  },
  methods: {
    async handleSubmit() {
      const userId = this.model.id

      if (userId == null) {
        this.$notify({
          message:'Server Error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
        return;
      }

      const data = {
        first_name: this.model.first_name,
        last_name: this.model.last_name,
        phone_number: this.model.phone_number,
        date_of_birth: this.model.date_of_birth,
        is_business: this.model.is_business,
        gender: this.model.gender,
      }

      try {
        await this.$store.dispatch('users/update', {'userId': userId, 'data': data})
        this.$notify({
          message:'Successfully Updated',
          icon: 'tim-icons icon-bell-55',
          type: 'success'
        });
        this.resetApiValidation()
      } catch (e) {
        console.log(e.response.data.errors);
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
        this.setApiValidation(e.response.data.errors)
      }
    }
  }
};
</script>
<style></style>
