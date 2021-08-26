<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <tenant-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
      @cancel="handleCancel"
      :addOrEdit="addOrEdit"
      @promptError="handleError"
      ></tenant-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
import TenantAddOrEdit from "@/components/Resources/Tenants/TenantAddOrEdit";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    BaseSelectorInput,
    TenantAddOrEdit
  },
  data() {
    return {
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
    this.getTenant();
  },
  methods: {
    async getTenant() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('tenant/getById', this.$route.params.tenantId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenant/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenant/selector"])
        })
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
    async handleSubmit(model) {
      swal.fire({
        title: this.$t('alert.confirmEdit'),
        text: this.$t('alert.confirmEditText'),
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: this.$t('component.yes'),
        cancelButtonText: this.$t('component.no'),
        cancelButtonClass: "btn btn-info btn-fill",
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "info",
      }).then((result) => {
        if (result.value) {
          const tenantId = this.$route.params.tenantId
          if (tenantId == null) {
            this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
          } else {
            this.$store.dispatch('tenant/update', {'tenantId': tenantId, 'model': model}).then(() => {
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
            }).catch((e) => {
              this.$notify({
                message: errorHandlingService.displayAlertFromServer(e),
                icon: 'tim-icons icon-bell-55',
                type: 'danger'
              });
              this.setApiValidation(e.response.data.errors)
            });
          }
        }
      });
    },
    async handleCancel() {
      if (this.previousRoute) {
        router.push({path: this.previousRoute});
      } else {
        router.go(-1);
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
