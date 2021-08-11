<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
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
// import AssetForm from "@/pages/Resources/Assets/Form/AssetForm";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
import AssetAddOrEdit from "@/components/Resources/Assets/AssetAddOrEdit";
import swal from "sweetalert2";

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    ValidationError,
    BaseSelectorInput,
    AssetAddOrEdit
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
        await this.$store.dispatch('asset/getById', this.$route.params.assetId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["asset/model"])
          this.resource.data = Object.assign({}, this.$store.getters["asset/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["asset/selector"])
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
          const assetId = this.resource.data.id
          if (assetId == null) {
            this.$notify({
              message:'Server error',
              icon: 'tim-icons icon-bell-55',
              type: 'danger'
            });
          } else {
            this.$store.dispatch('asset/update', {'assetId': assetId, 'model': model}).then(() => {
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
            })
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

