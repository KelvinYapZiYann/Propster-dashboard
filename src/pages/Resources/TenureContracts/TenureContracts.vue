<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <tenure-contract-index-component
      :resource="resource"
      :tenantId="tenantId"
      :assetId="assetId"
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
        models: [{}],
        data: {},
        selector: {}
      },
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
