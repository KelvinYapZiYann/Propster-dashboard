<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} Tenant</h5>
      <div class="row">
        <div class="col-md-6">
          <div v-for="asset in resource.selector.asset_id" v-bind:key="asset.id">
              <base-input label="Residing In"
                        v-if="asset.id == assetId && addOrEdit == 'Add'" 
                        :value="asset.name"
                        :disabled="true">
              </base-input>
          </div>
          <base-input label="Residing In"
                      v-if="addOrEdit != 'Add'" 
                      :value="resource.model.assets ? (resource.model.assets[0] ? resource.model.assets[0].asset_nickname : '') : ''"
                      :disabled="true">
          </base-input>
          <!-- <div v-for="asset in resource.selector.asset_id" v-bind:key="asset.id">
            <base-input label="Residing In"
                      v-if="asset.id == assetId" 
                      :value="asset.name"
                      :disabled="true">
            </base-input>
          </div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 ">
          <base-input label="First Name"
                      placeholder="First Name"
                      v-model="resource.model.first_name">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.first_name"/>
        </div>
        <div class="col-md-6">
          <base-input label="Last Name"
                      placeholder="Last Name"
                      v-model="resource.model.last_name">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.last_name"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 ">
          <base-input label="Email"
                      placeholder="Email"
                      v-model="resource.model.email">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.email"/>
        </div>
        <div class="col-md-6">
          <label class="mt-1">Phone Number</label>
          <VuePhoneNumberInput 
                      v-model="resource.model.phone_number" 
                      :default-country-code="phoneCountryCodeInput"
                      @update="updatePhoneNumber"
                      :no-example="false"
                      color="#1d8cf8"
                      valid-color="#1d8cf8"
                      error-color="#1d8cf8"
                      :show-code-on-list="true"
                      :only-countries="['MY']"
                      />
          <!-- <base-input label="Phone Number"
                      placeholder="Phone Number"
                      v-model="resource.model.phone_number">
          </base-input> -->
          <validation-error :errorsArray="tmpApiValidationErrors.phone_number"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-selector-input label="Gender"
                               placeholder="Gender"
                               v-model="resource.model.gender"
                               :initialValue="resource.model.gender"
                               :options="resource.selector.gender"
          >
          </base-selector-input>
          <validation-error :errorsArray="tmpApiValidationErrors.gender"/>
        </div>
        <div class="col-md-6">
          <base-input label="Is Business?"
                      type="checkbox"
                      :checked="typeof resource.model.is_business == 'boolean' ? resource.model.is_business : (typeof resource.model.is_business == 'string' ? resource.model.is_business == 'true' : false)"
                      v-model="resource.model.is_business">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.is_business"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Date Of Birth"
                      type="date"
                      v-model="resource.model.date_of_birth">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.date_of_birth"/>
        </div>
        <div class="col-md-6 pr-md-1">
          <base-input label="Reputation"
                      placeholder="Reputation"
                      v-model="resource.model.reputation">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.reputation"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-selector-input label="Salary Range"
                               placeholder="Salary Range"
                               v-model="resource.model.salary_range"
                               :initialValue="resource.model.salary_range"
                               :options="resource.selector.salary_range"
          >
          </base-selector-input>
          <validation-error :errorsArray="tmpApiValidationErrors.salary_range"/>
        </div>
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleCancel()" fill>Cancel</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{addOrEdit}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card, ValidationError } from "@/components";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    BaseInput,
    BaseSelectorInput,
    Card,
    VuePhoneNumberInput
  },
  data() {
    return {
      fileCount: 0,
      assetId: null,
      // phoneCountryCode: this.resource.model.phone_country_code,
      phoneCountryCodeInput: "MY",
      // phoneNumber: this.resource.model.phone_number,
      // phoneNumber: this.resource.model.phone_number
    }
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        model: {},
        data: {},
        selector: []
      },
      description: "Resource info",
    },
    addOrEdit: {
      type: String,
      required: true,
      default: "Add"
    },
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    }
  },
  created() {
    this.assetId = this.$route.query.assetId;
  },
  mounted() {
    this.phoneCountryCodeInput = "MY";
    // this.resource = "SG";
  },
  methods: {
    async handleSubmit() {
      this.$emit('submit', this.translateModel(this.resource.model))
    },
    async handleCancel() {
      this.$emit('cancel')
    },
    translateModel(model) {
      return {
        asset_id: this.addOrEdit != 'Add' ? (this.resource.model.assets ? (this.resource.model.assets[0] ? this.resource.model.assets[0].id : null) : null) : 
          (this.assetId ? this.assetId : null),
        first_name: this.resource.model.first_name,
        last_name: this.resource.model.last_name,
        email: this.resource.model.email,
        phone_number: this.resource.model.phone_number,
        phone_country_code: this.resource.model.phone_country_code,
        gender: this.resource.model.gender,
        is_business: this.resource.model.is_business == null ? false : this.resource.model.is_business,
        date_of_birth: this.resource.model.date_of_birth,
        reputation: this.resource.model.reputation,
        salary_range: this.resource.model.salary_range
      }
    },
    updatePhoneNumber(event) {
      this.resource.model.phone_country_code = event.countryCallingCode;
    }
  }
}
</script>
<style>
</style>
