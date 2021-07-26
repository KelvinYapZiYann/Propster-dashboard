<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <payment-record-index-component
      :resource="resource"
      @getResource="getResource"
      :paymentRecordType="allPaymentRecordType"
    ></payment-record-index-component>
  </div>
</template>
<script>
import PaymentRecordIndexComponent from "@/components/Resources/PaymentRecords/PaymentRecordIndexComponent";

export default {
  components: {
    PaymentRecordIndexComponent
  },
  data() {
    return {
      resource: {
        models: [{}],
        data: {}
      },
      allPaymentRecordType: "All"
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        // await this.$store.dispatch('paymentRecords/get', {})
        // this.resource.models = await this.$store.getters["paymentRecords/models"]
        // this.resource.data = await this.$store.getters["paymentRecords/data"]
        await this.$store.dispatch('paymentRecords/get', {}).then(() => {
          this.resource.models = this.$store.getters["paymentRecords/models"]
          this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"])
        })
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
