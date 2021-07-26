<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <tenants-index-component
      :resource="resource"
      @getResource="getResource"
    ></tenants-index-component>
  </div>
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
      }
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
