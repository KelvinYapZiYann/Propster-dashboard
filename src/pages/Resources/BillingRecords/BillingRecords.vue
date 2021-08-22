<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <billing-record-index-component
      :resource="resource"
      :tableData="{'rowColor': rowColor}"
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
import errorHandlingService from "@/store/services/error-handling-service";

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
      rowColor: [],
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
        await this.$store.dispatch('billingRecords/get', {}).then(() => {
          this.resource.models = this.$store.getters["billingRecords/models"]
          this.resource.data = Object.assign({}, this.$store.getters["billingRecords/data"])
          this.rowColor = [];
          let today = new Date();
          for (let i = 0; i < this.resource.models.length; i++) {
            let date = new Date(this.resource.models[i].billing_end_at);
            if (date > today) {
              this.rowColor.push({});
            } else {
              this.rowColor.push({'backgroundColor': '#00000011'});
            }
          }
        })
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
