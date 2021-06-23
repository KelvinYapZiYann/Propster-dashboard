<template>
  <div class="content">
    <asset-add-or-edit
      :resource="resource"
      :apiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
    >
    </asset-add-or-edit>
  </div>
</template>
<script>
// import AssetForm from "@/pages/Resources/Assets/Form/AssetForm";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
import AssetAddOrEdit from "@/components/Resources/Assets/AssetAddOrEdit";

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    ValidationError,
    BaseSelectorInput,
    AssetAddOrEdit
  },
  data() {
    return {
      resource: {
        model: {},
        data: {},
        selector: {}
      },
    };
  },
  mounted() {
    this.getAsset();
  },
  methods: {
    async getAsset() {
      try {
        await this.$store.dispatch('asset/getById', this.$route.params.assetId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["asset/model"])
          this.resource.data = Object.assign({}, this.$store.getters["asset/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["asset/selector"])
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
      const modelId = this.resource.data.id
      if (modelId == null) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } else {
        try {
          await this.$store.dispatch('asset/update', {'modelId': modelId, 'model': model})
          this.$notify({
            message:'Successfully Updated',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.resetApiValidation()
          router.push({path: "/assets"});
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
