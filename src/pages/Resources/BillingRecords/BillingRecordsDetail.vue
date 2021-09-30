<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <transaction-section
      :resource="resource"
    ></transaction-section>
    <base-detail-list
      :title="$t('property.billingRecordDetails')"
      :model="resource.model"
      :headers="table.detailHeaders"
      :headers2="table.detailHeaders2"
      :detailDisplayValue="table.detailDisplayValue"
      :detailDisplayPrefix="table.detailDisplayPrefix"
      :detailDisplaySuffix="table.detailDisplaySuffix"
      thead-classes="text-primary"
    ></base-detail-list>

    <billing-payment-index-component
      :isBillingRecordsPayment="true"
      :resource="billingPaymentResource"
      @getResource="getResource"
      :query="{
        billingRecordId: $route.params.billingRecordId,
      }"
    ></billing-payment-index-component>

    <base-button slot="footer" type="neutral" @click="handleBack()" fill>{{$t('component.back')}}</base-button>
  </div>
</template>
<script>
import { BaseDetailList, TransactionSection } from "@/components";
import BillingPaymentIndexComponent from "@/components/Resources/BillingPayments/BillingPaymentIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    TransactionSection,
    BaseDetailList,
    BillingPaymentIndexComponent
  },
  data() {
    return {
      resource: {
        model: {},
        data: {}
      },
      billingPaymentResource: {
        models: [],
        data: {}
      },
      table: {
        detailHeaders: {
          asset_nickname: this.$t('property.assetNickname'),
          description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          payment_type: this.$t('property.paymentType'),
          billing_start_at: this.$t('property.billingStartDate'),
          billing_end_at: this.$t('property.billingEndDate'),
        },
        detailHeaders2: {
          end_of_month_billing: this.$t('property.endOfMonthBilling'),
          grace_period_in_days: this.$t('property.gracePeriod'),
          remind_before_days: this.$t('property.remindBefore'),
          next_billing_amount: this.$t('property.nextBillingAmount'),
          next_billing_date: this.$t('property.nextBillingDate'),
          // status: this.$t('property.status'),
        },
        detailDisplayValue: {
          end_of_month_billing: {
            "1": "End Of Month",
            "0": "At The Date Of First Billing",
          },
          payment_type: {
            APPLIANCES: "Appliances",
            BILL_ELECTRICITY: "Electricity bill",
            BILL_GAS: "Gas bill",
            BILL_INSURANCE: "Insurance Bill",
            BILL_INTERNET: " Internet bill",
            BILL_MANAGEMENT: "Management fee",
            BILL_REPAIR: "Repair Bill",
            BILL_SINKING_FUND: "Sinking fund",
            BILL_TV_PROGRAMME: "TV Programme bill",
            BILL_WATER: "Water bill",
            DEPOSIT: "Deposit",
            FURNITURE: "Furniture",
            LATE_FEE_PENALTY: "Late Fee Penalty",
            LOAN_INSTALLMENT: "Loan Installment",
            MAINTENANCE_COST: "Maintenance cost",
            OTHERS: "Others",
            PARKING_RENTAL: "Parking Rental",
            RENOVATION: "Renovation",
            RENTAL: "Rental",
            TAX_CUKAI_PINTU: "Cukai Pintu",
            TAX_CUKAI_TANAH: "Cukai Tanah",
          }
        },
        detailDisplayPrefix: {
          amount: "RM",
          next_billing_amount: "RM"
        },
        detailDisplaySuffix: {
          grace_period_in_days: " day(s)",
          remind_before_days: " day(s)",
        },
      },
    };
  },
  props: {
    previousRoute: {
      type: String,
      required: false,
      default: "",
      description: "Previous Route"
    }
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('billingRecords/getById', this.$route.params.billingRecordId).then(() => {
          this.resource.model = this.$store.getters["billingRecords/model"]
          this.resource.data = this.$store.getters["billingRecords/data"]
          this.loadAttachment();
        });
        await this.$store.dispatch('billingRecords/getBillingPayments', this.$route.params.billingRecordId).then(() => {
          this.billingPaymentResource.models = this.$store.getters["billingRecords/billingPaymentModels"];
          this.billingPaymentResource.data = Object.assign({}, this.$store.getters["billingRecords/billingPaymentData"]);
        });
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    loadAttachment() {
      if (!this.resource.model.media) {
        return;
      }
      if (this.resource.model.media.length > 0) {
        this.showMedia = true;
        let fileData = this.resource.model.media[0].temporary_url;
        let file = { name: this.resource.model.media[0].file_name, type: this.resource.model.media[0].mime_type };
        this.$refs.myVueDropzone.manuallyAddFile(file, fileData);
        this.$refs.myVueDropzone.removeEventListeners()
        // this.$refs.myVueDropzone.setupEventListeners()
      }
    },
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style>
</style>
