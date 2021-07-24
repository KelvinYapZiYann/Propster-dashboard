<template>
  <div class="content">
    <tenant-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      :addOrEdit="addOrEdit"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
    </tenant-add-or-edit>
    <!-- <tenure-contract-add-or-edit>
    </tenure-contract-add-or-edit> -->
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import TenantAddOrEdit from "@/components/Resources/Tenants/TenantAddOrEdit";
// import TenureContractAddOrEdit from "@/components/Resources/TenureContracts/TenureContractAddOrEdit";
import swal from "sweetalert2";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    TenantAddOrEdit,
    // TenureContractAddOrEdit
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
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('tenant/create').then(() => {
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
        try {
          await this.$store.dispatch('tenant/store', {'model': model}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["tenant/model"])
            this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
          });
          this.resetApiValidation();
          swal({
            title: this.$t('alert.tenantSuccessfullyAdded'),
            text: this.$t('alert.tenantSuccessfullyAddedText'),
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
                name: 'Add Tenure Contract',
                query: {
                  tenantId: `${this.resource.data.id}`,
                  assetId: `${this.$route.query.assetId}`,
                },
                params: {
                  previousRoute: this.previousRoute ? this.previousRoute : '/tenants'
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
          // router.go(-1);
          // router.push({
          //   name: "Add Tenure Contract",
          //   query: this.query,
          //   params: {
          //     previousRoute: this.$router.currentRoute.fullPath
          //   }
          // });
          // router.push({path: "/tenants"});
        } catch (e) {
          this.$notify({
            message:'Server error',
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
