<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <tenure-contract-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      :addOrEdit="addOrEdit"
      @submit="handleSubmit"
      @cancel="handleCancel"
      ></tenure-contract-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
// import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
// import TenantAddOrEdit from "@/components/Resources/Tenants/TenantAddOrEdit";
import TenureContractAddOrEdit from "@/components/Resources/TenureContracts/TenureContractAddOrEdit";

export default {
  mixins: [formMixin],
  components: {
    TenureContractAddOrEdit,
    ValidationError,
    // BaseSelectorInput,
  },
  data() {
    return {
      tenureContractId: this.$route.params.tenureContractId,
      resource: {
        model: {},
        data: {},
        selector: {}
      },
      addOrEdit: "Edit"
    };
  },
  props: {
    previousRoute: {
      type: String,
      required: false,
      default: "",
      description: "Previous Route"
    }
  },
  mounted() {
    this.getTenureContract();
  },
  methods: {
    async getTenureContract() {
      try {
        await this.$store.dispatch('tenureContract/getById', this.tenureContractId).then(() => {
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
    async handleSubmit(model) {
      if (this.tenureContractId == null) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } else {
        try {
          await this.$store.dispatch('tenureContract/update', {'tenureContractId': this.tenureContractId, 'model': model})
          this.$notify({
            message:'Successfully Updated',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.resetApiValidation();
          if (this.previousRoute) {
            router.push({path: this.previousRoute});
          } else {
            router.go(-1);
          }
          // router.go(-1);
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
    },
    async handleCancel() {
      if (this.previousRoute) {
        router.push({path: this.previousRoute});
      } else {
        router.go(-1);
      }
    }
  }
}
</script>
<style>
</style>
