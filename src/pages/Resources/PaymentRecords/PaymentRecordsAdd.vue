<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <transaction-section
      :resource="resource"
      v-if="$route.query.senderId || resource.model.sender"
    ></transaction-section>
    <payment-record-add-or-edit
      :transactionResource="transactionResource"
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
      @senderIdOnChange="getPaymentRecordDetail"
      addOrEdit="Add"
      :query="this.$route.query"
      :previousRoute="previousRoute"
    ></payment-record-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import router from "@/router";
import PaymentRecordAddOrEdit from "@/components/Resources/PaymentRecords/PaymentRecordAddOrEdit";
import { TransactionSection, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    TransactionSection,
    PaymentRecordAddOrEdit
  },
  data() {
    return {
      fileCount: 0,
      prevRoute: null,
      resource: {
        model: {
          asset: {}
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
    this.getPaymentRecordDetail();
  },
  methods: {
    async getPaymentRecordDetail(tenantId) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        var paymentRecordsAddParam;
        if (typeof tenantId == 'number') {
          paymentRecordsAddParam = {
            'sender_type': this.$route.query.senderType,
            'sender_id': tenantId,
            'recipient_type': this.$route.query.recipientType,
            'recipient_id': this.$route.query.recipientId,
          };
        } else {
          paymentRecordsAddParam = this.$route.query.assetId ?
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
        await this.$store.dispatch('paymentRecords/create', paymentRecordsAddParam).then(() => {
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
      } finally {
        loader.hide();
      }
    },
    async refreshTransactionDetail() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
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
      } finally {
        loader.hide();
      }
    },
    async handleSubmit(model) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
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
        console.log(e);
        this.$notify({
          message:'Server error 123',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
        this.setApiValidation(e.response.data.errors)
      } finally {
        loader.hide();
      }
    },
  }
}
</script>
<style>
</style>
