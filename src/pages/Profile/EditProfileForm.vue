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
        <validation-error :errorsArray="tmpApiValidationErrors.first_name"/>
      </div>
      <div class="col-md-6">
        <base-input label="Last Name"
                    placeholder="Last Name"
                    v-model="model.last_name">
        </base-input>
        <validation-error :errorsArray="tmpApiValidationErrors.last_name"/>
      </div>
    </div>
    <div class="row" v-if="addOrEdit != 'Add'">
      <div class="col-md-6">
        <base-input label="Email address"
                    type="email"
                    disabled="true"
                    placeholder="email"
                    v-model="model.email">
        </base-input>
        <validation-error :errorsArray="tmpApiValidationErrors.email"/>
      </div>
      <div class="col-md-6">
        <!-- <base-input label="Phone Number"
                    type="text"
                    placeholder="Phone Number"
                    v-model="model.phone_number">
        </base-input> -->
        <label class="mt-1">Phone Number</label>
        <VuePhoneNumberInput 
          v-model="model.phone_number"
          :default-country-code="phoneCountryCodeInput"
          @update="updatePhoneNumber"
          :no-example="false"
          color="#1d8cf8"
          valid-color="#1d8cf8"
          error-color="#1d8cf8"
          :show-code-on-list="true"
          :only-countries="['MY']"
          :disabled="true"
          />
        <validation-error :errorsArray="tmpApiValidationErrors.phone_number"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <base-input label="Date Of Birth"
                    type="date"
                    v-model="model.date_of_birth">
        </base-input>
        <validation-error :errorsArray="tmpApiValidationErrors.date_of_birth"/>
      </div>
      <div class="col-md-6">
        <base-selector-input label="Gender"
                              placeholder="Gender"
                              v-model="model.gender"
                              :options='[{"MALE": "Male"},{"FEMALE": "Female"}]'
        >
        </base-selector-input>
        <validation-error :errorsArray="tmpApiValidationErrors.gender"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Is Business?"
                    type="checkbox"
                    v-model="model.is_business"
        >
        </base-input>
        <validation-error :errorsArray="tmpApiValidationErrors.is_business"/>
      </div>
    </div>
    <template slot="footer">
      <base-button type="info" @click="handleSubmit()" fill>Save</base-button>
    </template>
  </card>
</template>
<script>
import { Card, BaseInput, BaseSelectorInput } from "@/components/index";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import BaseButton from "@/components/BaseButton";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  mixins: [formMixin],
  components: {
    Card,
    BaseInput,
    BaseSelectorInput,
    BaseButton,
    ValidationError,
    VuePhoneNumberInput
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    },
    addOrEdit: {
      type: String,
      default: () => {
        return "Add";
      }
    },
    // userId: {
    //   type: String,
    //   default: () => {
    //     return null;
    //   }
    // }
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
  },
  data() {
    return {
      phoneCountryCodeInput: "MY",
    }
  },
  methods: {
    async handleSubmit() {
      // const userId = this.model.id
      // console.log(this.model);
      // if (this.model.id == null) {
      //   this.$notify({
      //     message:'Server Error',
      //     icon: 'tim-icons icon-bell-55',
      //     type: 'danger'
      //   });
      //   return;
      // }

      const data = {
        first_name: this.model.first_name,
        last_name: this.model.last_name,
        // phone_country_code: this.model.phone_country_code,
        // phone_number: this.model.phone_number,
        date_of_birth: this.model.date_of_birth,
        is_business: this.model.is_business,
        // gender: this.model.gender,
        gender: "MALE",
      }
      this.$emit("submit", data);
      // try {
      //   await this.$store.dispatch('users/update', {'userId': this.model.id, 'data': data})
      //   this.$notify({
      //     message:'Successfully Updated',
      //     icon: 'tim-icons icon-bell-55',
      //     type: 'success'
      //   });
      //   this.resetApiValidation()
      // } catch (e) {
      //   this.$notify({
      //     message:'Server error',
      //     icon: 'tim-icons icon-bell-55',
      //     type: 'danger'
      //   });
      //   this.setApiValidation(e.response.data.errors)
      // }
    },
    updatePhoneNumber(event) {
      this.model.phone_country_code = event.countryCallingCode;
    }
  }
};
</script>
<style></style>

