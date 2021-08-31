<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <asset-expenses-index-component
      :resource="resource"
      @getResource="getResource"
      :tableData="{'columnsClass': columnsClass}"
    ></asset-expenses-index-component>
  </div>
</template>
<script>
import AssetExpensesIndexComponent from "@/components/Resources/AssetExpenses/AssetExpensesIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    AssetExpensesIndexComponent
  },
  data() {
    return {
      resource: {
        models: [{}],
        data: {}
      },
      columnsClass: [
        {name:"status", class:[]}
      ],
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
        await this.$store.dispatch('assetExpenses/get', {})
        this.resource.models = await this.$store.getters["assetExpenses/models"]
        this.resource.data = await this.$store.getters["assetExpenses/data"]
        let tmpColumnsClass = [];
        for (let i = 0; i < this.resource.models.length; i++) {
          if (this.resource.models[i].status == 'RECEIVED') {
            tmpColumnsClass.push('badge badge-pill badge-success');
          }
        }
        this.columnsClass[0] = {name:"status", class:tmpColumnsClass};
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
