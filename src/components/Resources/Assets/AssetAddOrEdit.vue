<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} {{$t('sidebar.asset')}}</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-input :label="$t('property.assetNickname')"
                      :placeholder="$t('property.assetNickname')"
                      v-model="resource.model.asset_nickname"
                      :error="tmpApiValidationErrors.asset_nickname ? tmpApiValidationErrors.asset_nickname[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_nickname"/> -->
        </div>
        <div class="col-md-6">
          <base-selector-input :label="$t('property.assetType')"
                               :placeholder="$t('property.assetType')"
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
          <base-selector-input :label="$t('property.ownershipType')"
                               :placeholder="$t('property.ownershipType')"
                               v-model="resource.model.asset_ownership_type"
                               :options="resource.selector.asset_ownership_type"
                               :error="tmpApiValidationErrors.asset_ownership_type ? tmpApiValidationErrors.asset_ownership_type[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_ownership_type"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.assetSize')"
                      :placeholder="$t('property.assetSize')"
                      v-model="resource.model.asset_size"
                      :error="tmpApiValidationErrors.asset_size ? tmpApiValidationErrors.asset_size[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_size"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.numberOfRooms')"
                      type="number"
                      :placeholder="$t('property.numberOfRooms')"
                      v-model="resource.model.number_of_rooms"
                      :error="tmpApiValidationErrors.number_of_rooms ? tmpApiValidationErrors.number_of_rooms[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.number_of_rooms"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.numberOfBathrooms')"
                      type="number"
                      :placeholder="$t('property.numberOfBathrooms')"
                      v-model="resource.model.number_of_bathrooms"
                      :error="tmpApiValidationErrors.number_of_bathrooms ? tmpApiValidationErrors.number_of_bathrooms[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.number_of_bathrooms"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input :label="$t('property.isMultiUnit')"
                      type="checkbox"
                      :checked="typeof resource.model.is_multi_unit == 'boolean' ? resource.model.is_multi_unit : (typeof resource.model.is_multi_unit == 'string' ? resource.model.is_multi_unit == 'true' : false)"
                      v-model="resource.model.is_multi_unit"
                      :error="tmpApiValidationErrors.is_multi_unit ? tmpApiValidationErrors.is_multi_unit[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.is_multi_unit"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.isOccupied')"
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
      <h5 slot="header" class="title">{{$t('property.locationDetails')}}</h5>
      <div class="row">
        <div class="col-md-3">
          <base-input :label="$t('property.unitNo')"
                      :placeholder="$t('property.unitNo')"
                      v-model="resource.model.location_details.asset_unit_no"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_unit_no ? tmpApiValidationErrors.asset_unit_no[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_unit_no"/> -->
        </div>
        <div class="col-md-9">
          <base-input :label="$t('property.addressLine')"
                      :placeholder="$t('property.addressLine')"
                      v-model="resource.model.location_details.asset_address_line"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_address_line ? tmpApiValidationErrors.asset_address_line[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_address_line"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input :label="$t('property.city')"
                      :placeholder="$t('property.city')"
                      v-model="resource.model.location_details.asset_city"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_city ? tmpApiValidationErrors.asset_city[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_city"/> -->
        </div>
        <div class="col-md-4">
          <base-input :label="$t('property.state')"
                      :placeholder="$t('property.state')"
                      v-model="resource.model.location_details.asset_state"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_state ? tmpApiValidationErrors.asset_state[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_state"/> -->
        </div>
        <div class="col-md-4">
          <base-input :label="$t('property.postalCode')"
                      :placeholder="$t('property.postalCode')"
                      v-model="resource.model.location_details.asset_postal_code"
                      v-if="resource.model.location_details"
                      :error="tmpApiValidationErrors.asset_postal_code ? tmpApiValidationErrors.asset_postal_code[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_postal_code"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-selector-input :label="$t('property.country')"
                               :placeholder="$t('property.country')"
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
      <h5 slot="header" class="title">{{$t('property.financialDetails')}}</h5>
      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.assetPurchasedValue')"
                      :placeholder="$t('property.assetPurchasedValue')"
                      v-model="resource.model.financial_details.asset_purchased_value"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.asset_purchased_value ? tmpApiValidationErrors.asset_purchased_value[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_purchased_value"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.assetCurrentValue')"
                      :placeholder="$t('property.assetCurrentValue')"
                      v-model="resource.model.financial_details.asset_current_value"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.asset_current_value ? tmpApiValidationErrors.asset_current_value[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_current_value"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.assetPurchasedTax')"
                      :placeholder="$t('property.assetPurchasedTax')"
                      v-model="resource.model.financial_details.asset_purchased_tax"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.asset_purchased_tax ? tmpApiValidationErrors.asset_purchased_tax[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_purchased_tax"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.assetRemainingLoan')"
                      :placeholder="$t('property.assetRemainingLoan')"
                      v-model="resource.model.financial_details.loan_outstanding_amount"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_outstanding_amount ? tmpApiValidationErrors.loan_outstanding_amount[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_outstanding_amount"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.purchasedDate')"
                      type="date"
                      v-model="resource.model.financial_details.purchased_date"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.purchased_date ? tmpApiValidationErrors.purchased_date[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.purchased_date"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.loanInterestRate')"
                      :placeholder="$t('property.loanInterestRate')"
                      v-model="resource.model.financial_details.loan_interest_rate"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_interest_rate ? tmpApiValidationErrors.loan_interest_rate[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_interest_rate"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.loanTotalYear')"
                      :placeholder="$t('property.loanTotalYear')"
                      type="number"
                      v-model="resource.model.financial_details.loan_total_year"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_total_year ? tmpApiValidationErrors.loan_total_year[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.loan_total_year"/> -->
        </div>
        <!-- <div class="col-md-6">
          <base-input :label="$t('property.loanRemainingYear')"
                      :placeholder="$t('property.loanRemainingYear')"
                      type="number"
                      v-model="resource.model.financial_details.loan_remaining_year"
                      v-if="resource.model.financial_details"
                      :error="tmpApiValidationErrors.loan_remaining_year ? tmpApiValidationErrors.loan_remaining_year[0] : ''">
          </base-input>
        </div> -->
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleCancel()" fill>{{$t('component.cancel')}}</base-button>
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
        asset_current_value: this.resource.model.financial_details.asset_current_value,
        asset_purchased_tax: this.resource.model.financial_details.asset_purchased_tax,
        loan_outstanding_amount: this.resource.model.financial_details.loan_outstanding_amount,
        purchased_date: this.resource.model.financial_details.purchased_date,
        loan_interest_rate: this.resource.model.financial_details.loan_interest_rate,
        loan_total_year: this.resource.model.financial_details.loan_total_year,
        // loan_remaining_year: this.resource.model.financial_details.loan_remaining_year,
      }
    }
  }
}
</script>