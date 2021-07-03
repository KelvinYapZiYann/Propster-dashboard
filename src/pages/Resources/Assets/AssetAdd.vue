<template>
  <div class="content">
    <asset-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      :addOrEdit="addOrEdit"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
    </asset-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import AssetAddOrEdit from "@/components/Resources/Assets/AssetAddOrEdit";

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    ValidationError,
    AssetAddOrEdit
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
  props: {
    previousRoute: {
      type: String,
      required: true,
      default: "",
      description: "Previous Route"
    }
  },
  mounted() {
    this.getAsset();
  },
  methods: {
    async getAsset() {
      try {
        await this.$store.dispatch('asset/create').then(() => {
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
        try {
          await this.$store.dispatch('asset/store', {'model': model}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["asset/model"])
            this.resource.data = Object.assign({}, this.$store.getters["asset/data"])
          })
          this.$notify({
            message:'Successfully Added',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.resetApiValidation();
          router.push({path: this.previousRoute});
          // router.go(-1);
          // router.push({path: "/assets"});
        } catch (e) {
          this.$notify({
            message:'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
          this.setApiValidation(e.response.data.errors)
        }
    },
    async handleCancel() {
      router.push({path: this.previousRoute});
    }
  }
}
</script>
<style>
</style>
