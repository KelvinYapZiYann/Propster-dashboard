<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <billing-payment-index-component
      :isBillingRecordsPayment="false"
      :resource="resource"
      @getResource="getResource"
    ></billing-payment-index-component>
  </div>
</template>
<script>
import BillingPaymentIndexComponent from "@/components/Resources/BillingPayments/BillingPaymentIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    BillingPaymentIndexComponent
  },
  data() {
    return {
      resource: {
        models: [{}],
        data: {}
      }
    };
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
        await this.$store.dispatch('billingPayments/get', {}).then(() => {
          this.resource.models = this.$store.getters["billingPayments/models"];
          this.resource.data = Object.assign({}, this.$store.getters["billingPayments/data"]);
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
    }
  }
};
</script>
<style>
</style>
