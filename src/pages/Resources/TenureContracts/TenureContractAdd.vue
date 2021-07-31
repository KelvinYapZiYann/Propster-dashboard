<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <tenure-contract-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      :addOrEdit="addOrEdit"
      @submit="handleSubmit"
      @cancel="handleCancel"
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
        await this.$store.dispatch('tenureContract/create').then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenureContract/models"])
          this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
        });
        this.userResource.model = Object.assign({}, this.$store.getters["users/model"]);
      } catch (e) {
        if (!errorHandlingService.checkIfActionAuthorized(e)) {
          swal({
            title: this.$t('alert.tenureContractFailedAdded'),
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
      }
    },
    async handleSubmit(formData) {
        try {
          await this.$store.dispatch('tenureContract/store', {'model': formData}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["tenureContract/model"])
            this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
            this.resetApiValidation();
            swal({
              title: this.$t('alert.tenureContractSuccessfullyAdded'),
              text: this.$t('alert.tenureContractSuccessfullyAddedText'),
              buttonsStyling: false,
              showCancelButton: true,
              confirmButtonText: this.$t('component.yes'),
              cancelButtonText: this.$t('component.no'),
              cancelButtonClass: "btn btn-info btn-fill",
              confirmButtonClass: "btn btn-info btn-fill",
              type: "success",
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
          });
        } catch (e) {
          this.$notify({
            message: errorHandlingService.displayAlertFromServer(e),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
          this.setApiValidation(e.response.data.errors)
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
