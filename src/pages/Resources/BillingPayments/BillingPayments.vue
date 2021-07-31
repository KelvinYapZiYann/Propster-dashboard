<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <billing-payment-index-component
      :resource="resource"
      @getResource="getResource"
    ></billing-payment-index-component>
  </div>
</template>
<script>
import BillingPaymentIndexComponent from "@/components/Resources/BillingPayments/BillingPaymentIndexComponent";

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
      try {
        await this.$store.dispatch('billingPayments/get', {}).then(() => {
          this.resource.models = this.$store.getters["billingPayments/models"];
          this.resource.data = Object.assign({}, this.$store.getters["billingPayments/data"]);
        });
      } catch (e) {
        console.log(e);
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
