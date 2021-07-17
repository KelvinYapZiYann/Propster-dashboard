<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} Asset</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-input label="Asset Name"
                      placeholder="Asset Name"
                      v-model="resource.model.asset_nickname"
                      :error="tmpApiValidationErrors.asset_nickname ? tmpApiValidationErrors.asset_nickname[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_nickname"/> -->
        </div>
        <div class="col-md-6">
          <base-selector-input label="Asset Type"
                               placeholder="Asset Type"
                               v-model="resource.model.asset_type"
                               :options="resource.selector.asset_type"
                               :error="tmpApiValidationErrors.asset_type ? tmpApiValidationErrors.asset_type[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_type"/> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-selector-input label="Ownership Type"
                               placeholder="Ownership Type"
                               v-model="resource.model.asset_ownership_type"
                               :options="resource.selector.asset_ownership_type"
                               :error="tmpApiValidationErrors.asset_ownership_type ? tmpApiValidationErrors.asset_ownership_type[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_ownership_type"/> -->
        </div>
        <div class="col-md-6">
          <base-input label="Asset Size (sq. ft)"
                      placeholder="Asset Size (sq. ft)"
                      v-model="resource.model.asset_size"
                      :error="tmpApiValidationErrors.asset_size ? tmpApiValidationErrors.asset_size[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_size"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Number Of Rooms"
                      placeholder="Number Of Rooms"
                      v-model="resource.model.number_of_rooms"
                      :error="tmpApiValidationErrors.number_of_rooms ? tmpApiValidationErrors.number_of_rooms[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.number_of_rooms"/> -->
        </div>
        <div class="col-md-6">
          <base-input label="Number Of Bathrooms"
                      placeholder="Number Of Bathrooms"
                      v-model="resource.model.number_of_bathrooms"
                      :error="tmpApiValidationErrors.number_of_bathrooms ? tmpApiValidationErrors.number_of_bathrooms[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.number_of_bathrooms"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input label="Is Multi Unit?"
                      type="checkbox"
                      :checked="typeof resource.model.is_multi_unit == 'boolean' ? resource.model.is_multi_unit : (typeof resource.model.is_multi_unit == 'string' ? resource.model.is_multi_unit == 'true' : false)"
                      v-model="resource.model.is_multi_unit"
                      :error="tmpApiValidationErrors.is_multi_unit ? tmpApiValidationErrors.is_multi_unit[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.is_multi_unit"/> -->
        </div>
        <div class="col-md-6">
          <base-input label="Is Occupied?"
                      type="checkbox"
                      :checked="typeof resource.model.is_occupied == 'boolean' ? resource.model.is_occupied : (typeof resource.model.is_occupied == 'string' ? resource.model.is_occupied == 'true' : false)"
                      v-model="resource.model.is_occupied"
                      :error="tmpApiValidationErrors.is_occupied ? tmpApiValidationErrors.is_occupied[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.is_occupied"/> -->
        </div>
      </div>
    </card>
    <card>
      <h5 slot="header" class="title">Asset Location</h5>
      <div class="row">
        <div class="col-md-2">
          <base-input label="Unit Number"
                      placeholder="Unit Number"
                      v-model="resource.model.location_details.asset_unit_no"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_unit_no ? tmpApiValidationErrors.asset_unit_no[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_unit_no"/> -->
        </div>
        <div class="col-md-10">
          <base-input label="Address Line"
                      placeholder="Address Line"
                      v-model="resource.model.location_details.asset_address_line"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_address_line ? tmpApiValidationErrors.asset_address_line[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_address_line"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input label="City"
                      placeholder="City"
                      v-model="resource.model.location_details.asset_city"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_city ? tmpApiValidationErrors.asset_city[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_city"/> -->
        </div>
        <div class="col-md-4">
          <base-input label="State"
                      placeholder="State"
                      v-model="resource.model.location_details.asset_state"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_state ? tmpApiValidationErrors.asset_state[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_state"/> -->
        </div>
        <div class="col-md-4">
          <base-input label="Postcode"
                      placeholder="Postcode"
                      v-model="resource.model.location_details.asset_postal_code"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_postal_code ? tmpApiValidationErrors.asset_postal_code[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_postal_code"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-selector-input label="Country"
                               placeholder="Country"
                               v-model="resource.model.location_details.asset_country"
                               :options="resource.selector.asset_country"
                               v-if="resource.model.location_details"
                               :error="tmpApiValidationErrors.asset_country ? tmpApiValidationErrors.asset_country[0] : ''">
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_country"/> -->
        </div>
      </div>
    </card>

    <card>
      <h5 slot="header" class="title">Asset Financial Details</h5>
      <div class="row">
        <div class="col-md-6">
          <base-input label="Purchased Value"
                      placeholder="Purchased Value"
                      v-model="resource.model.financial_details.asset_purchased_value"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.asset_purchased_value ? tmpApiValidationErrors.asset_purchased_value[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_purchased_value"/> -->
        </div>
        <div class="col-md-6">
          <base-input label="Taxable Amount"
                      placeholder="Taxable Amount"
                      v-model="resource.model.financial_details.asset_purchased_tax"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.asset_purchased_tax ? tmpApiValidationErrors.asset_purchased_tax[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_purchased_tax"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Remaining Loan"
                      placeholder="Remaining Loan"
                      v-model="resource.model.financial_details.loan_outstanding_amount"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_outstanding_amount ? tmpApiValidationErrors.loan_outstanding_amount[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_outstanding_amount"/> -->
        </div>
        <div class="col-md-6">
          <base-input label="Purchased Date"
                      type="date"
                      v-model="resource.model.financial_details.purchased_date"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.purchased_date ? tmpApiValidationErrors.purchased_date[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.purchased_date"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Loan Interest Rate"
                      placeholder="Loan Interest Rate"
                      v-model="resource.model.financial_details.loan_interest_rate"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_interest_rate ? tmpApiValidationErrors.loan_interest_rate[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_interest_rate"/> -->
        </div>
        <div class="col-md-6">
          <base-input label="Loan Duration"
                      placeholder="Loan Duration"
                      v-model="resource.model.financial_details.loan_total_year"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_total_year ? tmpApiValidationErrors.loan_total_year[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_total_year"/> -->
        </div>
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleCancel()" fill>Cancel</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{addOrEdit}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    BaseInput,
    BaseSelectorInput,
    Card,
    // ValidationError
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
    async handleCancel() {
      this.$emit('cancel');
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