<template>
  <div class="content">
    <payment-page
      :resource="resource"
    ></payment-page>
    <!-- :model="resource.model"
      :asset="resource.model.asset"
      :recipient="resource.model.recipient"
      :sender="resource.model.sender" -->
    <!-- {{resource}} -->
    <payment-record-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
      addOrEdit="Add"
      :query="this.$route.query"
    ></payment-record-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import router from "@/router";
// import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
// import PaymentPage from "@/components/Resources/PaymentRecords/PaymentPage";
import PaymentRecordAddOrEdit from "@/components/Resources/PaymentRecords/PaymentRecordAddOrEdit";
// import ValidationError from "@/components/ValidationError.vue";
import { PaymentPage, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    PaymentPage,
    PaymentRecordAddOrEdit
  },
  data() {
    return {
      fileCount: 0,
      prevRoute: null,
      resource: {
        model: {
          asset: {
            id: -1
          }
        },
        data: {},
        selector: {}
      },
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
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.prevRoute = from
  //   })
  // },
  mounted() {
    this.getPaymentRecordDetail();
  },
  methods: {
    async getPaymentRecordDetail() {
      try {
        var paymentRecordsAddParam = this.$route.query.assetId ?
        {
          'sender_type': this.$route.query.senderType,
          'sender_id': this.$route.query.senderId,
          'recipient_type': this.$route.query.recipientType,
          'recipient_id': this.$route.query.recipientId,
          'asset_id': this.$route.query.assetId,
        } : 
        {
          'sender_type': this.$route.query.senderType,
          'sender_id': this.$route.query.senderId,
          'recipient_type': this.$route.query.recipientType,
          'recipient_id': this.$route.query.recipientId,
        };
        await this.$store.dispatch('paymentRecords/add', paymentRecordsAddParam).then(() => {
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
        // router.push({path: "/payment-records"});
        if (this.previousRoute) {
          router.push({path: this.previousRoute});
        } else {
          router.go(-1);
        }
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
