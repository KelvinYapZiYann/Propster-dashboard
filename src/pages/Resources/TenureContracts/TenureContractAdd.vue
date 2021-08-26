<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <tenure-contract-add-or-edit
      :tenureContractCreateResource="tenureContractCreateResource"
      @assetIdOnChange="getTenureContract"
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      :addOrEdit="addOrEdit"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @promptError="handleError"
    >
    </tenure-contract-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import TenureContractAddOrEdit from "@/components/Resources/TenureContracts/TenureContractAddOrEdit";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

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
      addOrEdit: "Add",
      userResource: {
        model: {},
      },
      tenureContractCreateResource: {
        model: {
          asset_id: undefined,
          tenant_id: undefined,
        },
        selector: {
          asset_id: undefined,
          tenant_id: undefined,
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
  mounted() {
    if (this.$route.query.tenantId && !this.$route.query.assetId) {
      this.refreshAssetSelectorFromTenant();
    } else if (this.$route.query.tenantId && this.$route.query.assetId) {
      this.refreshAssetTenantDetail();
    } else {
      if (!this.$route.query.assetId) {
        this.refreshAssetSelector();
      } else {
        this.getTenureContract(this.$route.query.assetId);
      }
    }
  },
  methods: {
    async getTenureContract(assetId) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('tenureContract/create', {'asset_id': assetId}).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenureContract/models"])
          this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
        });
        this.userResource.model = Object.assign({}, this.$store.getters["users/model"]);
      } catch (e) {
        if (!errorHandlingService.checkIfActionAuthorized(e)) {
          swal.fire({
            title: this.$t('alert.tenureContractFailedAdded'),
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
    async handleSubmit(formData) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('tenureContract/store', {'model': formData}).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenureContract/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
          if (parseFloat(this.resource.model.deposited_amount) > 0) {
            let paymentRecordModel = {
              recipient_type: "LANDLORD",
              recipient_id: this.userResource.model.landlord_ids[0],
              sender_type: "TENANT",
              sender_id: this.resource.model.tenant.id,
              asset_id: this.resource.model.asset.id,
              payment_description: "Rental Deposit for " + this.resource.model.contract_name,
              payment_method: "CASH",
              payment_type: "DEPOSIT",
              amount: this.resource.model.deposited_amount,
              is_reference_only: false
            }
            let paymentRecordModelFormData = new FormData();
            for (const [key, value] of Object.entries(paymentRecordModel)) {
              if (value) {
                paymentRecordModelFormData.append(key, value);
                continue;
              }
              if (key == "is_reference_only") {
                paymentRecordModelFormData.append(key, value);
              }
            }
            this.$store.dispatch('paymentRecords/store', {'model': paymentRecordModelFormData}).then(() => {
              this.resetApiValidation();
              swal.fire({
                title: this.$t('alert.tenureContractSuccessfullyAdded'),
                text: this.$t('alert.tenureContractSuccessfullyAddedText'),
                buttonsStyling: false,
                showCancelButton: true,
                confirmButtonText: this.$t('component.yes'),
                cancelButtonText: this.$t('component.no'),
                cancelButtonClass: "btn btn-info btn-fill",
                confirmButtonClass: "btn btn-info btn-fill",
                icon: "success",
              }).then((result) => {
                if (result.value) {
                  router.push({
                    name: 'Add Billing Record',
                    query: {
                      senderType: "TENANT",
                      senderId: this.resource.model.tenant.id,
                      recipientType: "LANDLORD",
                      recipientId: this.userResource.model.landlord_ids[0],
                      assetId: this.resource.model.asset.id,
                      tenureContractId: this.resource.model.id
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
            })
          } else {
            this.resetApiValidation();
            swal.fire({
              title: this.$t('alert.tenureContractSuccessfullyAdded'),
              text: this.$t('alert.tenureContractSuccessfullyAddedText'),
              buttonsStyling: false,
              showCancelButton: true,
              confirmButtonText: this.$t('component.yes'),
              cancelButtonText: this.$t('component.no'),
              cancelButtonClass: "btn btn-info btn-fill",
              confirmButtonClass: "btn btn-info btn-fill",
              icon: "success",
            }).then((result) => {
              if (result.value) {
                router.push({
                  name: 'Add Billing Record',
                  query: {
                    senderType: "TENANT",
                    senderId: this.resource.model.tenant.id,
                    recipientType: "LANDLORD",
                    recipientId: this.userResource.model.landlord_ids[0],
                    assetId: this.resource.model.asset.id,
                    tenureContractId: this.resource.model.id
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
          }
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
    async handleCancel() {
      if (this.previousRoute) {
        router.push({path: this.previousRoute});
      } else {
        router.go(-1);
      }
    },
    async refreshAssetSelector() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('asset/get').then(() => {
          let assetModels = this.$store.getters["asset/models"];
          if (!assetModels) {
            return;
          }
          let assetSelector = [];
          for (let i = 0; i < assetModels.length; i++) {
            assetSelector.push({
              "id": assetModels[i].id,
              "name": assetModels[i].asset_nickname
            });
          }
          this.tenureContractCreateResource.selector.asset_id = assetSelector;
        });
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    async refreshAssetSelectorFromTenant() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        let param = {
          id: this.$route.query.tenantId,
        }
        await this.$store.dispatch('tenant/getAssets', param).then(() => {
          let assetModels = this.$store.getters["tenant/assetModels"];
          if (!assetModels) {
            return;
          }
          let assetSelector = [];
          for (let i = 0; i < assetModels.length; i++) {
            assetSelector.push({
              "id": assetModels[i].id,
              "name": assetModels[i].asset_nickname
            });
          }
          this.$store.dispatch('tenant/getById', this.$route.query.tenantId).then(() => {
            let tenantModel = this.$store.getters["tenant/model"];
            if (!tenantModel) {
              return;
            }
            let tenantSelector = [{
              "id": this.$route.query.tenantId,
              "name": tenantModel.first_name + " " + tenantModel.last_name
            }];
            this.tenureContractCreateResource.selector.asset_id = assetSelector;
            this.resource.selector.tenant_id = tenantSelector;
          });
        });
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    async refreshAssetTenantDetail() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('asset/getById', this.$route.query.assetId).then(() => {
          let assetModel = this.$store.getters["asset/model"];
          if (!assetModel) {
            return;
          }
          let assetSelector = [{
            "id": this.$route.query.assetId,
            "name": assetModel.asset_nickname
          }];
          this.$store.dispatch('tenant/getById', this.$route.query.tenantId).then(() => {
            let tenantModel = this.$store.getters["tenant/model"];
            if (!tenantModel) {
              return;
            }
            let tenantSelector = [{
              "id": this.$route.query.tenantId,
              "name": tenantModel.first_name + " " + tenantModel.last_name
            }];
            this.resource.selector.tenant_id = tenantSelector;
            this.tenureContractCreateResource.selector.asset_id = assetSelector;
          });
        });
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    async handleError(error) {
      this.resetApiValidation();
      this.setApiValidation(error)
    }
  }
}
</script>
<style>
</style>
