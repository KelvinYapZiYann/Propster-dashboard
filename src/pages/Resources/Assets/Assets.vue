<template>
    <assets-index-component
      :resource="resource"
    ></assets-index-component>
</template>
<script>
import AssetsIndexComponent from "@/components/Resources/Assets/AssetsIndexComponent";

export default {
  components: {
    AssetsIndexComponent
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
        await this.$store.dispatch('asset/get', {}).then(() => {
          this.resource.models = Object.assign({}, this.$store.getters["asset/models"])
          this.resource.data = Object.assign({}, this.$store.getters["asset/data"])
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
