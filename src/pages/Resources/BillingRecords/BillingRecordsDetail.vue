<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <transaction-section
      :resource="resource"
    ></transaction-section>
    <base-detail-list
      :category="$t('property.billingRecordDetails')"
      :model="resource.model"
      :headers="table.detailHeaders"
      thead-classes="text-primary"
    ></base-detail-list>

    <!-- <billing-payment-index-component
      :resource="billingPaymentResource"
      @getResource="getResource"
    ></billing-payment-index-component> -->

    <base-button slot="footer" type="info" @click="handleBack()" fill>{{$t('component.back')}}</base-button>
  </div>
</template>
<script>
import { BaseDetailList, TransactionSection } from "@/components";
import BillingPaymentIndexComponent from "@/components/Resources/BillingPayments/BillingPaymentIndexComponent";

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
        models: [{}],
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
          end_of_month_billing: this.$t('property.endOfMonthBilling'),
          grace_period_in_days: this.$t('property.gracePeriod'),
          remind_before_days: this.$t('property.remindBefore'),
          // status: this.$t('property.status'),
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
      try {
        await this.$store.dispatch('billingRecords/getById', this.$route.params.billingRecordsId).then(() => {
          this.resource.model = this.$store.getters["billingRecords/model"]
          this.resource.data = this.$store.getters["billingRecords/data"]
          this.loadAttachment();
        });
        // await this.$store.dispatch('billingPayments/get', {}).then(() => {
        //   this.billingPaymentResource.models = this.$store.getters["billingPayments/models"];
        //   this.billingPaymentResource.data = Object.assign({}, this.$store.getters["billingPayments/data"]);
        // });
      } catch (e) {
        this.$notify({
          message: 'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
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
