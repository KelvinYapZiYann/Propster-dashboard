<template>
  <div class="content">
    <tenure-contract-add-or-edit
      :resource="resource"
      :apiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
    >
    </tenure-contract-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import TenureContractAddOrEdit from "@/components/Resources/TenureContracts/TenureContractAddOrEdit";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    TenureContractAddOrEdit
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
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('tenureContract/create').then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenureContract/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
        })
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    async handleSubmit(formData) {
        try {
          await this.$store.dispatch('tenureContract/store', {'model': formData}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["tenureContract/model"])
            this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
          })
          this.$notify({
            message:'Successfully Added',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.resetApiValidation()
          router.push({path: "/tenure-contracts"});
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
