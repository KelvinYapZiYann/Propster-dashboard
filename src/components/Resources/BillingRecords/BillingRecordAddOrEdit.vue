<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{$t('component.add')}} {{query.billImmediately ? $t('sidebar.oneTimeBillingRecords') : $t('sidebar.billingRecord')}}</h5>
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
                      v-else
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
          >
          <!-- :error="tmpApiValidationErrors.recipient_id ? tmpApiValidationErrors.recipient_id[0] : ''" -->
          </base-selector-input>
          <base-input :label="$t('property.recipient')"
                      v-else
                      :value="resource.model.recipient ? (resource.model.recipient.id ? resource.model.recipient.recipient_name : '') : (transactionResource.model.recipient_id ? transactionResource.model.recipient_name : '')"
                      :disabled="true">
                      <!-- :error="tmpApiValidationErrors.recipient_id ? tmpApiValidationErrors.recipient_id[0] : ''" -->
          </base-input>
        </div>
      </div>
      <div v-if="resource.model.recipient">
        <div class="row">
          <div class="col-md-6 ">
            <base-selector-input :label="$t('property.assetNickname')"
                                v-model="resource.model.asset.id"
                                :options="resource.selector.assets"
                                v-if="addOrEdit == 'Add' && (query ? !query.assetId : true) && resource.model.payment_type != 'RENTAL'"
                                :error="tmpApiValidationErrors.asset_id ? tmpApiValidationErrors.asset_id[0] : ''"
            >
            </base-selector-input>
            <base-input :label="$t('property.assetNickname')"
                        v-else-if="addOrEdit == 'Add' && (query ? !query.assetId : true) && resource.model.payment_type == 'RENTAL'" 
                        :value="tenureContractResource.model.asset ? tenureContractResource.model.asset.asset_nickname : ''"
                        :disabled="true"
                        :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
            </base-input>
            <!-- <base-input :label="$t('property.assetNickname')"
                            v-if="addOrEdit == 'Add' && (query ? query.assetId : true)"
                            :value="resource.model.asset ? resource.model.asset.asset_nickname : ''"
                            :disabled="true"
                            :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
            </base-input> -->
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_id"/> -->
            <base-input :label="$t('property.assetNickname')"
                        v-else
                        :value="resource.model.asset ? resource.model.asset.asset_nickname : ''"
                        :disabled="true"
                        :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
            </base-input>
          </div>
          <div class="col-md-6 ">
            <base-selector-input :label="$t('sidebar.tenureContract')"
                                v-if="(query ? !query.tenureContractId : true) && (resource.model.payment_type == 'RENTAL')" 
                                v-model="tenureContractResource.model.id"
                                :options="tenureContractResource.selector.tenureContracts"
                                @input="tenureContractIdOnChange"
            >
            </base-selector-input>
            <base-input :label="$t('sidebar.tenureContract')"
                        v-if="(query ? query.tenureContractId : false)" 
                        :value="tenureContractResource.model.contract_name ? tenureContractResource.model.contract_name : ''"
                        :disabled="true"
                        >
            </base-input>
            <!-- :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''" -->
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
                        v-if="!query.tenureContractId && resource.model.payment_type != 'RENTAL'"
                        :error="tmpApiValidationErrors.amount ? tmpApiValidationErrors.amount[0] : ''">
            </base-input>
            <base-input :label="$t('property.amount')"
                        :placeholder="$t('property.amount')"
                        v-model="tenureContractResource.model.monthly_rental_amount"
                        v-else-if="!query.tenureContractId && resource.model.payment_type == 'RENTAL'"
                        :disabled="true"
                        :error="tmpApiValidationErrors.amount ? tmpApiValidationErrors.amount[0] : ''">
            </base-input>
            <base-input :label="$t('property.amount')"
                        :placeholder="$t('property.amount')"
                        v-model="tenureContractAmount"
                        v-else
                        :disabled="true"
                        :error="tmpApiValidationErrors.amount ? tmpApiValidationErrors.amount[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.amount"/> -->
          </div>
        </div>
        <div class="row">
          <!-- <div class="col-md-6">
            <base-selector-input :label="$t('property.paymentMethod')"
                                :placeholder="$t('property.paymentMethod')"
                                v-model="resource.model.payment_method"
                                :initialValue="resource.model.payment_method"
                                :options="resource.selector.payment_method"
                                :error="tmpApiValidationErrors.payment_method ? tmpApiValidationErrors.payment_method[0] : ''"
            >
            </base-selector-input>
          </div> -->
          <div class="col-md-6">
            <base-selector-input :label="$t('property.paymentType')"
                                :placeholder="$t('property.paymentType')"
                                v-model="resource.model.payment_type"
                                :initialValue="resource.model.payment_type"
                                :options="resource.selector.payment_type"
                                v-if="!query.tenureContractId"
                                :error="tmpApiValidationErrors.payment_type ? tmpApiValidationErrors.payment_type[0] : ''"
            >
            </base-selector-input>
            <base-input :label="$t('property.paymentType')"
                        value="Rental"
                        :disabled="true"
                        v-if="query.tenureContractId"
                        :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_type"/> -->
          </div>
          <div class="col-md-6">
            <base-selector-input :label="$t('property.endOfMonthBilling')"
                                :placeholder="$t('property.endOfMonthBilling')"
                                v-model="endOfMonthBilling"
                                :options="endOfMonthBillingOptions"
                                value="1"
                                v-if="!query.billImmediately"
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
                        v-if="!query.billImmediately"
                        :error="tmpApiValidationErrors.grace_period_in_days ? tmpApiValidationErrors.grace_period_in_days[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.grace_period_in_days"/> -->
          </div>
          <div class="col-md-6">
            <base-input :label="$t('property.remindBefore')"
                        :placeholder="$t('property.remindBefore')"
                        type="number"
                        v-model="resource.model.remind_before_days"
                        v-if="!query.billImmediately"
                        :error="tmpApiValidationErrors.remind_before_days ? tmpApiValidationErrors.remind_before_days[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.remind_before_days"/> -->
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
          <div class="col-md-12">
            <!-- <base-input :label="$t('property.billingDateRange')"
                        v-if="!query.tenureContractId && !query.billImmediately && resource.model.payment_type != 'RENTAL'"
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
            </base-input> -->
            <v-date-picker
              v-if="!query.tenureContractId && !query.billImmediately && resource.model.payment_type != 'RENTAL'"
              v-model="billingDateRange"
              :masks="{input: 'YYYY-MM-DD'}"
              is-range
            >
              <template v-slot="{ inputValue, inputEvents }">
                <div class="row">
                  <div class="col-md-6">
                    <base-input :label="$t('property.billingStartDate')"
                            :error="tmpApiValidationErrors.billing_start_at ? tmpApiValidationErrors.billing_start_at[0] : ''"
                            :placeholder="$t('property.billingStartDate')"
                            :value="inputValue.start"
                            v-on="inputEvents.start"
                            >
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input :label="$t('property.billingEndDate')"
                            :error="tmpApiValidationErrors.billing_end_at ? tmpApiValidationErrors.billing_end_at[0] : ''"
                            :placeholder="$t('property.billingEndDate')"
                            :value="inputValue.end"
                            v-on="inputEvents.end"
                            >
                    </base-input>
                  </div>
                </div>
              </template>
            </v-date-picker>
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
import VDatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    // ValidationError,
    BaseInput,
    BaseSelectorInput,
    Card,
    VDatePicker
  },
  data() {
    return {
      billingDateRange: {
        start: null,
        end: null
      },
      endOfMonthBilling: {},
      endOfMonthBillingOptions: [{'id': '1', 'name': this.$t('property.endOfMonthBillingTrue')}, {'id': '0', 'name': this.$t('property.endOfMonthBillingFalse')}],
      tenureContractAmount: ""
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
    tenureContractResource: {
      type: Object,
      required: true,
      default: {
        model: {},
        selector: []
      },
      description: "Tenure contract resource info"
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
    if (this.query.startDate && this.query.endDate) {
      this.billingDateRange = {
        start: new Date(this.query.startDate),
        end: new Date(this.query.endDate),
      };
    }
    if (this.query.tenureContractId) {
      this.$store.dispatch('tenureContract/getById',  this.query.tenureContractId).then(() => {
        let tmpModel = this.$store.getters["tenureContract/model"];
        this.tenureContractAmount = tmpModel.monthly_rental_amount;
        this.billingDateRange = {
          start: new Date(tmpModel.tenure_start_date),
          end: new Date(tmpModel.tenure_end_date),
        };
      });
    }
  },
  created() {
    this.endOfMonthBilling = "1";
  },
  methods: {
    senderIdOnChange(val) {
      this.$emit("senderIdOnChange", val);
    },
    tenureContractIdOnChange(val) {
      this.$emit("tenureContractIdOnChange", val);
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
      if (this.query.tenureContractId) {
        return {
          recipient_type: this.resource.model.recipient.recipient_type,
          recipient_id: this.resource.model.recipient.id,
          sender_type: this.resource.model.sender.sender_type,
          sender_id: this.resource.model.sender.id,
          asset_id: this.resource.model.asset.id,
          description: this.resource.model.description,
          // payment_method: this.resource.model.payment_method,
          payment_method: "CASH",
          // payment_type: this.resource.model.payment_type,
          payment_type: "RENTAL",
          amount: this.tenureContractAmount,
          frequency_type: "MONTH",
          tenure_contract_id: this.query.tenureContractId,
          frequency: 1,
          billing_start_at: this.billingDateRange.start ? this.billingDateRange.start.toISOString() : '',
          billing_end_at: this.billingDateRange.end ? this.billingDateRange.end.toISOString() : '',
          grace_period_in_days: this.resource.model.grace_period_in_days,
          remind_before_days: this.resource.model.remind_before_days,
          end_of_month_billing: this.endOfMonthBilling,
        }
      } else if (this.resource.model.payment_type == "RENTAL") {
        return {
          recipient_type: this.resource.model.recipient.recipient_type,
          recipient_id: this.resource.model.recipient.id,
          sender_type: this.resource.model.sender.sender_type,
          sender_id: this.resource.model.sender.id,
          asset_id: this.tenureContractResource.model.asset ? this.tenureContractResource.model.asset.id : '',
          description: this.resource.model.description,
          // payment_method: this.resource.model.payment_method,
          payment_method: "CASH",
          // payment_type: this.resource.model.payment_type,
          payment_type: "RENTAL",
          amount: this.tenureContractResource.model.monthly_rental_amount,
          frequency_type: "MONTH",
          tenure_contract_id: this.tenureContractResource.model.id,
          frequency: 1,
          billing_start_at: this.tenureContractResource.model.tenure_start_date,
          billing_end_at: this.tenureContractResource.model.tenure_end_date,
          grace_period_in_days: this.resource.model.grace_period_in_days,
          remind_before_days: this.resource.model.remind_before_days,
          end_of_month_billing: this.endOfMonthBilling,
        }
      } else if (this.query.billImmediately) {
        let today = new Date().toISOString().slice(0, 10);
        return {
          recipient_type: this.resource.model.recipient ? this.resource.model.recipient.recipient_type : '',
          recipient_id: this.resource.model.recipient ? this.resource.model.recipient.id : '',
          sender_type: this.resource.model.sender ? this.resource.model.sender.sender_type : '',
          sender_id: this.resource.model.sender ? this.resource.model.sender.id : '',
          asset_id: this.resource.model.asset.id,
          description: this.resource.model.description,
          // payment_method: this.resource.model.payment_method,
          payment_method: "CASH",
          payment_type: this.resource.model.payment_type,
          amount: this.resource.model.amount,
          frequency_type: "MONTH",
          frequency: 1,
          
          bill_immediately: 1,

          end_of_month_billing: '0',
          grace_period_in_days: '1',
          remind_before_days: '0',
          billing_start_at: today,
          billing_end_at: today,
        }
      } else {
        return {
          recipient_type: this.resource.model.recipient ? this.resource.model.recipient.recipient_type : '',
          recipient_id: this.resource.model.recipient ? this.resource.model.recipient.id : '',
          sender_type: this.resource.model.sender ? this.resource.model.sender.sender_type : '',
          sender_id: this.resource.model.sender ? this.resource.model.sender.id : '',
          asset_id: this.resource.model.asset.id,
          description: this.resource.model.description,
          // payment_method: this.resource.model.payment_method,
          payment_method: "CASH",
          payment_type: this.resource.model.payment_type,
          amount: this.resource.model.amount,
          frequency_type: "MONTH",
          frequency: 1,

          end_of_month_billing: this.endOfMonthBilling,
          grace_period_in_days: this.resource.model.grace_period_in_days,
          remind_before_days: this.resource.model.remind_before_days,
          billing_start_at: this.billingDateRange.start ? this.billingDateRange.start.toISOString() : '',
          billing_end_at: this.billingDateRange.end ? this.billingDateRange.end.toISOString() : '',
        }
      }
    },
    onPaymentTypeChange(value) {
      console.log(value);
    }
  }
}
</script>
<style></style>
