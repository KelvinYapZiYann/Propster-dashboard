<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <transaction-section
      :resource="resource"
      v-if="$route.query.senderId || resource.model.sender"
    ></transaction-section>
    <billing-record-add-or-edit
      :transactionResource="transactionResource"
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
      @recipientIdOnChange="getBillingRecordDetail"
      addOrEdit="Add"
      :query="this.$route.query"
      :previousRoute="previousRoute"
    ></billing-record-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import router from "@/router";
// import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
import BillingRecordAddOrEdit from "@/components/Resources/BillingRecords/BillingRecordAddOrEdit";
// import ValidationError from "@/components/ValidationError.vue";
import { TransactionSection, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    TransactionSection,
    BillingRecordAddOrEdit
  },
  data() {
    return {
      fileCount: 0,
      prevRoute: null,
      resource: {
        model: {
          asset: {
            // id: -1
          }
        },
        data: {},
        selector: {}
      },
      transactionResource: {
        model: {
          sender_id: undefined,
          recipient_id: this.$route.query.recipientId,
          recipient_name: this.$store.getters["users/model"].full_name
        },
        selector: {
          senders: undefined
        }
      }
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
    if (!this.$route.query.senderId) {
      this.refreshTransactionDetail();
      return;
    }
    this.getBillingRecordDetail();
  },
  methods: {
    async getBillingRecordDetail(tenantId) {
      try {
        var billingRecordCreateParam;
        if (typeof tenantId == 'number') {
          billingRecordCreateParam = {
            'sender_type': this.$route.query.senderType,
            'sender_id': tenantId,
            'recipient_type': this.$route.query.recipientType,
            'recipient_id': this.$route.query.recipientId,
          }
        } else {
          billingRecordCreateParam = this.$route.query.assetId ?
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
        }
        await this.$store.dispatch('billingRecords/create', billingRecordCreateParam).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["billingRecords/model"])
          this.resource.data = Object.assign({}, this.$store.getters["billingRecords/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["billingRecords/selector"])
        })
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    async refreshTransactionDetail() {
      try {
        await this.$store.dispatch('tenant/get').then(() => {
          let tenantModels = this.$store.getters["tenant/models"];
          if (!tenantModels) {
            return;
          }
          let tenantSelector = [];
          for (let i = 0; i < tenantModels.length; i++) {
            tenantSelector.push({
              "id": tenantModels[i].id,
              "name": tenantModels[i].first_name + " " + tenantModels[i].last_name
            });
          }
          this.transactionResource.selector.senders = tenantSelector;
        });
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
        await this.$store.dispatch('billingRecords/store', {'model': model}).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["billingRecords/model"])
          this.resource.data = Object.assign({}, this.$store.getters["billingRecords/data"])
        })
        this.$notify({
          message:'Successfully Added',
          icon: 'tim-icons icon-bell-55',
          type: 'success'
        });
        this.resetApiValidation();
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
        this.setApiValidation(e.response.data.errors);
      }
    },
  }
}
</script>
<style>
</style>
