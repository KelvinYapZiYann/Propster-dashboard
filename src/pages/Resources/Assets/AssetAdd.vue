<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <asset-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      :addOrEdit="addOrEdit"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
    </asset-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import AssetAddOrEdit from "@/components/Resources/Assets/AssetAddOrEdit";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    ValidationError,
    AssetAddOrEdit
  },
  data() {
    return {
      resource: {
        model: {},
        data: {},
        selector: {}
      },
      addOrEdit: "Add"
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
    this.getAsset();
  },
  methods: {
    async getAsset() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('asset/create').then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["asset/model"])
          this.resource.data = Object.assign({}, this.$store.getters["asset/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["asset/selector"])
        })
      } catch (e) {
        if (!errorHandlingService.checkIfActionAuthorized(e)) {
          swal.fire({
            title: this.$t('alert.assetFailedAdded'),
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
    async handleSubmit(model) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
        try {
          await this.$store.dispatch('asset/store', {'model': model}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["asset/model"])
            this.resource.data = Object.assign({}, this.$store.getters["asset/data"])
          });
          this.resetApiValidation();
          swal.fire({
            title: this.$t('alert.assetSuccessfullyAdded'),
            text: this.$t('alert.assetSuccessfullyAddedText'),
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
                name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Tenant" : "Add Tenant",
                query: {
                  assetId: `${this.resource.data.id}`,
                },
                params: {
                  previousRoute: this.previousRoute ? this.previousRoute : '/assets'
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
        } catch (e) {
          this.$notify({
            message: errorHandlingService.displayAlertFromServer(e),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
          // console.log(e.response.data.errors);
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
    }
  }
}
</script>
<style>
</style>
