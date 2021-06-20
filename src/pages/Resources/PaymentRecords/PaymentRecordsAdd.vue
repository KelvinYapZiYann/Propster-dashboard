<template>
  <div>
    <payment-page
      :model="resource.model"
      :asset="resource.model.asset"
      :recipient="resource.model.recipient"
      :sender="resource.model.sender"
    ></payment-page>
    <payment-record-add-or-edit
      :resource="resource"
      :apiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
    ></payment-record-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
import PaymentPage from "@/components/Resources/PaymentRecords/PaymentPage";
import PaymentRecordAddOrEdit from "@/components/Resources/PaymentRecords/PaymentRecordAddOrEdit";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    BaseSelectorInput,
    PaymentPage,
    PaymentRecordAddOrEdit
  },
  data() {
    return {
      fileCount: 0,
      prevRoute: null,
      resource: {
        model: {},
        data: {}
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  mounted() {
    this.getPaymentRecordDetail();
  },
  methods: {
    async getPaymentRecordDetail() {
      try {
        await this.$store.dispatch('paymentRecords/add', {
          'recipient_type': this.$route.query.modelType,
          'recipient_id': this.$route.query.modelId
        }).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["paymentRecords/model"])
          this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["paymentRecords/selector"])
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
        await this.$store.dispatch('paymentRecords/store', {'model': model}).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["paymentRecords/model"])
          this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"])
        })
        this.$notify({
          message:'Successfully Added',
          icon: 'tim-icons icon-bell-55',
          type: 'success'
        });
        this.resetApiValidation()
        router.push({path: "/payment-records"});
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
        this.setApiValidation(e.response.data.errors)
      }
    },
  }
}
</script>
<style>
</style>
