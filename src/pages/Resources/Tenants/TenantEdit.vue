<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <tenant-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      @submit="handleSubmit"
      @cancel="handleCancel"
      :addOrEdit="addOrEdit"
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
      try {
        await this.$store.dispatch('tenant/getById', this.$route.params.tenantId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenant/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenant/selector"])
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
      swal({
        title: this.$t('alert.confirmEdit'),
        text: this.$t('alert.confirmEditText'),
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: this.$t('component.yes'),
        cancelButtonText: this.$t('component.no'),
        cancelButtonClass: "btn btn-info btn-fill",
        confirmButtonClass: "btn btn-info btn-fill",
        type: "info",
      }).then((result) => {
        if (result.value) {
          const tenantId = this.$route.params.tenantId
          if (tenantId == null) {
            this.$notify({
              message:'Server error',
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
                message:'Server error',
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
    }
  }
}
</script>
<style>
</style>
