<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <transaction-section
      :resource="resource"
    ></transaction-section>
    <base-detail-list
      :title="$t('property.billingPaymentDetails')"
      :model="resource.model"
      :headers="table.detailHeaders"
      :detailDisplayValue="table.detailDisplayValue"
      :detailDisplayPrefix="table.detailDisplayPrefix"
      thead-classes="text-primary"
    ></base-detail-list>

    <payment-record-index-component
      :resource="paymentRecordResource"
      @getResource="getResource"
      :query="{
        billingPaymentId: $route.params.billingPaymentId,
        tenantId: resource.model.sender ? resource.model.sender.id : null,
        assetId: resource.model.asset ? resource.model.asset.id : null,
        paymentType: resource.model.payment_type ? resource.model.payment_type : null,
        amount: resource.model.amount ? resource.model.amount : null,
      }"
      :tableData="{'columnsClass': columnsClass}"
    ></payment-record-index-component>

    <base-button slot="footer" type="info" @click="handleBack()" fill>{{$t('component.back')}}</base-button>
  </div>
</template>
<script>
import { BaseDetailList, TransactionSection } from "@/components";
import PaymentRecordIndexComponent from "@/components/Resources/PaymentRecords/PaymentRecordIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    TransactionSection,
    BaseDetailList,
    PaymentRecordIndexComponent
  },
  data() {
    return {
      resource: {
        model: {},
        data: {}
      },
      paymentRecordResource: {
        models: [],
        data: {}
      },
      columnsClass: [
        {name:"status", class:[]}
      ],
      table: {
        detailHeaders: {
          asset_nickname: this.$t('property.assetNickname'),
          description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          payment_type: this.$t('property.paymentType'),
          // billing_start_at: this.$t('property.billingStartDate'),
          // billing_end_at: this.$t('property.billingEndDate'),
          // end_of_month_billing: this.$t('property.endOfMonthBilling'),
          // grace_period_in_days: this.$t('property.gracePeriod'),
          // remind_before_days: this.$t('property.remindBefore'),
          // status: this.$t('property.status'),
        },
        detailDisplayValue: {
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
        await this.$store.dispatch('billingPayments/getById', this.$route.params.billingPaymentId).then(() => {
          this.resource.model = this.$store.getters["billingPayments/model"]
          this.resource.data = this.$store.getters["billingPayments/data"]
          // this.loadAttachment();
        });
        await this.$store.dispatch('billingPayments/getPaymentRecords', this.$route.params.billingPaymentId).then(() => {
          this.paymentRecordResource.models = this.$store.getters["billingPayments/paymentRecordModels"];
          this.paymentRecordResource.data = Object.assign({}, this.$store.getters["billingPayments/paymentRecordData"]);
          let tmpColumnsClass = [];
          for (let i = 0; i < this.paymentRecordResource.models.length; i++) {
            if (this.paymentRecordResource.models[i].status == 'RECEIVED') {
              tmpColumnsClass.push('badge badge-pill badge-success');
            } else if (this.paymentRecordResource.models[i].status == 'AWAITING_ACKNOWLEDGEMENT') {
              tmpColumnsClass.push('badge badge-pill badge-warning');
            }
          }
          this.columnsClass[0] = {name:"status", class:tmpColumnsClass};
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
    // loadAttachment() {
    //   if (!this.resource.model.media) {
    //     return;
    //   }
    //   if (this.resource.model.media.length > 0) {
    //     this.showMedia = true;
    //     let fileData = this.resource.model.media[0].temporary_url;
    //     let file = { name: this.resource.model.media[0].file_name, type: this.resource.model.media[0].mime_type };
    //     this.$refs.myVueDropzone.manuallyAddFile(file, fileData);
    //     this.$refs.myVueDropzone.removeEventListeners()
    //     // this.$refs.myVueDropzone.setupEventListeners()
    //   }
    // },
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
