<template>
  <div>
    <asset-expenses-index-component
      :resource="resource"
    ></asset-expenses-index-component>
  </div>
</template>
<script>
import AssetExpensesIndexComponent from "@/components/Resources/AssetExpenses/AssetExpensesIndexComponent";

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
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('assetExpenses/get', {})
        this.resource.models = await this.$store.getters["assetExpenses/models"]
        this.resource.data = await this.$store.getters["assetExpenses/data"]
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
