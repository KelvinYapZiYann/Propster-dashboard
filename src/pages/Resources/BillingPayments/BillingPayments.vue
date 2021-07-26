<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <!-- <billing-payment-index-component
      :resource="receivingResource"
      @getResource="getResource"
      billingPaymentType="Receiving"
    ></billing-payment-index-component> -->
    <!-- <billing-payment-index-component
      :resource="sendingResource"
      @getResource="getResource"
      billingPaymentType="Sending"
    ></billing-payment-index-component> -->
  </div>
</template>
<script>
// import BillingPaymentIndexComponent from "@/components/Resources/BillingPayments/BillingPaymentIndexComponent";

export default {
  components: {
    // BillingPaymentIndexComponent
  },
  data() {
    return {
      receivingResource: {
        models: [{}],
        data: {}
      },
      sendingResource: {
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
      try {
        // await this.$store.dispatch('billingPayment/getReceivingBillingPayments', {}).then(() => {
        //   this.receivingResource.models = this.$store.getters["billingPayment/receivingBillingPaymentsModels"]
        //   this.receivingResource.data = Object.assign({}, this.$store.getters["billingPayment/receivingBillingPaymentsData"])
        // })
        // await this.$store.dispatch('billingPayment/getSendingBillingPayments', {}).then(() => {
        //   this.sendingResource.models = this.$store.getters["billingPayment/sendingBillingPaymentsModels"]
        //   this.sendingResource.data = Object.assign({}, this.$store.getters["billingPayment/sendingBillingPaymentsData"])
        // })
      } catch (e) {
        this.$notify({
          message: 'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    }
  }
};
</script>
<style>
</style>
