<template>
  <tenants-index-component
    :resource="resource"
    :showAll="showAll"
  ></tenants-index-component>
</template>
<script>
import { BaseTable } from "@/components";
import TenantsIndexComponent from "@/components/Resources/Tenants/TenantsIndexComponent";

export default {
  components: {
    BaseTable,
    TenantsIndexComponent
  },
  data() {
    return {
      resource: {
        models: [{}],
        data: {}
      },
      showAll: true
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('tenant/get', {}).then(() => {
          this.resource.models = this.$store.getters["tenant/models"]
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
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
