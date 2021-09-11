<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <payment-record-index-component
      :resource="resource"
      @getResource="getResource"
      :tableData="{'columnsClass': columnsClass}"
    ></payment-record-index-component>
  </div>
</template>
<script>
import PaymentRecordIndexComponent from "@/components/Resources/PaymentRecords/PaymentRecordIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    PaymentRecordIndexComponent
  },
  data() {
    return {
      resource: {
        models: [],
        data: {}
      },
      columnsClass: [
        {name: "status" , class: []},
        {name: "cashflow" , class: []},
      ]
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
        // await this.$store.dispatch('paymentRecords/get', {})
        // this.resource.models = await this.$store.getters["paymentRecords/models"]
        // this.resource.data = await this.$store.getters["paymentRecords/data"]
        await this.$store.dispatch('paymentRecords/get', {}).then(() => {
          this.resource.models = this.$store.getters["paymentRecords/models"]
          this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"])
          let tmpStatusColumnsClass = [];
          let tmpCashflowColumnsClass = [];
          for (let i = 0; i < this.resource.models.length; i++) {
            if (this.resource.models[i].status == 'RECEIVED') {
              tmpStatusColumnsClass.push('badge badge-pill badge-success');
            } else if (this.resource.models[i].status == 'AWAITING_ACKNOWLEDGEMENT') {
              tmpStatusColumnsClass.push('badge badge-pill badge-warning');
            }
            if (this.resource.models[i].cash_flow_direction == 'RECEIVING') {
              tmpCashflowColumnsClass.push('badge badge-pill badge-success');
            } else if (this.resource.models[i].cash_flow_direction == 'SENDING') {
              tmpCashflowColumnsClass.push('badge badge-pill badge-danger');
            }
          }
          this.columnsClass = [
            {name: "status", class: tmpStatusColumnsClass},
            {name: "cash_flow_direction", class: tmpCashflowColumnsClass}
          ];
        })
      } catch (e) {
        console.log(e);
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
