<template>
  <div class="content">
    <tenant-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      :addOrEdit="addOrEdit"
      @submit="handleSubmit"
    >
    </tenant-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import TenantAddOrEdit from "@/components/Resources/Tenants/TenantAddOrEdit";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    TenantAddOrEdit
  },
  data() {
    return {
      resource: {
        model: {},
        data: {},
        selector: {}
      },
      addOrEdit: "Add"
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('tenant/create').then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenant/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenant/selector"])
        })
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    async handleSubmit(model) {
        try {
          await this.$store.dispatch('tenant/store', {'model': model}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["tenant/model"])
            this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
          })
          this.$notify({
            message:'Successfully Added',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.resetApiValidation();
          // router.push({path: "/tenants"});
        } catch (e) {
          this.$notify({
            message:'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
          this.setApiValidation(e.response.data.errors)
        }
    }
  }
}
</script>
<style>
</style>
