<template>
  <div class="content">
    <billing-record-index-component
      :resource="resource"
      @getResource="getResource"
      :billingRecordType="receivingBillingRecordType"
    ></billing-record-index-component>
    <billing-record-index-component
      :resource="resource"
      @getResource="getResource"
      :billingRecordType="sendingBillingRecordType"
    ></billing-record-index-component>
  </div>
</template>
<script>
import BillingRecordIndexComponent from "@/components/Resources/BillingRecords/BillingRecordIndexComponent";

export default {
  components: {
    BillingRecordIndexComponent
  },
  data() {
    return {
      resource: {
        models: [{}],
        data: {}
      },
      receivingBillingRecordType: "Receiving",
      sendingBillingRecordType: "Sending",
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('billingRecords/get', {}).then(() => {
          this.resource.models = this.$store.getters["billingRecords/models"]
          this.resource.data = Object.assign({}, this.$store.getters["billingRecords/data"])
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
