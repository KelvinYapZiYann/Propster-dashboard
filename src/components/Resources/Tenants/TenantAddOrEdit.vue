<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} {{$t('sidebar.tenant')}}</h5>
      <div class="row">
        <div class="col-md-6">
          <div v-if="assetId">
            <div v-for="asset in resource.selector.asset_id" v-bind:key="asset.id" >
              <base-input :label="$t('property.residingIn')"
                        v-if="asset.id == assetId && addOrEdit == 'Add'" 
                        :value="asset.name"
                        :disabled="true">
              </base-input>
            </div>
          </div>
          <div v-if="!assetId && addOrEdit == 'Add'">
            <base-selector-input :label="$t('property.residingIn')"
                               :placeholder="$t('property.residingIn')"
                               v-model="resource.model.asset_id"
                               :options="resource.selector.asset_id"
                               :error="tmpApiValidationErrors.asset_id ? tmpApiValidationErrors.asset_id[0] : ''"
            >
            </base-selector-input>
          </div>
          <base-input :label="$t('property.residingIn')"
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
          <base-input :label="$t('property.firstName')"
                      :placeholder="$t('property.firstName')"
                      v-model="resource.model.first_name"
                      :error="tmpApiValidationErrors.first_name ? tmpApiValidationErrors.first_name[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.first_name"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.lastName')"
                      :placeholder="$t('property.lastName')"
                      v-model="resource.model.last_name"
                      :error="tmpApiValidationErrors.last_name ? tmpApiValidationErrors.last_name[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.last_name"/> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 ">
          <base-input :label="$t('property.email')"
                      :placeholder="$t('property.email')"
                      v-model="resource.model.email"
                      :error="tmpApiValidationErrors.email ? tmpApiValidationErrors.email[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.email"/> -->
        </div>
        <div class="col-md-6">
          <label class="mt-1">{{$t('property.phoneNumber')}}</label>
            <div class="row">
              <div class="col-2">
                <vue-country-code
                      @onSelect="onSelectCountryCode"
                      :only-countries="['MY']"
                      class="pt-1 pb-1"
                      >
                </vue-country-code>
                <validation-error :errorsArray="tmpApiValidationErrors.phone_country_code" />
              </div>
              <div class="col-9 ml-auto">
                <base-input
                    v-model="resource.model.phone_number"
                    :placeholder="$t('property.phoneNumber')"
                    type="tel"
                    pattern="^[0-9]+$"
                    :error="tmpApiValidationErrors.phone_number ? tmpApiValidationErrors.phone_number[0] : ''">
                </base-input>
                <!-- <validation-error :errorsArray="apiValidationErrors.phone_number" /> -->
              </div>
            </div>
          <!-- <VuePhoneNumberInput 
                      v-model="resource.model.phone_number" 
                      :default-country-code="phoneCountryCodeInput"
                      @update="updatePhoneNumber"
                      :no-example="false"
                      color="#1d8cf8"
                      valid-color="#1d8cf8"
                      error-color="#1d8cf8"
                      :show-code-on-list="true"
                      :only-countries="['MY']"
                      /> -->
          <!-- <base-input label="Phone Number"
                      placeholder="Phone Number"
                      v-model="resource.model.phone_number">
          </base-input> -->
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.phone_number"/> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-selector-input :label="$t('property.gender')"
                               :placeholder="$t('property.gender')"
                               v-model="resource.model.gender"
                               :initialValue="resource.model.gender"
                               :options="resource.selector.gender"
                               :error="tmpApiValidationErrors.gender ? tmpApiValidationErrors.gender[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.gender"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.isBusiness')"
                      type="checkbox"
                      :checked="typeof resource.model.is_business == 'boolean' ? resource.model.is_business : (typeof resource.model.is_business == 'string' ? resource.model.is_business == 'true' : false)"
                      v-model="resource.model.is_business"
                      :error="tmpApiValidationErrors.is_business ? tmpApiValidationErrors.is_business[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.is_business"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.dateOfBirth')"
                      :error="tmpApiValidationErrors.date_of_birth ? tmpApiValidationErrors.date_of_birth[0] : ''">
                <el-date-picker
                  type="date"
                  :placeholder="$t('property.dateOfBirth')"
                  v-model="resource.model.date_of_birth"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.date_of_birth"/> -->
        </div>
        <!-- <div class="col-md-6 pr-md-1">
          <base-input label="Reputation"
                      placeholder="Reputation"
                      v-model="resource.model.reputation"
                      :error="tmpApiValidationErrors.reputation ? tmpApiValidationErrors.reputation[0] : ''">
          </base-input> -->
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.reputation"/> -->
        <!-- </div> -->
        <div class="col-md-6">
          <base-selector-input :label="$t('property.salaryRange')"
                               :placeholder="$t('property.salaryRange')"
                               v-model="resource.model.salary_range"
                               :initialValue="resource.model.salary_range"
                               :options="resource.selector.salary_range"
                               :error="tmpApiValidationErrors.salary_range ? tmpApiValidationErrors.salary_range[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.salary_range"/> -->
        </div>
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleCancel()" fill>{{$t('component.cancel')}}</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{addOrEdit}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card, ValidationError } from "@/components";
// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import VueCountryCode from "vue-country-code";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    BaseInput,
    BaseSelectorInput,
    Card,
    // VuePhoneNumberInput
    VueCountryCode
  },
  data() {
    return {
      fileCount: 0,
      assetId: null,
      phone_country_code: null,
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
    this.phone_country_code = "60";
  },
  methods: {
    async handleSubmit() {
      this.$emit('submit', this.translateModel())
    },
    async handleCancel() {
      this.$emit('cancel')
    },
    translateModel() {
      console.log(this.resource.model.date_of_birth);
      return {
        asset_id: this.addOrEdit != 'Add' ? (this.resource.model.assets ? (this.resource.model.assets[0] ? this.resource.model.assets[0].id : null) : null) : 
          (this.assetId ? this.assetId : this.resource.model.asset_id),
        first_name: this.resource.model.first_name,
        last_name: this.resource.model.last_name,
        email: this.resource.model.email,
        phone_number: this.resource.model.phone_number,
        phone_country_code: this.phone_country_code,
        gender: this.resource.model.gender,
        is_business: this.resource.model.is_business == null ? false : this.resource.model.is_business,
        date_of_birth: this.resource.model.date_of_birth,
        reputation: this.resource.model.reputation,
        salary_range: this.resource.model.salary_range
      }
    },
    onSelectCountryCode(params) {
      this.phone_country_code = params.dialCode;
    }
  }
}
</script>
<style></style>
