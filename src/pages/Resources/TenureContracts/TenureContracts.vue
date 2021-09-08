<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <tenure-contract-index-component
      :resource="resource"
      :tenantId="tenantId"
      :assetId="assetId"
      :tableData="{'rowColor': rowColor}"
      @getResource="getResource"
      @assetIdChange="assetIdChange"
      @tenantIdChange="tenantIdChange"
    ></tenure-contract-index-component>
  </div>
</template>
<script>
// import { BaseTable } from "@/components";
import TenureContractIndexComponent from "@/components/Resources/TenureContracts/TenureContractIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    // BaseTable,
    TenureContractIndexComponent
  },
  data() {
    return {
      resource: {
        models: [],
        data: {},
        selector: {}
      },
      rowColor: [],
      assetId: null,
      tenantId: null,
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
        await this.$store.dispatch('tenureContract/get', {}).then(() => {
          this.resource.models = this.$store.getters["tenureContract/models"]
          this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
          this.rowColor = [];
          let today = new Date();
          for (let i = 0; i < this.resource.models.length; i++) {
            let date = new Date(this.resource.models[i].tenure_end_date);
            if (date > today) {
              this.rowColor.push({});
            } else {
              this.rowColor.push({'backgroundColor': '#00000011'});
            }
          }
        })

        // await this.$store.dispatch('tenureContract/create', {}).then(() => {
        //   this.resource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
        // });
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    assetIdChange(value) {
      this.assetId = value;
    },
    tenantIdChange(value) {
      this.tenantId = value;
    }
  }
};
</script>
<style>
</style>
