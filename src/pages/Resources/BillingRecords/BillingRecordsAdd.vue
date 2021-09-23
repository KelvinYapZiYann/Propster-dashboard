<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
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
import swal from "sweetalert2";
import router from "@/router";

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
        var billingRecordCreateParam = {
          'sender_type': this.$route.query.senderType,
          'recipient_type': this.$route.query.recipientType,
          'recipient_id': this.$route.query.recipientId,
        };
        if (typeof tenantId == 'number') {
          billingRecordCreateParam['sender_id'] = tenantId;
        } else {
          billingRecordCreateParam['sender_id'] = this.$route.query.senderId;
        }
        if (this.$route.query.assetId) {
          billingRecordCreateParam['asset_id'] = this.$route.query.assetId;
        }
        if (this.$route.query.billImmediately) {
          billingRecordCreateParam['bill_immediately'] = "1";
        }
        await this.$store.dispatch('billingRecords/create', billingRecordCreateParam).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["billingRecords/model"]);
          this.resource.model.remind_before_days = 1;
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
          swal.fire({
            title: this.$t('alert.billingRecordFailedAdded'),
            text: this.$t('alert.redirectingToPreviousPage'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "error",
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
          swal.fire({
            title: this.$t('alert.billingRecordFailedAdded'),
            text: this.$t('alert.redirectingToPreviousPage'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "error",
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
        });
        this.resetApiValidation();
        if (model.get('payment_type') == 'RENTAL') {
          swal.fire({
            title: this.$t('alert.billingRecordSuccessfullyAdded'),
            text: this.$t('alert.rentalBillingRecordSuccessfullyAddedText'),
            buttonsStyling: false,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: this.$t('component.add') + " " + this.$t('sidebar.billingRecord'),
            denyButtonText: this.$t('component.add') + " " + this.$t('sidebar.paymentRecord'),
            cancelButtonText: this.$t('component.cancel'),
            cancelButtonClass: "btn btn-info btn-fill",
            denyButtonClass: "btn btn-info btn-fill",
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push({
                name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Billing Record" : "Add Billing Record",
                query: {
                  senderType: "TENANT",
                  senderId: model.get("sender_id"),
                  recipientType: "LANDLORD",
                  recipientId: model.get("recipient_id"),
                  assetId: model.get("asset_id"),
                  startDate: model.get("billing_start_at"),
                  endDate: model.get("billing_end_at"),
                },
                params: {
                  previousRoute: this.previousRoute ? this.previousRoute : '/tenure-contracts'
                }
              });
            } else if (result.isDenied) {
              router.push({
                name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Payment Record" : "Add Billing Record",
                query: {
                  senderType: "TENANT",
                  senderId: model.get("sender_id"),
                  recipientType: "LANDLORD",
                  recipientId: model.get("recipient_id"),
                  assetId: model.get("asset_id"),
                },
                params: {
                  previousRoute: this.previousRoute ? this.previousRoute : '/tenure-contracts'
                }
              });
            } else {
              if (this.previousRoute) {
                router.push({path: this.previousRoute});
              } else {
                router.go(-1);
              }
            }
          });
        } else {
          swal.fire({
            title: this.$t('alert.billingRecordSuccessfullyAdded'),
            text: this.$t('alert.billingRecordSuccessfullyAddedText'),
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: this.$t('component.yes'),
            cancelButtonText: this.$t('component.no'),
            cancelButtonClass: "btn btn-info btn-fill",
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "success",
          }).then((result) => {
            if (result.value) {
              if (
                router.currentRoute.query.senderType != model.get("sender_type") || 
                router.currentRoute.query.senderId != model.get("sender_id") || 
                router.currentRoute.query.recipientType != model.get("recipient_type") || 
                router.currentRoute.query.recipientId != model.get("recipient_id") || 
                router.currentRoute.query.assetId != model.get("asset_id") || 
                router.currentRoute.query.startDate != model.get("billing_start_at") || 
                router.currentRoute.query.endDate != model.get("billing_end_at")
              ) {
                router.push({
                  name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Payment Record" : "Add Billing Record",
                  query: {
                    senderType: "TENANT",
                    senderId: model.get("sender_id"),
                    recipientType: "LANDLORD",
                    recipientId: model.get("recipient_id"),
                    assetId: model.get("asset_id"),
                    startDate: model.get("billing_start_at"),
                    endDate: model.get("billing_end_at"),
                  },
                  params: {
                    previousRoute: this.previousRoute ? this.previousRoute : '/tenure-contracts'
                  }
                });
              } else {
                this.resource.model.description = "";
                this.resource.model.amount = "";
                this.resource.model.payment_type = "";
              }
            } else {
              if (this.previousRoute) {
                router.push({path: this.previousRoute});
              } else {
                router.go(-1);
              }
            }
          });
        }
      } catch (e) {
        console.log(e);
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
