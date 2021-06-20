<template>
  <div>
    <tenure-contract-index-component
      :resource="resource"
    ></tenure-contract-index-component>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import TenureContractIndexComponent from "@/components/Resources/TenureContracts/TenureContractIndexComponent";

export default {
  components: {
    BaseTable,
    TenureContractIndexComponent
  },
  data() {
    return {
      resource: {
        models: [{}],
        data: {}
      },
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('tenureContract/get', {}).then(() => {
          this.resource.models = Object.assign({}, this.$store.getters["tenureContract/models"])
          this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
        })
      } catch (e) {
        this.$notify({
          message:'Server error',
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
