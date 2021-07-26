<template>
  <card>
    <template slot="header">
      <h5 class="title">{{$t('sidebar.userProfile')}}</h5>
    </template>
    <div class="row">
      <div class="col-md-6 ">
        <base-input :label="$t('property.firstName')"
                    :placeholder="$t('property.firstName')"
                    v-model="model.first_name"
                    :disabled="true"
                    :error="tmpApiValidationErrors.first_name ? tmpApiValidationErrors.first_name[0] : ''">
        </base-input>
        <!-- <validation-error :errorsArray="tmpApiValidationErrors.first_name"/> -->
      </div>
      <div class="col-md-6">
        <base-input :label="$t('property.lastName')"
                    :placeholder="$t('property.lastName')"
                    v-model="model.last_name"
                    :disabled="true"
                    :error="tmpApiValidationErrors.last_name ? tmpApiValidationErrors.last_name[0] : ''">
        </base-input>
        <!-- <validation-error :errorsArray="tmpApiValidationErrors.last_name"/> -->
      </div>
    </div>
    <div class="row" v-if="addOrEdit != 'Add'">
      <div class="col-md-6">
        <base-input :label="$t('property.email')"
                    :placeholder="$t('property.email')"
                    type="email"
                    :disabled="true"
                    v-model="model.email"
                    :error="tmpApiValidationErrors.email ? tmpApiValidationErrors.email[0] : ''">
        </base-input>
        <!-- <validation-error :errorsArray="tmpApiValidationErrors.email"/> -->
      </div>
      <div class="col-md-6">
        <!-- <base-input label="Phone Number"
                    type="text"
                    placeholder="Phone Number"
                    v-model="model.phone_number">
        </base-input> -->
        <label class="mt-1">{{$t('property.phoneNumber')}}</label>
        <div class="row">
          <div class="col-2">
            <vue-country-code
                  @onSelect="onSelectCountryCode"
                  :only-countries="['MY']"
                  class="pt-1 pb-1"
                  :disabled="true"
                  >
            </vue-country-code>
            <validation-error :errorsArray="tmpApiValidationErrors.phone_country_code" />
          </div>
          <div class="col-9 ml-auto">
            <base-input
                v-model="model.phone_number"
                :placeholder="$t('property.phoneNumber')"
                type="tel"
                pattern="^[0-9]+$"
                :disabled="true"
                :error="tmpApiValidationErrors.phone_number ? tmpApiValidationErrors.phone_number[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="apiValidationErrors.phone_number" /> -->
          </div>
        </div>
        <!-- <VuePhoneNumberInput 
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
          /> -->
        <validation-error :errorsArray="tmpApiValidationErrors.phone_number"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <base-input 
                    :label="$t('property.dateOfBirth')"
                    :error="tmpApiValidationErrors.date_of_birth ? tmpApiValidationErrors.date_of_birth[0] : ''">
                    <!-- type="date"
                    v-model="model.date_of_birth" -->
              <el-date-picker
                type="date"
                :placeholder="$t('property.dateOfBirth')"
                v-model="model.date_of_birth"
                value-format="yyyy-MM-dd"
                :disabled="true"
              >
              </el-date-picker>
        </base-input>
        <!-- <validation-error :errorsArray="tmpApiValidationErrors.date_of_birth"/> -->
      </div>
      <div class="col-md-6">
        <base-selector-input :label="$t('property.gender')"
                              v-model="model.gender"
                              :options='[
                                {"id":"MALE", "name":"Male"},
                                {"id":"FEMALE", "name":"Female"}
                              ]'
                              :error="tmpApiValidationErrors.gender ? tmpApiValidationErrors.gender[0] : ''"
                              :disabled="true"
        >
        </base-selector-input>
        <!-- <validation-error :errorsArray="tmpApiValidationErrors.gender"/> -->
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input :label="$t('property.isBusiness')"
                    type="checkbox"
                    v-model="model.is_business"
                    :error="tmpApiValidationErrors.is_business ? tmpApiValidationErrors.is_business[0] : ''"
                    :disabled="true"
        >
        </base-input>
        <!-- <validation-error :errorsArray="tmpApiValidationErrors.is_business"/> -->
      </div>
    </div>
    <template slot="footer">
      <base-button type="info" @click="handleSubmit()" fill v-if="addOrEdit == 'Add'">{{$t('component.save')}}</base-button>
    </template>
  </card>
</template>
<script>
import { Card, BaseInput, BaseSelectorInput } from "@/components/index";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import BaseButton from "@/components/BaseButton";
// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import VueCountryCode from "vue-country-code";

export default {
  mixins: [formMixin],
  components: {
    Card,
    BaseInput,
    BaseSelectorInput,
    BaseButton,
    ValidationError,
    // VuePhoneNumberInput
    VueCountryCode
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
      phone_country_code: null,
    }
  },
  mounted() {
    this.phone_country_code = "60";
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
    onSelectCountryCode(params) {
      this.phone_country_code = params.dialCode;
    }
  }
};
</script>
<style>

</style>

