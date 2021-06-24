<template>
  <div class="content">
    <tenant-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
      :addOrEdit="addOrEdit"
      ></tenant-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
import TenantAddOrEdit from "@/components/Resources/Tenants/TenantAddOrEdit";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    BaseSelectorInput,
    TenantAddOrEdit
  },
  data() {
    return {
      resource: {
        model: {},
        data: {},
        selector: {}
      },
      addOrEdit: "Edit"
    };
  },
  mounted() {
    this.getTenant();
  },
  methods: {
    async getTenant() {
      try {
        await this.$store.dispatch('tenant/getById', this.$route.params.tenantId).then(() => {
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
      const modelId = this.$route.params.tenantId
      if (modelId == null) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } else {
        try {
          await this.$store.dispatch('tenant/update', {'modelId': modelId, 'model': model})
          this.$notify({
            message:'Successfully Updated',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.resetApiValidation()
          router.go(-1);
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
}
</script>
<style>
</style>
