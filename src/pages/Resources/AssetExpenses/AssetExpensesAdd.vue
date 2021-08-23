<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <transaction-section
      :resource="resource"
      v-if="$route.query.senderId || resource.model.sender"
    ></transaction-section>
    <asset-expenses-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      addOrEdit="Add"
      @submit="handleSubmit"
      :query="this.$route.query"
      :previousRoute="previousRoute"
    >
    </asset-expenses-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import router from "@/router";
import AssetExpensesAddOrEdit from "@/components/Resources/AssetExpenses/AssetExpensesAddOrEdit";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";
import { TransactionSection, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    AssetExpensesAddOrEdit,
    TransactionSection
  },
  data() {
    return {
      resource: {
        model: {
            asset: {}
        },
        data: {},
        selector: {}
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
    this.getResource();
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('assetExpenses/create').then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["assetExpenses/model"])
          this.resource.data = Object.assign({}, this.$store.getters["assetExpenses/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["assetExpenses/selector"])
        })
      } catch (e) {
        if (!errorHandlingService.checkIfActionAuthorized(e)) {
          swal.fire({
            title: this.$t('alert.assetExpenseFailedAdded'),
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
          await this.$store.dispatch('assetExpenses/store', {'model': model}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["assetExpenses/model"])
            this.resource.data = Object.assign({}, this.$store.getters["assetExpenses/data"])
          });
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
