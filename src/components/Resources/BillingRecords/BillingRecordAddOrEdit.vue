<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{$t('component.add')}} {{$t('sidebar.billingRecord')}}</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-selector-input :label="$t('property.sender')"
                               v-model="transactionResource.model.sender_id"
                               :options="transactionResource.selector.senders"
                               v-if="addOrEdit == 'Add' && (transactionResource.selector.senders)"
                               :error="tmpApiValidationErrors.sender_id ? tmpApiValidationErrors.sender_id[0] : ''"
                               @input="senderIdOnChange"
          >
          </base-selector-input>
          <base-input :label="$t('property.sender')"
                      v-if="addOrEdit != 'Add' || (!transactionResource.selector.senders)" 
                      :value="resource.model.sender ? (resource.model.sender.id ? resource.model.sender.sender_name : '') : ''"
                      :disabled="true"
                      :error="tmpApiValidationErrors.sender_id ? tmpApiValidationErrors.sender_id[0] : ''">
          </base-input>
        </div>
        <div class="col-md-6 ">
          <base-selector-input :label="$t('property.recipient')"
                               v-model="transactionResource.model.recipient_id"
                               :options="transactionResource.selector.recipients"
                               v-if="addOrEdit == 'Add' && (transactionResource.selector.recipients)"
                               :error="tmpApiValidationErrors.recipient_id ? tmpApiValidationErrors.recipient_id[0] : ''"
          >
          </base-selector-input>
          <base-input :label="$t('property.recipient')"
                      v-if="addOrEdit != 'Add' || (!transactionResource.selector.recipients)" 
                      :value="resource.model.recipient ? (resource.model.recipient.id ? resource.model.recipient.recipient_name : '') : (transactionResource.model.recipient_id ? transactionResource.model.recipient_name : '')"
                      :disabled="true"
                      :error="tmpApiValidationErrors.recipient_id ? tmpApiValidationErrors.recipient_id[0] : ''">
          </base-input>
        </div>
      </div>
      <div v-if="resource.model.recipient">
        <div class="row">
          <div class="col-md-6 ">
            <base-selector-input :label="$t('property.assetNickname')"
                                v-model="resource.model.asset.id"
                                :options="resource.selector.assets"
                                v-if="addOrEdit == 'Add' && (query ? !query.assetId : true)"
                                :error="tmpApiValidationErrors.asset_id ? tmpApiValidationErrors.asset_id[0] : ''"
            >
            </base-selector-input>
            <!-- <base-input :label="$t('property.assetNickname')"
                            v-if="addOrEdit == 'Add' && (query ? query.assetId : true)"
                            :value="resource.model.asset ? resource.model.asset.asset_nickname : ''"
                            :disabled="true"
                            :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
            </base-input> -->
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_id"/> -->
            <base-input :label="$t('property.assetNickname')"
                        v-if="addOrEdit != 'Add' || (query ? query.assetId : false)" 
                        :value="resource.model.asset ? resource.model.asset.asset_nickname : ''"
                        :disabled="true"
                        :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 ">
            <base-input :label="$t('property.billingName')"
                        :placeholder="$t('property.billingName')"
                        v-model="resource.model.description"
                        :error="tmpApiValidationErrors.description ? tmpApiValidationErrors.description[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.description"/> -->
          </div>
          <div class="col-md-6">
            <base-input :label="$t('property.amount')"
                        :placeholder="$t('property.amount')"
                        v-model="resource.model.amount"
                        :error="tmpApiValidationErrors.amount ? tmpApiValidationErrors.amount[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.amount"/> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <base-selector-input :label="$t('property.paymentMethod')"
                                :placeholder="$t('property.paymentMethod')"
                                v-model="resource.model.payment_method"
                                :initialValue="resource.model.payment_method"
                                :options="resource.selector.payment_method"
                                :error="tmpApiValidationErrors.payment_method ? tmpApiValidationErrors.payment_method[0] : ''"
            >
            </base-selector-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_method"/> -->
          </div>
          <div class="col-md-6">
            <!-- <base-selector-input :label="$t('property.paymentType')"
                                :placeholder="$t('property.paymentType')"
                                v-model="resource.model.payment_type"
                                :initialValue="resource.model.payment_type"
                                :options="resource.selector.payment_type"
                                :error="tmpApiValidationErrors.payment_type ? tmpApiValidationErrors.payment_type[0] : ''"
            >
            </base-selector-input> -->
            <base-input :label="$t('property.paymentType')"
                        value="Rental"
                        :disabled="true"
                        :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_type"/> -->
          </div>
        </div>
        <div class="row">
          <!-- <div class="col-md-6"> -->
            <!-- <base-selector-input :label="$t('property.frequencyType')"
                                :placeholder="$t('property.frequencyType')"
                                v-model="resource.model.frequency_type"
                                :initialValue="resource.model.frequency_type"
                                :options="resource.selector.frequency_type"
                                :error="tmpApiValidationErrors.frequency_type ? tmpApiValidationErrors.frequency_type[0] : ''"
            >
            </base-selector-input> -->
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.frequency_type"/> -->
          <!-- </div> -->
          <!-- <div class="col-md-6"> -->
            <!-- <base-input :label="$t('property.billingStartDate')"
                        :error="tmpApiValidationErrors.billing_start_at ? tmpApiValidationErrors.billing_start_at[0] : ''">
                  <el-date-picker
                    type="date"
                    :placeholder="$t('property.billingStartDate')"
                    v-model="resource.model.billing_start_at"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
            </base-input> -->
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.billing_start_at"/> -->
          <!-- </div> -->
          <div class="col-md-6">
            <base-input :label="$t('property.billingDateRange')"
                        :error="tmpApiValidationErrors.billing_start_at ? (tmpApiValidationErrors.billing_end_at ? tmpApiValidationErrors.billing_start_at[0] + ' ' + tmpApiValidationErrors.billing_end_at[0] : tmpApiValidationErrors.billing_start_at[0]) : (tmpApiValidationErrors.billing_end_at ? tmpApiValidationErrors.billing_end_at[0] : '')">
                  <el-date-picker
                    type="daterange"
                    v-model="billingDateRange"
                    value-format="yyyy-MM-dd"
                    range-separator="-"
                    :start-placeholder="$t('property.billingStartDate')"
                    :end-placeholder="$t('property.billingEndDate')"
                  >
                  </el-date-picker>
            </base-input>
          </div>
          <div class="col-md-6">
            <base-selector-input :label="$t('property.endOfMonthBilling')"
                                :placeholder="$t('property.endOfMonthBilling')"
                                v-model="endOfMonthBilling"
                                :options="endOfMonthBillingOptions"
                                value="1"
                                :error="tmpApiValidationErrors.end_of_month_billing ? tmpApiValidationErrors.end_of_month_billing[0] : ''"
            >
            </base-selector-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <base-input :label="$t('property.gracePeriod')"
                        :placeholder="$t('property.gracePeriod')"
                        type="number"
                        v-model="resource.model.grace_period_in_days"
                        :error="tmpApiValidationErrors.grace_period_in_days ? tmpApiValidationErrors.grace_period_in_days[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.grace_period_in_days"/> -->
          </div>
          <div class="col-md-6">
            <base-input :label="$t('property.remindBefore')"
                        :placeholder="$t('property.remindBefore')"
                        type="number"
                        v-model="resource.model.remind_before_days"
                        :error="tmpApiValidationErrors.remind_before_days ? tmpApiValidationErrors.remind_before_days[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.remind_before_days"/> -->
          </div>
        </div>
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleBack()" fill>{{$t('component.cancel')}}</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{$t('component.add')}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    // ValidationError,
    BaseInput,
    BaseSelectorInput,
    Card
  },
  data() {
    return {
      billingDateRange: [],
      endOfMonthBilling: {},
      endOfMonthBillingOptions: [{'id': '1', 'name': this.$t('property.endOfMonthBillingTrue')}, {'id': '0', 'name': this.$t('property.endOfMonthBillingFalse')}]
    }
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
    transactionResource: {
      type: Object,
      required: true,
      default: {
        model: {},
        selector: []
      },
      description: "Transaction resource info"
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
      required: false,
      default: "Add"
    },
    query: {
      type: Object,
      // default: {},
    },
    previousRoute: {
      type: String,
      required: false,
      default: "",
      description: "Previous Route"
    }
  },
  mounted() {
    // console.log('mounted');
    // console.log(this.resource);
    // console.log(this.resource.model.payment_description);
    // console.log(this.resource.data);
    // console.log(this.resource.selector);
  },
  created() {
    this.endOfMonthBilling = "1";
  },
  methods: {
    senderIdOnChange(val) {
      this.$emit("senderIdOnChange", val);
    },
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    },
    async handleSubmit() {
      let formData = new FormData();

      // if (this.resource.model.file) {
      //   formData.append('file', this.resource.model.file);
      // }

      for (const [key, value] of Object.entries(this.translateModel())) {
        if (value) {
          formData.append(key, value);
          continue;
        }
        if (key == "is_reference_only") {
          formData.append(key, value);
        }
      }
      this.$emit('submit', formData)
    },
    translateModel() {
      return {
        recipient_type: this.resource.model.recipient.recipient_type,
        recipient_id: this.resource.model.recipient.id,
        sender_type: this.resource.model.sender.sender_type,
        sender_id: this.resource.model.sender.id,
        asset_id: this.resource.model.asset.id,
        description: this.resource.model.description,
        payment_method: this.resource.model.payment_method,
        // payment_type: this.resource.model.payment_type,
        payment_type: "RENTAL",
        amount: this.resource.model.amount,
        // frequency_type: this.resource.model.frequency_type,
        frequency_type: "MONTH",
        frequency: 1,
        billing_start_at: this.billingDateRange.length == 2 ? this.billingDateRange[0] : '',
        billing_end_at: this.billingDateRange.length == 2 ? this.billingDateRange[1] : '',
        grace_period_in_days: this.resource.model.grace_period_in_days,
        remind_before_days: this.resource.model.remind_before_days,
        end_of_month_billing: this.endOfMonthBilling,
      }
    }
  }
}
</script>
<style></style>
