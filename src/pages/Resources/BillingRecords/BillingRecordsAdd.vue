<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <transaction-section
      :resource="resource"
      v-if="$route.query.senderId || resource.model.sender"
    ></transaction-section>
    <billing-record-add-or-edit
      :transactionResource="transactionResource"
      :tenureContractResource="tenureContractResource"
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
      @senderIdOnChange="getBillingRecordDetail"
      @tenureContractIdOnChange="getTenureContractDetail"
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
import errorHandlingService from "@/store/services/error-handling-service";

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
      },
      tenureContractResource: {
        model: {},
        selector: {
          tenureContracts: undefined
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
    if (!this.$store.getters["users/model"].full_name) {
      this.$store.dispatch('users/get').then(() => {
        this.transactionResource.model.recipient_name = this.$store.getters["users/model"].full_name;
      });
    }
    if (!this.$route.query.senderId) {
      this.refreshTransactionDetail();
      return;
    }
    if (this.$route.query.tenureContractId) {
      this.getTenureContractDetail(this.$route.query.tenureContractId);
    }
    this.getBillingRecordDetail();
  },
  methods: {
    async getBillingRecordDetail(tenantId) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
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
        if (typeof tenantId == 'number') {
          this.refreshTenureContractDetail(tenantId);
        } else {
          this.refreshTenureContractDetail(this.$route.query.senderId);
        }
      } catch (e) {
        if (!errorHandlingService.checkIfActionAuthorized(e)) {
          swal({
            title: this.$t('alert.billingRecordFailedAdded'),
            text: this.$t('alert.redirectingToPreviousPage'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            type: "error",
          }).then((result) => {
            if (this.previousRoute) {
              router.push({path: this.previousRoute});
            } else {
              router.go(-1);
            }
          });
        } else {
          this.$notify({
            message: errorHandlingService.displayAlertFromServer(e),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
      } finally {
        loader.hide();
      }
    },
    async getTenureContractDetail(tenureContractId) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('tenureContract/getById', tenureContractId).then(() => {
          this.tenureContractResource.model = Object.assign({}, this.$store.getters["tenureContract/model"])
        })
      } catch (e) {
        if (!errorHandlingService.checkIfActionAuthorized(e)) {
          swal({
            title: this.$t('alert.billingRecordFailedAdded'),
            text: this.$t('alert.redirectingToPreviousPage'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            type: "error",
          }).then((result) => {
            if (this.previousRoute) {
              router.push({path: this.previousRoute});
            } else {
              router.go(-1);
            }
          });
        } else {
          this.$notify({
            message: errorHandlingService.displayAlertFromServer(e),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
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
            message: errorHandlingService.displayAlertFromServer(e),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
          this.setApiValidation(e.response.data.errors)
      } finally {
        loader.hide();
      }
    },
    async refreshTenureContractDetail(tenantId) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        this.tenureContractResource.model = {};
        await this.$store.dispatch('tenant/getTenureContracts', tenantId).then(() => {
          let tenureContractModels = this.$store.getters["tenant/tenureContractModels"];
          if (!tenureContractModels) {
            return;
          }
          let tenureContractSelector = [];
          for (let i = 0; i < tenureContractModels.length; i++) {
            tenureContractSelector.push({
              "id": tenureContractModels[i].id,
              "name": tenureContractModels[i].contract_name
            });
          }
          this.tenureContractResource.selector.tenureContracts = tenureContractSelector;
        });
      } catch (e) {
        this.$notify({
            message: errorHandlingService.displayAlertFromServer(e),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
          this.setApiValidation(e.response.data.errors)
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
          message: errorHandlingService.displayAlertFromServer(e),
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
