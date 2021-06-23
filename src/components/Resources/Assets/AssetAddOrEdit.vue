<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} Asset</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-input label="Asset Name"
                      placeholder="Asset Name"
                      v-model="resource.model.asset_nickname">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_nickname"/>
        </div>
        <div class="col-md-6">
          <base-selector-input label="Asset Type"
                               placeholder="Asset Type"
                               v-model="resource.model.asset_type"
                               :options="resource.selector.asset_type"
          >
          </base-selector-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_type"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-selector-input label="Ownership Type"
                               placeholder="Ownership Type"
                               v-model="resource.model.asset_ownership_type"
                               :options="resource.selector.asset_ownership_type"
          >
          </base-selector-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_ownership_type"/>
        </div>
        <div class="col-md-6">
          <base-input label="Asset Size (sq. ft)"
                      placeholder="Asset Size (sq. ft)"
                      v-model="resource.model.asset_size">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_size"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Number Of Rooms"
                      placeholder="Number Of Rooms"
                      v-model="resource.model.number_of_rooms">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.number_of_rooms"/>
        </div>
        <div class="col-md-6">
          <base-input label="Number Of Bathrooms"
                      placeholder="Number Of Bathrooms"
                      v-model="resource.model.number_of_bathrooms">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.number_of_bathrooms"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input label="Is Multi Unit?"
                      type="checkbox"
                      :checked="typeof resource.model.is_multi_unit == 'boolean' ? resource.model.is_multi_unit : (typeof resource.model.is_multi_unit == 'string' ? resource.model.is_multi_unit == 'true' : false)"
                      v-model="resource.model.is_multi_unit">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.is_multi_unit"/>
        </div>
        <div class="col-md-6">
          <base-input label="Is Occupied?"
                      type="checkbox"
                      :checked="typeof resource.model.is_occupied == 'boolean' ? resource.model.is_occupied : (typeof resource.model.is_occupied == 'string' ? resource.model.is_occupied == 'true' : false)"
                      v-model="resource.model.is_occupied">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.is_occupied"/>
        </div>
      </div>
    </card>
    <card>
      <h5 slot="header" class="title">Asset Location</h5>
      <div class="row">
        <div class="col-md-2">
          <base-input label="Unit Number"
                      placeholder="Unit Number"
                      v-model="resource.model.location_details.asset_unit_no">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_unit_no"/>
        </div>
        <div class="col-md-10">
          <base-input label="Address Line"
                      placeholder="Address Line"
                      v-model="resource.model.location_details.asset_address_line">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_address_line"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input label="City"
                      placeholder="City"
                      v-model="resource.model.location_details.asset_city">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_city"/>
        </div>
        <div class="col-md-4">
          <base-input label="State"
                      placeholder="State"
                      v-model="resource.model.location_details.asset_state">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_state"/>
        </div>
        <div class="col-md-4">
          <base-input label="Postcode"
                      placeholder="Postcode"
                      v-model="resource.model.location_details.asset_postal_code">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_postal_code"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-selector-input label="Country"
                               placeholder="Country"
                               v-model="resource.model.location_details.asset_country"
                               :options="resource.selector.asset_country"
          >
          </base-selector-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_country"/>
        </div>
      </div>
    </card>

    <card>
      <h5 slot="header" class="title">Asset Financial Details</h5>
      <div class="row">
        <div class="col-md-6">
          <base-input label="Purchased Value"
                      placeholder="Purchased Value"
                      v-model="resource.model.financial_details.asset_purchased_value">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_purchased_value"/>
        </div>
        <div class="col-md-6">
          <base-input label="Taxable Amount"
                      placeholder="Taxable Amount"
                      v-model="resource.model.financial_details.asset_purchased_tax">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.asset_purchased_tax"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Remaining Loan"
                      placeholder="Remaining Loan"
                      v-model="resource.model.financial_details.loan_outstanding_amount">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.loan_outstanding_amount"/>
        </div>
        <div class="col-md-6">
          <base-input label="Purchased Date"
                      type="date"
                      v-model="resource.model.financial_details.purchased_date">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.purchased_date"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Loan Interest Rate"
                      placeholder="Loan Interest Rate"
                      v-model="resource.model.financial_details.loan_interest_rate">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.loan_interest_rate"/>
        </div>
        <div class="col-md-6">
          <base-input label="Loan Duration"
                      placeholder="Loan Duration"
                      v-model="resource.model.financial_details.loan_total_year">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.loan_total_year"/>
        </div>
      </div>
    </card>
    <base-button slot="footer" native-type="submit" type="primary"  @click="handleSubmit()" fill>{{addOrEdit}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    BaseInput,
    BaseSelectorInput,
    Card,
    ValidationError
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        model: {},
        data: {},
        selector: {}
      },
      description: "Resource info"
    },
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    addOrEdit: {
      type: String,
      required: true,
      default: "Add"
    }
  },
  methods: {
    async handleSubmit() {
      this.$emit('submit', this.translateModel(this.resource.model));
    },
    translateModel(model) {
      return {
        asset_nickname: this.resource.model.asset_nickname,
        asset_type: this.resource.model.asset_type,
        asset_ownership_type: this.resource.model.asset_ownership_type,
        asset_size: this.resource.model.asset_size,
        number_of_rooms: this.resource.model.number_of_rooms,
        number_of_bathrooms: this.resource.model.number_of_bathrooms,
        is_multi_unit: this.resource.model.is_multi_unit == null ? false : this.resource.model.is_multi_unit,
        is_occupied: this.resource.model.is_occupied == null ? false : this.resource.model.is_occupied,
        asset_unit_no: this.resource.model.location_details.asset_unit_no,
        asset_address_line: this.resource.model.location_details.asset_address_line,
        asset_city: this.resource.model.location_details.asset_city,
        asset_state: this.resource.model.location_details.asset_state,
        asset_postal_code: this.resource.model.location_details.asset_postal_code,
        asset_country: this.resource.model.location_details.asset_country,
        asset_purchased_value: this.resource.model.financial_details.asset_purchased_value,
        asset_purchased_tax: this.resource.model.financial_details.asset_purchased_tax,
        loan_outstanding_amount: this.resource.model.financial_details.loan_outstanding_amount,
        purchased_date: this.resource.model.financial_details.purchased_date,
        loan_interest_rate: this.resource.model.financial_details.loan_interest_rate,
        loan_total_year: this.resource.model.financial_details.loan_total_year
      }
    }
  }
}
</script>