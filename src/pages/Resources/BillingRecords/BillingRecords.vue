<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <billing-record-index-component
      :resource="resource"
      @getResource="getResource"
      billingRecordType="All"
    ></billing-record-index-component>
    <!-- <billing-record-index-component
      :resource="resource"
      @getResource="getResource"
      billingRecordType="Receiving"
    ></billing-record-index-component> -->
    <!-- <billing-record-index-component
      :resource="resource"
      @getResource="getResource"
      billingRecordType="Sending"
    ></billing-record-index-component> -->
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
      }
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
